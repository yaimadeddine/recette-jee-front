import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecetteService } from 'src/app/services/recette.service';

@Component({
  selector: 'app-details-recette',
  templateUrl: './details-recette.component.html',
  styleUrls: ['./details-recette.component.css']
})
export class DetailsRecetteComponent implements OnInit {
  recette: any;

  constructor(
    private route: ActivatedRoute,
    private recettesService: RecetteService,
  ) {

  }


  ngOnInit(): void {
    localStorage.clear();

    this.route.params.subscribe(params => {
      const recetteId: string = params['id'];
      this.recettesService.findById(recetteId).subscribe(
        (data) => {

          this.recette = data;
          console.log(this.recette);

        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des détails du recette.', error);
        }
      );
    });
  }
}
