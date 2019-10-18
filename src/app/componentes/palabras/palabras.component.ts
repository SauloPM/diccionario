import { Component, OnInit } from '@angular/core';

// Modelos
import { ElementoModel } from './../../modelos/elemento.models';

// Servicios
import { ServicioService } from './../../servicios/servicio.service';

@Component({
  selector: 'app-palabras',
  templateUrl: './palabras.component.html',
  styleUrls: ['./palabras.component.scss']
})
export class PalabrasComponent implements OnInit {

  palabras: ElementoModel[] = [];

  constructor( private servicio: ServicioService ) { }

  ngOnInit() {

    this.servicio.getPalabras().subscribe( ( data: any[] ) => {
      console.log(data);
      this.palabras = data;
    });
  }
}
