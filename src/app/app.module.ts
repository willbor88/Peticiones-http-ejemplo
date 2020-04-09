import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AutentInterceptorService } from './autent.interceptors.serve';
import { loggingInterceptorService } from './logging-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],//useClass: apuntar a la clase que agraguemos el interceptor  
  providers: [
    //Los interceptors se ejecutaran en el orden declarado en el array providers
    {provide:HTTP_INTERCEPTORS,useClass:AutentInterceptorService,multi:true},//Token con el cual la inyeccion del servicio se identificara, multi parmite varios interceptores
    {provide:HTTP_INTERCEPTORS,useClass:loggingInterceptorService,multi:true}//
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
