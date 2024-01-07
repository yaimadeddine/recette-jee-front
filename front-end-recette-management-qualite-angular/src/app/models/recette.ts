import { Etape } from "./etape";
import { Ingredient } from "./ingredient";
import { Type } from "./type";

export class Recette {
  id: number;
  nom: string;
  ref: string;
  description: string;
  duree: number;
  datePublication: Date;
  ingredients?: Ingredient[];
  etapes?: Etape[];
  image: string;
  userRef: string;
  typeRecette: Type;

  constructor(
    id: number,
    nom: string,
    ref: string,
    description: string,
    duree: number,
    image: string,
    datePublication: Date,
    userRef: string,
    typeRecette: Type,
    ingredients?: Ingredient[],
    etapes?: Etape[]
  ) {
    this.id = id;
    this.ref = ref;
    this.nom = nom;
    this.image = image;
    this.description = description;
    this.duree = duree;
    this.datePublication = datePublication;
    this.userRef = userRef;
    this.typeRecette = typeRecette;
    this.ingredients = ingredients;
    this.etapes = etapes;
  }
}
