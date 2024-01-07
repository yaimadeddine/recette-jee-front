export class Ingredient {
  id: number;
  ref: string;
  nom: string;
  quantite: number;
  unite: string;

  constructor(id: number,   ref: string,    nom: string, quantite: number, unite: string) {
    this.ref = ref;
    this.id = id;
    this.nom = nom;
    this.quantite = quantite;
    this.unite = unite;
  }
}
