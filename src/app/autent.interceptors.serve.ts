//Servico Interceptor
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from "@angular/common/http";
import { tap } from 'rxjs/operators';


export class AutentInterceptorService implements HttpInterceptor{

intercept( req:HttpRequest <any>, next: HttpHandler) { //HttpHandler Transforma una solicitud Http en una secuencia de eventos para seber lo que esta pasando con la peticion
    //req contiene  objeto de la peticion http y podemos manipularlo o modificarlo con todas sus propiedades y valores
   //En este parte podemos ejectamo el  codigo como un efecto secundario
   console.log('AutentInterceptorService') 
   console.log(req.url)//ver un propiedad del objeto peticion
    

    const modicarPeticion= req.clone({headers:req.headers.append('Auth','autorizacion')})//Clonamos la url y la podemos modificar las propiedades del objeto y asignar nuevos valores
     console.log(modicarPeticion)

     //Interactuar con la respuesta de la peticion
    return next.handle(modicarPeticion)
    // .pipe (tap(event =>{//HttpHandler:devuelve el evento en que se encuntra la peticion son un numero
    //     console.log(event)//Vel el evento
    //     if (event.type===HttpEventType.Response) {
    //         console.log('respuesta finalizada,  data:' )
    //         console.log(event.body)
    //     }
  
    // }))      //Enviar objeto de peticiion modificado o actualizado 
}

}