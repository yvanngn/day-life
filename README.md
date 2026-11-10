# A Day in the Life

Jeu point and click en pixel art. Chapitre 1 : une matinée ordinaire... ou pas.

**Jouer** : https://yvanngn.github.io/day-life/

## Développement
```
python3 build.py          # assemble src/ en dist/index.html (page autonome)
sh tester.sh              # build + tous les tests (pip install playwright && playwright install chromium)
sh tester.sh salon        # une seule pièce : menu chambre couloir bain salon complet
```
Chaque push sur `main` relance les tests ; le jeu n'est publié sur GitHub Pages que s'ils passent.

Mots de passe : REVEIL (chambre), KIMONO (couloir), PACHA (salle de bain), CAFE (salon).
