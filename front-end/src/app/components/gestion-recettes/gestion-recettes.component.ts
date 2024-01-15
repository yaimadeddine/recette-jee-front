import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Chef } from 'src/app/models/chef';
import { Recette } from 'src/app/models/recette';
import { Response } from 'src/app/models/response';
import { Type } from 'src/app/models/type';
import { RecetteService } from 'src/app/services/recette.service';
import { TypeService } from 'src/app/services/type.service';
import {Etape} from "../../models/etape";
import {Ingredient} from "../../models/ingredient";

@Component({
  selector: 'app-gestion-recettes',
  templateUrl: './gestion-recettes.component.html',
  styleUrls: ['./gestion-recettes.component.css']
})
export class GestionRecettesComponent {
  recettes: Recette[] = [];
  types: Type[] = [];
  selectedRecipe: any;
  showAddFormFlag: boolean = false;
  showEditFormFlag: boolean = false;
  recetteSuccess: boolean = false;
  chefs: Chef[] = [];
  newRecette: Recette = {
    id: 0,
    nom: "",
    ref: this.generateRandomReference(),
    description: "",
    duree: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png",
    datePublication: new Date(),
    userRef: localStorage.getItem('refUser') || "ZE787",
    typeRecette: this.types[0] || new Type(0, "", "", ""),
    ingredients: [],  // Initialize with an empty array
    etapes: []       // Initialize with an empty array
  };

  editRecetteId: number | null = null;

  // Initialize an empty ingredient and etape for the newRecette
  newIngredient: any = { nom: '' };
  newEtape: { description: string } = new Etape(0, '', '', 0, 0);



  constructor(private recetteService: RecetteService, private modalService: NgbModal, private typesService: TypeService) {
    this.getTypes();
  }

  ngOnInit(): void {
    this.getRecettes();
    this.getTypes();
    console.log("Ingredients:", this.newRecette.ingredients);
    console.log("Etapes:", this.newRecette.etapes);
  }

  resetForm(): void {
    this.newRecette = {
      id: 0,
      nom: "",
      ref: this.generateRandomReference(),
      description: "",
      duree: 0,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png",
      datePublication: new Date(),
      userRef: localStorage.getItem('refUser') || "ZE787",
      typeRecette: this.types[0] || new Type(0, "", "", ""),
      ingredients: [],
      etapes: []
    };
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

  deleteRecette(recetteD: Recette): void {
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

  // Add a function to add a new ingredient to newRecette
  addIngredient() {
    const newIngredient: Ingredient = {
      id: 0, // You may need to adjust this based on your actual logic for generating IDs
      ref: '', // You may need to adjust this based on your actual logic for generating references
      nom: this.newIngredient.nom,
      quantite: 0, // You may need to adjust this based on your actual logic for setting quantite
      unite: '', // You may need to adjust this based on your actual logic for setting unite
    };

    this.newRecette.ingredients?.push(newIngredient);
    this.newIngredient = { nom: '' }; // Reset newIngredient
  }


  // Add a function to add a new etape to newRecette
  addEtape() {
    const newEtape: Etape = {
      id: 0, // You may need to adjust this based on your actual logic for generating IDs
      ref: '', // You may need to adjust this based on your actual logic for generating references
      description: this.newEtape.description,
      ordre: 0, // You may need to adjust this based on your actual logic for setting ordre
      duree: 0, // You may need to adjust this based on your actual logic for setting duree
    };
    this.newRecette.etapes?.push(newEtape);

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
