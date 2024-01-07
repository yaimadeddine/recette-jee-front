export class Etape {
  id: number;
  ref: string;
  description: string;
  ordre: number;
  duree: number;

  constructor(id: number,ref:string, description: string, ordre: number, duree: number) {
    this.id = id;
    this.ref=ref;
    this.description = description;
    this.ordre = ordre;
    this.duree = duree;
  }
}
