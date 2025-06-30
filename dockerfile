# Étape 1 : Build Angular avec Node
FROM node:18 as builder

# Dossier de travail dans l'image
WORKDIR /app

# Copie des fichiers Angular dans le conteneur
COPY . .

# Installation des dépendances
RUN npm install

# Compilation Angular avec baseHref personnalisé pour servir sur /
RUN npm run build -- --base-href /

# 🔍 Debug (facultatif) — permet de voir les fichiers générés
RUN ls -l /app/dist/angular_project2

# Étape 2 : Image NGINX légère pour servir les fichiers statiques
FROM nginx:alpine

# Copie des fichiers Angular buildés dans le répertoire NGINX
COPY --from=builder /app/dist/angular_project2 /usr/share/nginx/html

# Copie de la configuration NGINX personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposition du port 80
EXPOSE 80

# Commande de démarrage du serveur NGINX
CMD ["nginx", "-g", "daemon off;"]
