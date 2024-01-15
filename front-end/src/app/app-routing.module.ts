import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GestionRecettesComponent } from './components/gestion-recettes/gestion-recettes.component';
import { DetailsRecetteComponent } from './components/details-recette/details-recette.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
// import {ImageUploadComponent} from "./components/image-upload/image-upload.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'gestion-recettes', component: GestionRecettesComponent, canActivate: [AuthService] },
  { path: 'recettes', component: HomeComponent },
  { path: 'recette/:id', component: DetailsRecetteComponent },
  // { path: 'test', component: ImageUploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
