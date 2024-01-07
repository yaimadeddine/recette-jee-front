export class Chef {
  id: number;
  nom: string;
  prenom: string;
  ref: string;
  email: string;
  password: string;

  constructor(
    id: number,
    nom: string,
    prenom: string,
    ref:string,
    email: string,
    password: string
  ) {
    this.id = id;
    this.nom = nom;
    this.ref = ref;
    this.prenom = prenom;
    this.email = email;
    this.password = password;
  }
}
