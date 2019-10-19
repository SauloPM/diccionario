import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Formularios
import { FormsModule } from '@angular/forms';

// HTTP
import { HttpClientModule } from '@angular/common/http';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent         } from './app.component';
import { MenuComponent        } from './componentes/menu/menu.component';
import { FrasesComponent      } from './componentes/frases/frases.component';
import { PalabrasComponent    } from './componentes/palabras/palabras.component';
import { FormularioComponent  } from './componentes/formulario/formulario.component';
import { ExpresionesComponent } from './componentes/expresiones/expresiones.component';
import { ListadoComponent } from './componentes/listado/listado.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FrasesComponent,
    PalabrasComponent,
    FormularioComponent,
    ExpresionesComponent,
    ListadoComponent
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
