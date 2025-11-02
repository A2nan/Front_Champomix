# Configuration Stripe - Guide de Setup

## ✅ Frontend (Déjà configuré)

L'intégration Stripe côté frontend est complète et fonctionnelle. Voici ce qui a été mis en place :

### 1. Dépendances installées
- `@stripe/stripe-js` - SDK Stripe pour le frontend

### 2. Fichiers créés/modifiés

#### Service Stripe (`src/app/services/stripe.service.ts`)
- Service pour gérer les paiements Stripe
- Méthodes pour créer des sessions de checkout et rediriger vers Stripe

#### Composant Checkout (`src/app/component/checkout/`)
- Interface utilisateur pour le checkout
- Gestion des statuts (checkout, success, cancel)
- Calcul du total

#### Intégration dans ChampomiList
- Bouton "Acheter avec Stripe" sur chaque produit
- Redirection vers le checkout

### 3. Configuration des clés Stripe

Les clés Stripe sont configurées dans les fichiers d'environnement :
- `src/environments/environments.ts` (développement) - Clé de test
- `src/environments/environments.prod.ts` (production) - Clé de production

**⚠️ IMPORTANT :** Remplacez les clés par défaut par vos vraies clés Stripe depuis votre dashboard Stripe.

## 🔧 Configuration Backend Requise

Pour que le paiement fonctionne complètement, vous devez configurer un endpoint backend qui créera les sessions Stripe.

### Endpoint Backend Nécessaire

Votre backend doit exposer un endpoint POST : `/create-checkout-session`

#### Requête attendue :
```json
{
  "items": [
    {
      "id": 1,
      "name": "Nom du produit",
      "amount": 1000,  // Montant en centimes (1000 = 10.00€)
      "quantity": 1
    }
  ],
  "success_url": "http://localhost:4200/checkout?status=success",
  "cancel_url": "http://localhost:4200/checkout?status=cancel"
}
```

#### Réponse attendue :
```json
{
  "sessionId": "cs_test_...",  // ou "id": "cs_test_..."
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

### Exemple d'implémentation Backend (Node.js/Express)

```javascript
const stripe = require('stripe')('sk_test_VOTRE_CLE_SECRETE');
const express = require('express');
const app = express();

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, success_url, cancel_url } = req.body;

    // Créer la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: item.amount, // En centimes
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: success_url,
      cancel_url: cancel_url,
    });

    res.json({ sessionId: session.id, id: session.id });
  } catch (error) {
    console.error('Erreur Stripe:', error);
    res.status(500).json({ error: error.message });
  }
});
```

### Exemple d'implémentation Backend (Python/Flask)

```python
from flask import Flask, request, jsonify
import stripe

app = Flask(__name__)
stripe.api_key = 'sk_test_VOTRE_CLE_SECRETE'

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = request.json
        items = data.get('items', [])
        success_url = data.get('success_url')
        cancel_url = data.get('cancel_url')

        line_items = []
        for item in items:
            line_items.append({
                'price_data': {
                    'currency': 'eur',
                    'product_data': {
                        'name': item.get('name', 'Produit'),
                    },
                    'unit_amount': item.get('amount', 1000),  # En centimes
                },
                'quantity': item.get('quantity', 1),
            })

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=success_url,
            cancel_url=cancel_url,
        )

        return jsonify({'sessionId': session.id, 'id': session.id})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

## 🧪 Test avec Stripe en mode Test

1. Utilisez les cartes de test Stripe :
   - Carte valide : `4242 4242 4242 4242`
   - Date d'expiration : n'importe quelle date future (ex: 12/25)
   - CVC : n'importe quel 3 chiffres (ex: 123)
   - Code postal : n'importe quel code postal

2. Pour tester un échec de paiement :
   - Carte refusée : `4000 0000 0000 0002`

## 📝 Checklist de Configuration

- [x] Installation de `@stripe/stripe-js`
- [x] Service Stripe créé
- [x] Composant Checkout créé
- [x] Routes configurées
- [x] Bouton de paiement intégré
- [ ] **Backend endpoint `/create-checkout-session` créé**
- [ ] **Clé secrète Stripe configurée côté backend**
- [ ] **Clé publique Stripe remplacée dans `environments.ts`**
- [ ] **Clé publique de production configurée dans `environments.prod.ts`**

## 🔗 Ressources

- [Documentation Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe Dashboard](https://dashboard.stripe.com/)
- [Cartes de test Stripe](https://stripe.com/docs/testing)


