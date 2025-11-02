import { Injectable, inject } from '@angular/core';
import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private http: HttpClient = inject(HttpClient);
  private stripe: Stripe | null = null;
  private readonly apiUrl = environment.apiUrl;
  private readonly publishableKey = environment.stripePublishableKey;

  constructor() {
    this.initializeStripe();
  }

  private async initializeStripe(): Promise<void> {
    this.stripe = await loadStripe(this.publishableKey);
  }

  /**
   * Crée une session de paiement Stripe via le backend
   * @param items Liste des items à acheter
   * @param successUrl URL de redirection en cas de succès
   * @param cancelUrl URL de redirection en cas d'annulation
   */
  createCheckoutSession(items: any[], successUrl?: string, cancelUrl?: string): Observable<any> {
    // Format attendu par le backend Stripe
    const payload = {
      line_items: items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name || `Champomi ${item.id}`,
            description: item.description || ''
          },
          unit_amount: item.price || item.amount || 1000 // Montant en centimes
        },
        quantity: item.quantity || 1
      })),
      success_url: successUrl || `${window.location.origin}/checkout?status=success`,
      cancel_url: cancelUrl || `${window.location.origin}/checkout?status=cancel`
    };

    return this.http.post(`${this.apiUrl}/create-checkout-session`, payload);
  }

  /**
   * Redirige vers la page de paiement Stripe Checkout
   */
  async redirectToCheckout(sessionId: string): Promise<void> {
    if (!this.stripe) {
      await this.initializeStripe();
    }
    
    if (this.stripe) {
      // Utiliser la méthode redirectToCheckout avec un type casting si nécessaire
      const result = await (this.stripe as any).redirectToCheckout({
        sessionId: sessionId
      });

      if (result.error) {
        console.error('Erreur lors de la redirection vers Stripe:', result.error);
        throw result.error;
      }
    }
  }

  /**
   * Méthode alternative : créer et rediriger directement
   */
  async checkout(items: any[]): Promise<void> {
    try {
      const session = await firstValueFrom(this.createCheckoutSession(items));
      
      // Gérer différents formats de réponse du backend
      let sessionId: string | null = null;
      
      if (session) {
        // Format 1: { sessionId: "..." }
        if (session.sessionId) {
          sessionId = session.sessionId;
        }
        // Format 2: { id: "..." }
        else if (session.id) {
          sessionId = session.id;
        }
        // Format 3: { session: { id: "..." } }
        else if (session.session && session.session.id) {
          sessionId = session.session.id;
        }
        // Format 4: { data: { id: "..." } }
        else if (session.data && session.data.id) {
          sessionId = session.data.id;
        }
        // Format 5: URL directe
        else if (session.url) {
          // Si le backend retourne directement l'URL, rediriger manuellement
          window.location.href = session.url;
          return;
        }
      }

      if (sessionId) {
        await this.redirectToCheckout(sessionId);
      } else {
        throw new Error('Session ID manquant dans la réponse du backend');
      }
    } catch (error: any) {
      console.error('Erreur lors de la création de la session de paiement:', error);
      
      // Fournir un message d'erreur plus explicite
      if (error.error && error.error.message) {
        throw new Error(error.error.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Impossible de créer la session de paiement. Vérifiez votre connexion au backend.');
      }
    }
  }

  /**
   * Récupère l'instance Stripe
   */
  getStripe(): Stripe | null {
    return this.stripe;
  }
}
