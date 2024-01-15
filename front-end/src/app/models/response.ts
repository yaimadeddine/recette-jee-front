import { Chef } from "./chef";
import { Recette } from "./recette";

export class Response {
  userVo: Chef;
  recette: Recette;

  constructor( chef: Chef,
    recette: Recette) {
    this.userVo = chef;
    this.recette = recette;

  }
}
