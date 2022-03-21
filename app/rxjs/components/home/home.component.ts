import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { catchError, debounceTime, filter, first, last, map, Observable, Observer, of, retry, Subject, take, takeWhile, throwError, timeout } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  control: FormControl = new FormControl('', [
    Validators.required
  ])


  obs$: Observable<number> = new Observable<number> ((observer: Observer<number>)  =>{ /* observer é quem está observando e retornando os dados */

    let i = 0

    let id = setInterval(() => {
      i++

      if(i<=5) {
        observer.next(i) /* função de sucesso, para retornar os valores (next) */
      } else {
        clearInterval(id) /* Para parar o intervalo, através do id */
        observer.error('Deu problema cara, tente outro dia')
        observer.complete() /* Envia a mensagem que o Observer foi completado */
      }
    }, 20000)

  })

  sub$: Subject<string> = new Subject<string>()  /* Pode tanto observar, quanto mandar dados para serem observados */
  
  constructor() { }


  ngOnInit(): void {
    this.obs$.pipe( /* pipe pega os dados retornados e através dele */
      /* map((x) =>{ */ /* Assim como o método map dos Arrays,o operador map recebe uma função que faz modificações nos dados e os retornam com as devidas alterações. */
      /*   return x **2
      }),
      map((x) => {
        return x / 2 
      }),
      map((valor) =>{
        return valor * 40
      }) ,*/

      /* filter((x) =>{ */ /* Funciona como um filtro, assim como no Array, neste exemplo, está retornando números pares */
      /*   return x % 2 == 0
      }),
      map((y) =>{
        return y * 30
        
      }), */
/* 
      first(), */ /* sempre retorna o primeiro valor */
     /*  first((v) =>{
        return v % 2 == 0
      }), */

      /* last(), */ /* sempre retorna o último valor */
/* 
      last((x) =>{
        return x % 2 == 0
      }), */

      /* take(3), */ /* O take faz com que peguemos apenas a quantidade que quiser */

      /* takeWhile((x) =>{ */ /* O takewhile faz com que peguemos apenas a quantidade que quiser, através de uma condição  */
      /*   return x < 8
      }), */

     /*  filter((z) =>{
        return z % 2 == 0
      }), */

      /* catchError(function(err) { */ /* É um operador de tratador de erro, ele captura o erro que deu em seu Observable */
        /* return of(err, 'Deu ruim', 5) */ /* Retorna o tanto de dados que quisermos, pode ser o próprio erro ou outros */

        /* return throwError(err)  *//* O throwError obriga a dar erro */
      /* }), */

     /*  retry(3), */ /* Quantas vezes que você quer tentar recuperar os dados do Observable */
      
      timeout(5000),/* Espera um tempo para que o observable retorne os dados, caso não realize, aparecerá a mensagem de erro  */ 

      catchError(err => {
        let obj = {
          hasError: true,
          msg: err
        }
        return of(obj)
      })

    ).subscribe(
      (value) => {
        console.log(value)
      },
      (err) => {
        console.log('Ocorreu um erro, Leia a mensagem abaixo')
        console.log(err)
      }
    )
  
    

  this.sub$.pipe(
      debounceTime(3000) /* Antes do dado ser retornado, vai esperar um determinado tempo em milisegundos*/
    ).subscribe(
    (valor) => { /* Resultado de sucesso */
      console.log(valor)
    }
  )

}

request(): void {
  this.sub$.next(this.control.value)
}

}
