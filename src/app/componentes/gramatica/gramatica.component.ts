import { Component, OnInit } from '@angular/core';

// Get parameter from URL
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gramatica',
  templateUrl: './gramatica.component.html',
  styleUrls: ['./gramatica.component.scss']
})
export class GramaticaComponent implements OnInit {

  titulo      : string;
  tiempoVerbal: string;

  constructor( private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.getTiempoVerbal();
  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  getTiempoVerbal() {
    this.activatedRoute.params.subscribe( parametroURL => {
      this.tiempoVerbal = parametroURL.id;
      this.titulo = this.sanitize( this.tiempoVerbal );
    });
  }

  sanitize( secuencia: string ) {

    // Cambiamos los guiones altos por espacios
    secuencia = secuencia.replace( /-/g, ' ' );

    // Pasamos la primera letra a mayúscula
    secuencia = secuencia.replace( secuencia[0], secuencia[0].toUpperCase() );
    
    return secuencia;
  }
}
