//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpHandler, HttpHeaders, HttpRequest, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import 'rxjs/add/operator/map'

@Injectable()
export class PostProvider {
  server: string = "https://maragojipe.ba.gov.br/assets/api/serrmu";

  constructor(
    private http: HttpClient
  ) { }
  

  requisicaoPost(dados: any, api: string) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let url = this.server + api;
    return this.http.post(url, JSON.stringify(dados), httpOptions).map(res => res);
//      .pipe(map((response: any) => response.json()));
  }




  requisicaoGet(dados: any, api: string) {

    const opcoes = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: dados
    };
    let url = this.server + api;
    return this.http.get(url, opcoes).map(res => res);
//    .pipe(map((response: any) => response.json()));
  }

}