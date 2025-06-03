import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentaireService, Commentaire } from '../../services/commentaire.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-commentaires',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <section class="commentaire-container">
      <h2>Avis de nos clients</h2>

      <form (ngSubmit)="soumettreCommentaire()" #form="ngForm" class="form-commentaire">
        <input type="text" name="nom" [(ngModel)]="nouveau.nom" placeholder="Votre nom" required />
        <input type="text" name="image" [(ngModel)]="nouveau.image" placeholder="URL image (optionnelle)" />
        <textarea name="commentaire" [(ngModel)]="nouveau.commentaire" placeholder="Votre avis" required></textarea>
        <button type="submit" [disabled]="form.invalid">Envoyer</button>
      </form>

      <div class="commentaire" *ngFor="let avis of avisClients">
        <img [src]="avis.image" alt="Photo client" />
        <div>
          <p><strong>{{ avis.nom }}</strong></p>
          <p>{{ avis.commentaire }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
  .commentaire-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .form-commentaire {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;
    max-width: 500px;
  }

  .form-commentaire input,
  .form-commentaire textarea {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .form-commentaire button {
    background: #007acc;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  .form-commentaire button:disabled {
    background: #aaa;
  }

  .commentaire {
    display: flex;
    align-items: center;
    gap: 15px;
    background: #f9f9f9;
    margin: 10px 0;
    padding: 10px;
    border-radius: 8px;
  }

  .commentaire img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
`]

})
export class CommentairesComponent implements OnInit {
  avisClients: Commentaire[] = [];

  nouveau = {
    nom: '',
    commentaire: '',
    image: ''
  };


  constructor(private commentaireService: CommentaireService) {}

  ngOnInit() {
    this.commentaireService.getCommentaires().subscribe({
      next: (data) => {
        console.log('Commentaires rechargés depuis la BDD :', data);
        this.avisClients = data;
      },
      error: (err) => console.error('Erreur récupération commentaires :', err)
    });
  }

  
  soumettreCommentaire() {
    console.log("Formulaire soumis :", this.nouveau); // 👈 Test
    const { nom, commentaire, image } = this.nouveau;
    this.commentaireService.addCommentaire(nom, commentaire, image).subscribe({
      next: (data) => {
        this.avisClients.push(data);
        this.nouveau = { nom: '', commentaire: '', image: '' };
      },
      error: (err) => {
        console.error('Erreur ajout commentaire :', err);
      }
    });
  }


}
