import { TypeService } from './../../services/type.service';
import { Component } from '@angular/core';
import { Recette } from 'src/app/models/recette';
import { Type } from 'src/app/models/type';
import { RecetteService } from 'src/app/services/recette.service';
import { Response } from 'src/app/models/response';
import { Chef } from 'src/app/models/chef';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  types: Type[] = [];
  recettes: Recette[] = [];
  chefs: Chef[] = [];

  constructor(private recetteService: RecetteService,
    private typesService: TypeService) {}

  ngOnInit(): void {
    localStorage.clear();

    this.getTypes();
    this.getRecettes();


  }


  getRecettes() {
    this.recetteService.findAll().subscribe((responseEntityArray: Response[]) => {
      this.recettes = responseEntityArray.map(responseEntity => responseEntity.recette);
      this.chefs = responseEntityArray.map(responseEntity => responseEntity.userVo);
    });
  }

  getTypes() {
    this.typesService.findAll().subscribe((types) => {
      this.types = types;
    });
  }

}
