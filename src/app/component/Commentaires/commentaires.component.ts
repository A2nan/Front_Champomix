import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentaireService, Commentaire } from '../../services/commentaire.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-commentaires',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <section class="commentaire-container">
      <h2>Avis de nos clients</h2>
      <div class="commentaire" *ngFor="let avis of avisClients">
        <img [src]="avis.image" alt="Photo client" />
        <div>
          <p><strong>{{ avis.nom }}</strong></p>
          <p>{{ avis.commentaire }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [/* ... même style qu'avant ... */]
})
export class CommentairesComponent implements OnInit {
  avisClients: Commentaire[] = [];

  constructor(private commentaireService: CommentaireService) {}

  ngOnInit() {
    this.commentaireService.getCommentaires().subscribe({
      next: (data) => this.avisClients = data,
      error: (err) => console.error('Erreur récupération commentaires :', err)
    });
  }
}
