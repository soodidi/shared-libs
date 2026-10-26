# Changesets

Chaque PR qui modifie un package publié ajoute un changeset :

```bash
npx changeset
```

Choisir les packages concernés et le type de version (patch, minor, major), puis décrire le changement en une phrase. À la fusion sur `main`, la CI ouvre une PR « Version Packages » ; la fusionner publie les nouvelles versions sur GitHub Packages.
