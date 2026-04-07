# Guide de Déploiement de l'Application Gorgorlou

Ce guide vous explique comment mettre votre site en ligne pour que vous et vos clients puissiez y accéder de n'importe où.

## 1. Déploiement du Backend (Serveur)

Comme Netlify ne peut pas héberger votre serveur Node.js/SQLite, vous devez le déployer sur une plateforme comme **Render**, **Railway** ou **Railway**.

### Étapes (exemple pour Render) :
1. Créez un compte sur [render.com](https://render.com).
2. Connectez votre dépôt GitHub.
3. Créez un nouveau **Web Service**.
4. Configurez-le ainsi :
   - **Root Directory** : `server`
   - **Build Command** : `npm install && npx prisma db push --schema=prisma/schema.postgresql.prisma --accept-data-loss && npm run build && npx prisma db seed --schema=prisma/schema.postgresql.prisma`
   - **Start Command** : `npm start`
5. Ajoutez ces **Variables d'Environnement** dans Render :
   - `DATABASE_URL` : (Copiez l'URL de votre base PostgreSQL créée sur Render)
   - `JWT_SECRET` : Une phrase secrète complexe (ex: `votre_secret_tres_long_123`)

---

## 2. Configuration de Vercel (Frontend)

Maintenant que votre serveur a une URL (ex: `https://votre-backend.onrender.com`), vous devez configurer Vercel pour l'appeler.

### Étapes :
1. Allez dans les paramètres de votre projet sur [vercel.com](https://vercel.com).
2. Allez dans **Settings** > **Environment Variables**.
3. Ajoutez les variables suivantes :
   - `VITE_API_URL` : `https://votre-backend.onrender.com/api`
   - `VITE_STORAGE_URL` : `https://votre-backend.onrender.com`
4. Allez dans **Deployments** et cliquez sur **Redeploy** pour appliquer les changements.

---

## 3. Pourquoi l'Admin ne fonctionnait pas ?

Par défaut, Vercel essaie de trouver un fichier `admin.html` quand vous tapez `/admin`. Comme c'est une application React (SPA), ce fichier n'existe pas.

Le fichier **`public/_redirects`** (Netlify) et la configuration **`vercel.json`** (Vercel) disent à la plateforme :
> *"Pour n'importe quelle URL (/*), renvoie toujours vers `index.html` et laisse React gérer la suite."*

Grâce à cela, vos liens vers `/admin` et `/login` fonctionneront désormais parfaitement en ligne.

---

## Vérification Finale

Une fois ces étapes faites, vous pourrez accéder à :
👉 `https://march-gorgorlou.vercel.app/admin`

Et vous connecter avec vos identifiants habituels.
