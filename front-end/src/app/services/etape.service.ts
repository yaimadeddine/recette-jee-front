import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etape } from '../models/etape';

@Injectable({
  providedIn: 'root'
})
export class EtapeService {

  private apiUrl = 'http://localhost:8030/etapes';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Etape[]> {
    return this.http.get<Etape[]>(this.apiUrl);
  }

  findById(etapeId: number): Observable<Etape> {
    const getUrl = `${this.apiUrl}/${etapeId}`;
    return this.http.get<Etape>(getUrl);
  }

  delete(etapeId: number): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${etapeId}`;
    return this.http.delete<void>(deleteUrl);
  }

  update(etape: Etape): Observable<Etape> {
    const updateUrl = `${this.apiUrl}/${etape.id}`;
    return this.http.put<Etape>(updateUrl, etape);
  }

  add(newEtape: Etape): Observable<Etape> {
    return this.http.post<Etape>(this.apiUrl, newEtape);
  }
}
