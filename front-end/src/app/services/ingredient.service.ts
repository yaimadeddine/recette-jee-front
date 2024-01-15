import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private apiUrl = 'http://localhost:8030/ingredients';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.apiUrl);
  }

  findById(ingredientId: number): Observable<Ingredient> {
    const getUrl = `${this.apiUrl}/${ingredientId}`;
    return this.http.get<Ingredient>(getUrl);
  }

  delete(ingredientId: number): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${ingredientId}`;
    return this.http.delete<void>(deleteUrl);
  }

  update(ingredient: Ingredient): Observable<Ingredient> {
    const updateUrl = `${this.apiUrl}/${ingredient.id}`;
    return this.http.put<Ingredient>(updateUrl, ingredient);
  }

  add(newIngredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.apiUrl, newIngredient);
  }
}
