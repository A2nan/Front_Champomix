import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private client: HttpClient = inject(HttpClient);
  private readonly url: string = 'http://backend:5000'; // URL du service Docker backend

  constructor() { }

  getChampomi(): Observable<Object> {
    return this.client.get(`${this.url}/champomi`); // Endpoint complet
  }

  getOneChampomi(id: number): Observable<Object> {

    return this.client.get(`${this.url}/champomi/${id}`);

  }

  deleteOneChampomi(id: number): Observable<Object> {

    return this.client.delete(`${this.url}/champomi/${id}`);

  }

  postChampomi(champomi: any): Observable<Object> {
    
    return this.client.post(`${this.url}/champomi`, champomi);

  }

  getUser(): Observable<Object> {
    return this.client.get(`${this.url}/users`); // Endpoint complet
  }

  getOneUser(id: number): Observable<Object> {

    return this.client.get(`${this.url}/users/${id}`);

  }

  deleteUser(id: number): Observable<Object> {
    
    return this.client.delete(`${this.url}/users/${id}`);

  }

  postUser(ajouterUser: any): Observable<Object> {
    
    return this.client.post(`${this.url}/users`, ajouterUser);

  }

  getOrder(): Observable<Object> {
    return this.client.get(`${this.url}/orders`); // Endpoint complet
  }

  getOneOrder(id: number): Observable<Object> {

    return this.client.get(`${this.url}/orders/${id}`);

  }

  deleteOneOrder(id: number): Observable<Object> {

    return this.client.delete(`${this.url}/orders/${id}`);

  }

  postOrder(order: any): Observable<Object> {
    
    return this.client.post(`${this.url}/orders`, order);

  }

}
