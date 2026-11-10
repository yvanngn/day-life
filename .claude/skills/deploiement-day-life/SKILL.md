---
name: deploiement-day-life
description: Déploiement du jeu « A Day in the Life » (GitHub Actions → GitHub Pages). À utiliser quand l'utilisateur parle de déployer, publier, mettre en ligne, GitHub, Actions ou Pages.
---

# Déploiement « A Day in the Life »

```
yvanngn/day-life (dépôt PUBLIC : sources + tests)
   └─ push sur main → .github/workflows/deploy.yml
        1. tests : sh tester.sh (Playwright, tous les groupes) puis dist/ en artefact Pages
        2. deploy : actions/deploy-pages (seulement si les tests passent)
   └─ https://yvanngn.github.io/day-life/
```

- Réglage unique : Settings > Pages > Source « **GitHub Actions** ».
- Pas de secret ni de base de données. Le jeu n'est pas chiffré : ne rien y mettre de privé. Pour un mot de passe familial, reprendre `tools/chiffrer.py` du projet noel-vietnam (dépôt privé + dépôt site public).
- Sauvegarde locale au navigateur (`localStorage` `magali_dotl_save_v2`, son : `magali_mute`).
- Déployer : `sh tester.sh` en local, commit, `git push origin main` (ou Actions > Run workflow). Suivi : `gh run list -R yvanngn/day-life -L 1` ; échec : `gh run view <id> --log-failed`.
- L'environnement de Claude ne joint pas `github.io` : demander à l'utilisateur de vérifier la page.
