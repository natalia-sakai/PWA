import { GlobalService } from './global.service';

import { AlertService } from 'src/app/services/alert.service';
import { HttpClient, HttpHeaders,HttpHandler } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { tap, catchError,retry } from 'rxjs/operators';
import { EnvService } from './env.service';
import { User } from '../model/user';
import { Response } from 'selenium-webdriver/http';
import { Observable, of, throwError, Observer } from 'rxjs';
import { StringifyOptions } from 'querystring';
import { Storage } from '@ionic/storage';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*pipe e tab são funções independentes do metodo Observable
  pipe cria uma cadeia de operadores
  tab executa os efeitos colaterais 
  */

  //variaveis
  isLoggedIn = false;
  public auxtoken:any;
  public token:any;
  public id:any;
  public date:any;
  public endereco:any;
  public cidade:any;
  public estado:any;
  auxid: any;
  public aux: any;

  /* CRUD - creat, read, update, delete. Carregam valores armazenados */

  constructor(
    private http: HttpClient,
    private env: EnvService, 
    private alertctrl : AlertService, public storage : Storage,
    private global : GlobalService
  )
  {  
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
    } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage); 
  
  }

  //#region POST
  login(email: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/login', 
      {email: email, password: password}
    ).pipe(
      tap(access_token => {
        this.storage.set('token', access_token).then(
          (val) => {
            console.log('Token armazenado');
            this.auxtoken = val.accessToken;
            this.storage.set('access', this.auxtoken);
          },
          error => console.error('Erro ao armazenar o Token', error)
        );
        this.token = access_token;
        this.isLoggedIn = true;
        return this.token;
      })
    );
  }

  register(fName: String, lName: String, email: String, password: String,data_nasc: Date, cargo_id: Number, avental_id:Number, telefone: Number, endereco: String, cidade: String, estado: String) {
    return this.http.post(this.env.API_URL + 'auth/register',
    {
      fName: fName, lName: lName, 
      email: email, password: password, 
      endereco: endereco, cidade: cidade, 
      estado: estado, data_nasc: data_nasc, 
      cargo_id: cargo_id, avental_id:avental_id, telefone:telefone
    }).pipe(
      retry(1),
      catchError(this.handleError)
    ); 
  }

  
  informativo(info:String, id_user:Number, permissao: Number){
    return this.http.post(this.env.API_URL + 'auth/informativo', {
      info:info, id_user:id_user, permissao:permissao
    });
  }

  ordem(ordem:String, id_user:Number){
    return this.http.post(this.env.API_URL + 'auth/ordem', {
      ordem:ordem, id_user:id_user
    });
  }

  agape(agape:String, id_user:Number, date:String){
    return this.http.post(this.env.API_URL + 'auth/agape', {
      agape:agape, id_user:id_user, date:date
    });
  }

  confirma_presenca(id_user: Number, resp: Number, motivo: String)
  {
    return this.http.post(this.env.API_URL + 'auth/listapresenca',
      {id_user: id_user, presenca: resp, motivo: motivo}
    );
  }

  checkpassword(id: Number, password: String)
  {
    return this.http.post(this.env.API_URL + 'auth/checkpassword',
      {id_user: id, password: password}
    ).pipe(
      retry(1),
      catchError(this.handleError)
    ); 
  }

  //#endregion
  
  //#region PUTS
  updateuser(id: Number,fName: String, lName: String, email: String, endereco: String, cidade: String, estado: String, data_nasc: String, telefone: Number) {
    return this.http.put(this.env.API_URL + 'auth/updateuser',
      {id_user: id, fName: fName, lName: lName, email: email, endereco: endereco, cidade: cidade, estado: estado,data_nasc: data_nasc, telefone: telefone}
    );
  }

  updatepassword(id: Number, password: String) {
    return this.http.put(this.env.API_URL + 'auth/updatepassword',
    {id_user: id, password: password}
    );
  }

  updateinfo(id: Number, info:String, ativo: Number): Observable<any>{
    return this.http.put<any>(this.env.API_URL + 'auth/updateinfo',
    {id: id, info: info, ativo: ativo}
    ).pipe(
      retry(1),
      catchError(this.handleError)
    ); 
  }

  updateordem(id: Number, ordem:String, ativo: Number): Observable<any>{
    return this.http.put<any>(this.env.API_URL + 'auth/updateordem',
    {id: id, ordem: ordem, ativo: ativo}
    ).pipe(
      retry(1),
      catchError(this.handleError)
    ); 
  }

  updateagape(id: Number, agape:String, ativo:Number, date:String): Observable<any>{
    return this.http.put<any>(this.env.API_URL + 'auth/updateagape',
    {id: id, agape: agape, ativo: ativo, date:date}
    ).pipe(
      retry(1),
      catchError(this.handleError)
    ); 
  }
  //#endregion

  //#region GET

  reuniao():Observable<any>
  {
    return this.http.get<any>(this.env.API_URL+'auth/reuniao');
  }
  logout() {
    const headers = new HttpHeaders({
      'Authorization': "Bearer "+this.global.access
      });
    return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.isLoggedIn = false;
        this.storage.remove('access');
        this.storage.remove('token');
        delete this.token;
        delete this.global.access;
        return data;
      })
    )
  }

  user() {
    const headers = new HttpHeaders({
    'Authorization': "Bearer "+this.global.access
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      retry(1),
      catchError(this.handleError)
    ); 
  }

  getUsers(id: Number){
    return this.http.post(this.env.API_URL + 'auth/getusers',
    {id_user:id}
    ); 
  }

  getId(): Observable<any>
  {
    const headers = new HttpHeaders({
      'Authorization': "Bearer "+this.global.access
    });
    return this.http.get<any>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      retry(1),
      catchError(this.handleError)
    ); 
  }

  getToken() {
    return this.storage.get('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
          //this.isLoggedIn=true; //teste
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false; //--> é esse
        //this.isLoggedIn=true; //-->teste  
      }
    );
  }

  getReuniao(): Observable<any> {
    return this.http.get<any>( this.env.API_URL+'auth/getreuniao');
  }

  getAllReuniao(): Observable<any> {
    return this.http.get<any>( this.env.API_URL+'auth/getallreuniao');
  }

  getLista(): Observable<any>
  {
    return this.http.get<any>( this.env.API_URL+'auth/getlista');
  }

  getAllLista(id:Number): Observable<any>
  {
    return this.http.post<any>( this.env.API_URL+'auth/getalllista',{id:id});
  }

  getInfo(): Observable<any>
  {
    return this.http.get<any>( this.env.API_URL+'auth/getinfo');
  }

  getAllInfo(): Observable<any>
  {
    return this.http.get<any>( this.env.API_URL+'auth/getallinfo');
  }

  getOrdem(): Observable<any>
  {
    return this.http.get<any>( this.env.API_URL+'auth/getordem');  
  }

  getAllOrdem(): Observable<any>
  {
    return this.http.get<any>( this.env.API_URL+'auth/getordem');  
  }

  getCargos()
  {
    return this.http.get<any>( this.env.API_URL+'auth/getcargos').pipe(
      retry(1),
      catchError(this.handleError)
      ); 
  }

  getAgape()
  {
    return this.http.get<any>( this.env.API_URL+'auth/getagape').pipe(
      retry(1),
      catchError(this.handleError)
      ); 
  }

  getAllAgape()
  {
    return this.http.get<any>( this.env.API_URL+'auth/getallagape').pipe(
      retry(1),
      catchError(this.handleError)
      ); 
  }

  getAvental(){
    return this.http.get<any>( this.env.API_URL+'auth/getavental').pipe(
      retry(1),
      catchError(this.handleError)
      );
  }
  //#endregion
}