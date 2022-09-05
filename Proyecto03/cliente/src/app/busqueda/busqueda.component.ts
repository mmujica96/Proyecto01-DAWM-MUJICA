import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OmdbService } from '../servicios/omdb.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  search: string="";
  resultados:any;
  constructor(private serviceOmdb: OmdbService, private routes:Router) { }

  ngOnInit(): void {
  }
  buscar(){
    this.serviceOmdb.getQuery(`&s=${this.search}`)
      .subscribe((response: any) =>{
        console.log(response);
        
        this.resultados= response['Search'];
      });
  }

  detalle(id: string){
    this.routes.navigate(['/detalle',id]);
  }
}
