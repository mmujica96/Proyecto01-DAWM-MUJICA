import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  constructor(private http: HttpClient) { }
  obtenerPeliculas() {
    return this.http.get('http://localhost:3000/api/peliculas')
    }
  obtenerPeliculaPorId(id: number) {
    return this.http.get('http://localhost:3000/api/peliculas/'+id.toString())
  }
}
