import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ListadoComponent    } from './componentes/listado/listado.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';

const routes: Routes = [

  // Componetes » Rutas con parámetros
  { path: 'formulario/:id'    , component: FormularioComponent  },
  { path: 'listado/:categoria', component: ListadoComponent },

  // Mapeos especiales
  { path: '**', pathMatch: 'full', redirectTo: 'listado/palabras'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
