import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ListadoComponent    } from './componentes/listado/listado.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';

const routes: Routes = [

  // Componetes » Rutas con parámetros
  { path: 'listado/:categoria'   , component: ListadoComponent },
  { path: 'formulario/:categoria', component: FormularioComponent  },

  // Mapeos especiales
  { path: '**', pathMatch: 'full', redirectTo: 'listado/palabras'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
