import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from '../servicios/omdb.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  detalle:any;

  constructor(private router: ActivatedRoute, private serviceOmdb: OmdbService) {
    this.router.params.subscribe(params => {
      this.serviceOmdb.getQuery(`&i=${params['id']}&plot='full'`)
      .subscribe(response =>{
        console.log(response);
        this.detalle= response;
      })
    });
   }

  ngOnInit(): void {
  }

  

}
