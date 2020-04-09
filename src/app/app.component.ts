import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from "./post.model";
import { ServicioPost } from './posts.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  arrayPosts:Post[]= [];//Usamos el modelo para definir un array de ese tipo de datos
  cargando=false
error=null
private errorSub:Subscription

  constructor(private postsService:ServicioPost) {}

  ngOnInit() {
   this.errorSub= this.postsService.errors.subscribe(mensajeError=>{//Recibimos el valor del observable error
      this.error=mensajeError
    })

    this.cargando=true
    this.postsService.extraerPost().subscribe(postRecibidos=>{
      this.cargando=false
      this.arrayPosts= postRecibidos
      //console.log(postRecibidos)
    }, error =>{
      this.cargando=false
      this.error=error.message
    }
    )
  }

  CrearPost(datosPost:Post) {
this.postsService.CrearPosts(datosPost.title,datosPost.content)
           
  }


  borrarPost() {

    this.postsService.borrarPost().subscribe(()=>{
        this.arrayPosts=[]
          })
    
  }

  extraerPosts(){
    this.cargando=true
     this.postsService.extraerPost().subscribe(postRecibidos =>{
     this.cargando=false
      //this.arrayPosts= postRecibidos
    }, error =>
    {
      this.cargando=false
      this.error=error.message
     console.log(error)//Ver el objeto del error
      
    }
    
    )
    }
    mangejoHerror(){
      this.error=null
    }

    ngOnDestroy(){
      this.errorSub.unsubscribe()
    }

}
