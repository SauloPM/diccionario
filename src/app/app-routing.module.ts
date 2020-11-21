import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Rutas protegidas
import { AuthGuard } from './guards/auth.guard';

// Componentes
import { EoiComponent       } from './componentes/eoi/eoi.component';
import { LoginComponent     } from './componentes/login/login.component';
import { InicioComponent    } from './componentes/inicio/inicio.component';
import { ListadoComponent   } from './componentes/listado/listado.component';
import { GramaticaComponent } from './componentes/gramatica/gramatica.component';

const routes: Routes = [

  // Mapeo ruta - componente
  { path: 'login', component: LoginComponent },

  // Mapeo ruta con parámetros - componente
  { path: 'diccionario', component: InicioComponent, canActivate: [ AuthGuard ], children: [
    { path: 'eoi/:team'         , component: EoiComponent      , canActivate: [ AuthGuard ] },
    { path: 'gramatica/:id'     , component: GramaticaComponent, canActivate: [ AuthGuard ] },
    { path: 'listado/:categoria', component: ListadoComponent  , canActivate: [ AuthGuard ] },
  ]},

  // Mapeo ruta - ruta
  { path: '**', pathMatch: 'full', redirectTo: 'login'                       },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
