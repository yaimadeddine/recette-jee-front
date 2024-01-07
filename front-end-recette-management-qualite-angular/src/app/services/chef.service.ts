import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chef } from '../models/chef';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  private apiUrl = 'http://localhost:8888/USER-MS/api/user/';
  constructor(private http: HttpClient) { }

  findAll(): Observable<Chef[]> {
    return this.http.get<Chef[]>(this.apiUrl);
  }

  findById(chefId: number): Observable<Chef> {
    const getUrl = `${this.apiUrl}/${chefId}`;
    return this.http.get<Chef>(getUrl);
  }

  delete(chefId: number): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${chefId}`;
    return this.http.delete<void>(deleteUrl);
  }

  update(chef: Chef): Observable<Chef> {
    const updateUrl = `${this.apiUrl}/${chef.id}`;
    return this.http.put<Chef>(updateUrl, chef);
  }

  add(newChef: Chef): Observable<Chef> {
    return this.http.post<Chef>(this.apiUrl, newChef);
  }
  authentification(chef: Chef): Observable<Chef> {
    return this.http.post<Chef>(`${this.apiUrl}authentification`, chef);
  }
}
