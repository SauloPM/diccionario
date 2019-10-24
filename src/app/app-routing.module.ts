import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Rutas protegidas
import { AuthGuard } from './guards/auth.guard';

// Componentes
import { LoginComponent      } from './componentes/login/login.component';
import { InicioComponent     } from './componentes/inicio/inicio.component';
import { ListadoComponent    } from './componentes/listado/listado.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';

const routes: Routes = [

  // Mapeo ruta - componente
  { path: 'login', component: LoginComponent },

  // Mapeo ruta con parámetros - componente
  { path: 'diccionario', component: InicioComponent, canActivate: [ AuthGuard ], children: [
    { path: 'listado/:categoria'                  , component: ListadoComponent,    canActivate: [ AuthGuard ] },
    { path: 'formulario/:operacion/:categoria/:id', component: FormularioComponent, canActivate: [ AuthGuard ] },
  ]},

  // Mapeo ruta » ruta
  { path: '**'                 , pathMatch: 'full', redirectTo: 'login'                       },
  { path: 'diccionario/listado', pathMatch: 'full', redirectTo: 'diccionario/listado/palabras'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
