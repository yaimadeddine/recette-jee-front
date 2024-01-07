import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Chef } from 'src/app/models/chef';
import { Recette } from 'src/app/models/recette';
import { Response } from 'src/app/models/response';
import { Type } from 'src/app/models/type';
import { RecetteService } from 'src/app/services/recette.service';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-gestion-recettes',
  templateUrl: './gestion-recettes.component.html',
  styleUrls: ['./gestion-recettes.component.css']
})
export class GestionRecettesComponent {
  recettes: Recette[] = [];
  types: Type[] = [];
  selectedRecipe:any;
  showAddFormFlag: boolean = false;
  showEditFormFlag: boolean = false;
  recetteSuccess:boolean = false;
  chefs: Chef[] = [];
  newRecette: Recette = {  id:0,
    nom:"",
    ref:this.generateRandomReference(),
    description:"",
    duree:0,
    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png",
    datePublication:new Date(),
    userRef:localStorage.getItem('refUser')||"ZE787",
    typeRecette: this.types[0] || new Type(0, "", "", ""),
  }

  editRecetteId: number | null = null;

  constructor(private recetteService: RecetteService,private modalService: NgbModal,private typesService: TypeService) {
    this.getTypes();

  }

  ngOnInit(): void {

    this.getRecettes();

  }
  resetForm(): void {
    this.newRecette={  id:0,
      nom:"",
      ref:this.generateRandomReference(),
      description:"",
      duree:0,
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png",
      datePublication:new Date(),
      userRef:localStorage.getItem('refUser')||"ZE787",
      typeRecette: this.types[0] || new Type(0, "", "", ""),
    }
  }
  getTypes() {
    this.typesService.findAll().subscribe((types) => {
      this.types = types;
    });
  }
  generateRandomReference(): string {
    const length = 8;
    const buffer = new Uint8Array(length);
    crypto.getRandomValues(buffer);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(buffer[i] % characters.length);
    }
    return result;
  }

  deleteRecette(recetteD:Recette): void {
    this.recetteService.delete(recetteD.ref).subscribe(() => {
      this.recettes = this.recettes.filter(recette => recette.id !== recetteD.id);
    });
  }
  editRecette(recette: Recette): void {
    this.showEditFormFlag = true;
    this.showAddFormFlag = false;
    this.editRecetteId = recette.id;
    this.newRecette = { ...recette };
  }
  cancelForm(): void {
    this.showAddFormFlag = false;
    this.showEditFormFlag = false;
    this.editRecetteId = null;
    this.resetForm();
  }

  updateRecette(): void {
    if (this.editRecetteId !== null) {
      console.log('Updating Recette:', this.newRecette);
      this.recetteService.update(this.newRecette).subscribe(updatedRecette => {
        this.getRecettes();
      });
    }
  }
  submitForm(): void {
    if (this.showAddFormFlag) {
      this.addRecette();
    } else if (this.showEditFormFlag) {
      this.updateRecette();
    }
  }
  addRecette(): void {
    this.recetteService.add(this.newRecette).subscribe(addedRecette => {
      this.resetForm();
      this.getRecettes();
      this.recetteSuccess = true;
      setTimeout(() => {
        this.recetteSuccess = false;
      }, 3000);
    });

  }

  getRecettes() {
    this.recetteService.findByUserRef().subscribe((responseEntityArray: Response[]) => {
      this.recettes = responseEntityArray.map(responseEntity => responseEntity.recette);
      this.chefs = responseEntityArray.map(responseEntity => responseEntity.userVo);

    });
  }
  closeRecipeModal() {
    this.modalService.dismissAll();
  }
  showAddForm(): void {
    this.showAddFormFlag = true;
    this.showEditFormFlag = false;
  }

}
