import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private apiUrl = "http://localhost:8888/RECETTE-MS/api/type-recette/";

  constructor(private http: HttpClient) { }

  findAll(): Observable<Type[]> {
    return this.http.get<Type[]>(this.apiUrl);
  }

  delete(typeId: number): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${typeId}`;
    return this.http.delete<void>(deleteUrl);
  }

  update(type: Type): Observable<Type> {
    const updateUrl = `${this.apiUrl}/${type.id}`;
    return this.http.put<Type>(updateUrl, type);
  }

  add(newType: Type): Observable<Type> {
    return this.http.post<Type>(this.apiUrl, newType);
  }

}
