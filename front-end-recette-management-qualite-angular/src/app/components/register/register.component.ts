import { ChefService } from './../../services/chef.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chef } from 'src/app/models/chef';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:Chef ={id:0,nom: '', prenom: '', ref:'',email: '',password:''} ;

  constructor(private router: Router,private chefService:ChefService) {
  }

  ngOnInit(): void {
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


  register() {
    this.user.ref = this.generateRandomReference();
    this.chefService.add(this.user).subscribe(
      (result) => {
        console.log('Chef ajouté avec succès:', result);
        localStorage.clear();
        localStorage.setItem('refUser', result.ref);
        this.router.navigate(['/gestion-recettes']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du chef:', error);
        this.router.navigate(['/gestion-recettes']);

      }
    );
  }

}
