# 📍 Documentation des Routes - Front Champomix

## 🌐 Base URL

**Développement** : `http://localhost:4200`  
**Production** : `/champomix/` (configuré dans `angular.json`)

---

## 📋 Liste Complète des Routes

### 1. **Route Racine** (`/`)
- **Path** : `''` (vide)
- **Composant** : Redirection automatique
- **Comportement** : Redirige automatiquement vers `/Champomi`
- **URL complète** : `http://localhost:4200/` → redirige vers `/Champomi`

---

### 2. **Liste des Champomis** (`/Champomi`)
- **Path** : `'Champomi'`
- **Composant** : `ChampomiListComponent`
- **Description** : Page principale affichant la liste des produits (Champomis), utilisateurs et commandes
- **URL complète** : `http://localhost:4200/Champomi`
- **Fonctionnalités** :
  - ✅ Affichage de la liste des Champomis
  - ✅ Affichage de la liste des Utilisateurs
  - ✅ Affichage de la liste des Commandes
  - ✅ CRUD pour Champomis, Users, Orders
  - ✅ Bouton "Acheter avec Stripe" pour chaque Champomi

---

### 3. **Page Utilisateurs** (`/user`)
- **Path** : `'user'`
- **Composant** : `UserComponent`
- **Description** : Page de gestion des utilisateurs
- **URL complète** : `http://localhost:4200/user`
- **Fonctionnalités** : Gestion des utilisateurs

---

### 4. **Détail Utilisateur** (`/user/:id`)
- **Path** : `'user/:id'`
- **Composant** : `UserdetailComponent`
- **Paramètre** : `id` (ID de l'utilisateur)
- **Description** : Page de détail d'un utilisateur spécifique
- **URL complète** : `http://localhost:4200/user/1` (exemple avec ID 1)
- **Exemples** :
  - `/user/1` → Détails de l'utilisateur avec l'ID 1
  - `/user/5` → Détails de l'utilisateur avec l'ID 5

---

### 5. **Paramètres** (`/settings`)
- **Path** : `'settings'`
- **Composant** : `SettingsComponent`
- **Description** : Page des paramètres de l'application
- **URL complète** : `http://localhost:4200/settings`

---

### 6. **Chat** (`/chat`)
- **Path** : `'chat'`
- **Composant** : `ChatComponent`
- **Description** : Page de chat/messagerie
- **URL complète** : `http://localhost:4200/chat`

---

### 7. **Checkout / Paiement** (`/checkout`)
- **Path** : `'checkout'`
- **Composant** : `CheckoutComponent`
- **Description** : Page de paiement Stripe
- **URL complète** : `http://localhost:4200/checkout`
- **Paramètres de requête optionnels** :
  - `?status=success` → Affiche la page de succès après paiement
  - `?status=cancel` → Affiche la page d'annulation
- **Exemples** :
  - `/checkout` → Page de checkout normale
  - `/checkout?status=success` → Page de confirmation de paiement réussi
  - `/checkout?status=cancel` → Page d'annulation de paiement
- **Fonctionnalités** :
  - ✅ Affichage du panier
  - ✅ Calcul du total
  - ✅ Intégration Stripe Checkout
  - ✅ Gestion des statuts (checkout, success, cancel)

---

### 8. **Page 404** (`/404`)
- **Path** : `'404'`
- **Composant** : `PageNotFoundComponent`
- **Description** : Page d'erreur 404 personnalisée
- **URL complète** : `http://localhost:4200/404`

---

### 9. **Route Wildcard** (`**`)
- **Path** : `'**'` (catch-all)
- **Composant** : `PageNotFoundComponent`
- **Description** : Route par défaut pour toutes les URLs non définies
- **Comportement** : Affiche la page 404 pour toutes les routes inconnues
- **Exemples de routes qui déclenchent cette route** :
  - `/xyz`
  - `/test/123`
  - `/nimportequoi`

---

## 🔄 Navigation Programmatique

### Routes utilisées dans le code :

1. **Dans `checkout.component.ts`** :
   ```typescript
   this.router.navigate(['/Champomi']); // Retour à la liste des Champomis
   ```

2. **Dans `champomi-list.component.ts`** :
   ```typescript
   this.router.navigate(['/checkout']); // Aller au checkout
   ```

---

## 📊 Résumé des Routes

| Route | Path | Composant | Description |
|-------|------|-----------|-------------|
| 🏠 Accueil | `/` | Redirection | Redirige vers `/Champomi` |
| 📦 Champomis | `/Champomi` | `ChampomiListComponent` | Liste des produits |
| 👤 Users | `/user` | `UserComponent` | Liste des utilisateurs |
| 👤 User Detail | `/user/:id` | `UserdetailComponent` | Détail d'un utilisateur |
| ⚙️ Settings | `/settings` | `SettingsComponent` | Paramètres |
| 💬 Chat | `/chat` | `ChatComponent` | Chat/Messagerie |
| 💳 Checkout | `/checkout` | `CheckoutComponent` | Paiement Stripe |
| ❌ 404 | `/404` ou `/**` | `PageNotFoundComponent` | Page d'erreur |

---

## 🎯 Routes avec Paramètres

### Route avec paramètre dynamique :
- **`/user/:id`** - `:id` est un paramètre dynamique

### Routes avec query params :
- **`/checkout?status=success`**
- **`/checkout?status=cancel`**

---

## 🔗 Navigation dans l'Application

### Depuis le Header (`header.component.html`) :
- Lien vers `/Champomi` disponible dans le header

### Depuis les Composants :
- Bouton "Acheter avec Stripe" → `/checkout`
- Bouton "Retour" dans checkout → `/Champomi`
- Liens vers détails utilisateur → `/user/:id`

---

## ⚠️ Notes Importantes

1. **Base href** : En production, l'application est servie sous `/champomix/`
   - Les routes deviennent : `http://domain.com/champomix/Champomi`
   - Configuration dans `angular.json` : `"baseHref": "/champomix/"`

2. **Route Wildcard** : La route `**` doit toujours être la dernière route définie

3. **Paramètres de route** : Utilisez `ActivatedRoute` pour récupérer les paramètres :
   ```typescript
   this.route.params.subscribe(params => {
     const id = params['id'];
   });
   ```

4. **Query Parameters** : Utilisez `queryParams` pour les paramètres de requête :
   ```typescript
   this.route.queryParams.subscribe(params => {
     const status = params['status'];
   });
   ```

---

## 🧪 Tester les Routes

Pour tester toutes les routes, vous pouvez :

1. **Manuellement** : Naviguez directement dans la barre d'adresse
2. **Via le code** : Utilisez `router.navigate(['/route'])`
3. **Via les liens** : Cliquez sur les liens dans l'interface

---

**Dernière mise à jour** : Toutes les routes sont actives et fonctionnelles ✅

