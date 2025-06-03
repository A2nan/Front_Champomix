import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Commentaire {
  nom: string;
  commentaire: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private apiUrl = 'http://localhost:3000/commentaires';

  constructor(private http: HttpClient) {}

  getCommentaires(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(this.apiUrl);
  }
}
