import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject,throwError } from 'rxjs';

@Injectable({providedIn:'root'})
export class ServicioPost{

  errors = new Subject()//Observable:El error es un string
    constructor(private http: HttpClient) {}

CrearPosts(title:string,content:string){
const DatosPost :Post={title:title,content:content}


 this.http
 .post<{name:string}>(//Especificar a typescrit que formato o tipo de datos recibiremos de la peticion http atreves del body de la peticion  usando  "<>""
   'https://angular-http-1f4ea.firebaseio.com/posts.json',//la extencion .json solo es necesario en Firebase
   DatosPost,//El body de la peticion :La data para almacenar
  { observe:'response'}
 )
 //Valider si hubo respuesta
 .subscribe(respuestaData => {
   console.log(respuestaData );
   
 }, error=>{
   this.errors.next(error.message)//Le pasamos el mensaje del  error al obsevable errros.Detecta cuando hay un error 
 }
 
 );

}


extraerPost(){
    const postsArray:Post[] =[]//Definir el tipo de array
  // let parametros= new HttpParams()
   //parametros= parametros.append('print','pretty')//Añadir multiples parametros a la busqueda usando append
  // parametros= parametros.append('costom','key') 

   return this.http.get<{[key:string]:Post}>('https://angular-http-1f4ea.firebaseio.com/posts.json', //Returnamos la peticion y aclaramos el tipo de valor que esperamos 
  
   {headers: new HttpHeaders ({"Custom-Header":'Hello'}),//Configuara headers
    params:new  HttpParams ().set('print','pretty'),//Configurar parametros
   // params:parametros//variable con multijples parametros
     })
    .pipe(map((DatosRecibidos) =>{
          
  //Metodo para recorrer los elementos o propiedades  de un objeto
      for (const key in DatosRecibidos) {//El key es el nombre de cada elemento del objeto
        if (DatosRecibidos.hasOwnProperty(key)) {//hasOwnProperty:Valida que cada elmento si tenga un key o nombre
          postsArray.push({...DatosRecibidos[key],id:key})//DatosRecibidos[key] extrae  el valor de cada  elemento del objeto
        //Luego copio las propiedades o elementos de cada objeto   y añado a una nueva propiedad 'id' a cada elemento y finalmente push a nuestro array
       }
         }
         return postsArray//El map retorna a la peticion
  
        }), 
        catchError(errorRes=>
          //Tareas de Manejo de errores
         throwError(errorRes)
        )
        )
        
          
}


borrarPost(){
 
 return this.http.delete('https://angular-http-1f4ea.firebaseio.com/posts.json',
 {
 observe:'events'//ver los estados de la peticion:Sent,UploadProgress,ResponseHeader,response
 }
 ) .pipe(tap(event=>{//Observable:Cada vez que detecta cambios en su fuente permite ejecutar otro codigo sin afectar la data recibida 
  console.log(event)

   if (event.type === HttpEventType.Response) {///
     console.log(event.status)
   }
 }))

}


}