import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { FrasesComponent      } from './componentes/frases/frases.component';
import { PalabrasComponent    } from './componentes/palabras/palabras.component';
import { FormularioComponent  } from './componentes/formulario/formulario.component';
import { ExpresionesComponent } from './componentes/expresiones/expresiones.component';

const routes: Routes = [

  // Componentes
  { path: 'frases'     , component: FrasesComponent      },
  { path: 'palabras'   , component: PalabrasComponent    },
  { path: 'expresiones', component: ExpresionesComponent },

  // Componetes » Rutas con parámetros
  { path: 'formulario/:id' , component: FormularioComponent  },

  // Mapeos especiales
  { path: '**', pathMatch: 'full', redirectTo: 'palabras'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
