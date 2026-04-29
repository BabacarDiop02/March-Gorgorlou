# Guide de Déploiement : Gorgorlou (Vercel + Supabase)

Ce guide explique comment déployer l'application complète (Frontend + API) sur Vercel en utilisant Supabase pour la base de données et le stockage d'images.

## 1. Configuration de Supabase

1.  **Projet** : Créez un projet sur [supabase.com](https://supabase.com).
2.  **Base de données** : Allez dans **Project Settings** > **Database** et copiez la **Connection String** (URI).
3.  **Stockage** : Allez dans **Storage**, créez un bucket public nommé `images`.

## 2. Déploiement sur Vercel

1.  Connectez votre dépôt GitHub à Vercel.
2.  Dans les **Settings** de votre projet Vercel, ajoutez les **Environment Variables** suivantes :
    - `DATABASE_URL` : Votre URL PostgreSQL de Supabase.
    - `SUPABASE_URL` : L'URL de votre projet Supabase.
    - `SUPABASE_ANON_KEY` : Votre clé API anonyme Supabase.
    - `JWT_SECRET` : Une phrase secrète complexe pour la sécurité.

## 3. Initialisation locale (Première fois)

Pour préparer la base de données, exécutez ces commandes depuis votre ordinateur :

```bash
# Initialiser la structure de la base de données
npx prisma db push --schema=prisma/schema.postgresql.prisma

# Importer les données initiales (catégories, produits)
npx prisma db seed --schema=prisma/schema.postgresql.prisma
```

## 4. Pourquoi n'y a-t-il plus de dossier 'server' ?

L'API est désormais hébergée directement par Vercel via le dossier `api/`. Cela permet :
- Une maintenance simplifiée (un seul déploiement pour tout).
- Une meilleure rapidité (le frontend et l'API sont sur le même réseau).
- L'utilisation de Supabase Storage pour que vos images soient sauvegardées de façon permanente.

---

## Liens utiles
- Site : `https://march-gorgorlou.vercel.app`
- Admin : `https://march-gorgorlou.vercel.app/admin`
