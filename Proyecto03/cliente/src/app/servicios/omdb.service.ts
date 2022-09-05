import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  url = "http://www.omdbapi.com/?apikey=5c84f445";
  constructor(private http: HttpClient) { }

  getQuery (query: string){
    const url = `${this.url}${query}`;
    return this.http.get(url);
  }
}
