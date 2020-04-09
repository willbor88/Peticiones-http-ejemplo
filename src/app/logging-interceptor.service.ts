import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType, } from "@angular/common/http";
import { tap } from 'rxjs/operators';



export class loggingInterceptorService implements HttpInterceptor{

intercept( req:HttpRequest <any>, next: HttpHandler) {

    console.log('loggingInterceptorService')
   // console.log(req.url)
    return next.handle(req).pipe(tap(event=>{

        if (event.type === HttpEventType.Response) {
            console.log('recibiendo respuesta')
            console.log(event.body)
        }
    }))

    
}
}
