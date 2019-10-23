import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { LoginComponent      } from './componentes/login/login.component';
import { InicioComponent     } from './componentes/inicio/inicio.component';
import { ListadoComponent    } from './componentes/listado/listado.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';

const routes: Routes = [

  // Componentes
  { path: 'login', component: LoginComponent },

  // Componetes » Rutas con parámetros
  { path: 'inicio'                              , component: InicioComponent     },
  { path: 'listado/:categoria'                  , component: ListadoComponent    },
  { path: 'formulario/:operacion/:categoria/:id', component: FormularioComponent },

  // Mapeos especiales
  { path: '**', pathMatch: 'full', redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
