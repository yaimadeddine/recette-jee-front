export class Type {
  id: number;
  ref: string;
  libelle: string;
  image: string;


  constructor(id: number,  ref: string,    libelle: string,image:string) {
    this.ref = ref;
    this.id = id;
    this.libelle = libelle;
    this.image = image;
  }
}
