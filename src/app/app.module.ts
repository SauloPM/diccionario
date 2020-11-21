import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Formularios
import { FormsModule } from '@angular/forms';

// HTTP
import { HttpClientModule } from '@angular/common/http';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent        } from './app.component';
import { MenuComponent       } from './componentes/menu/menu.component';
import { LoginComponent      } from './componentes/login/login.component';
import { InicioComponent     } from './componentes/inicio/inicio.component';
import { ListadoComponent    } from './componentes/listado/listado.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { GramaticaComponent } from './componentes/gramatica/gramatica.component';
import { EoiComponent } from './componentes/eoi/eoi.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListadoComponent,
    FormularioComponent,
    LoginComponent,
    InicioComponent,
    GramaticaComponent,
    EoiComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
