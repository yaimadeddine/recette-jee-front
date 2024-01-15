import { ChefService } from './../../services/chef.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chef } from 'src/app/models/chef';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user:Chef ={id:0,nom: '', prenom: '', ref:'',email: '',password:''} ;

  constructor(private router: Router,private chefService:ChefService) {
  }

  ngOnInit(): void {
  }
  redirectToGestionRecettes() {
    this.chefService.authentification(this.user).subscribe(
      (result) => {
        localStorage.clear();
        localStorage.setItem('refUser', result.ref);

        this.router.navigate(['/gestion-recettes']);
      },
      (error) => {
        console.error('Erreur lors de authentification:', error);

      }
    );
  }
  }

