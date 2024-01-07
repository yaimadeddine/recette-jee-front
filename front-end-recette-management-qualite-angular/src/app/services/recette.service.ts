import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recette } from '../models/recette';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  private apiUrl = 'http://localhost:8888/RECETTE-MS/api/recette/';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Response[]> {
    return this.http.get<Response[]>(this.apiUrl);
  }
  findByUserRef(): Observable<Response[]> {
    const getUrl = `${this.apiUrl}/user-id/${localStorage.getItem('refUser')||"ZE787"}`;
    return this.http.get<Response[]>(getUrl);
  }

  findById(recetteId: string): Observable<Recette> {
    const getUrl = `${this.apiUrl}/ref/${recetteId}`;
    return this.http.get<Recette>(getUrl);
  }

  delete(recetteId: string): Observable<void> {
    const deleteUrl = `${this.apiUrl}ref/${recetteId}`;
    return this.http.delete<void>(deleteUrl);
  }

  update(recette: Recette): Observable<Recette> {
    return this.http.put<Recette>(this.apiUrl, recette);
  }

  add(newRecette: Recette): Observable<Recette> {
    console.log(newRecette);
    return this.http.post<Recette>(this.apiUrl, newRecette);
  }
}
