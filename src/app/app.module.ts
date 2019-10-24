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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListadoComponent,
    FormularioComponent,
    LoginComponent,
    InicioComponent
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
