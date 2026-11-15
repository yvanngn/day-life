# Carnet — A Day in the Life

Mémoire du projet (skill `carnet-de-projet`). À lire avant chaque séance, à compléter à la fin. On n'efface rien.
Légende : ✅ fait · 🔨 en cours · ⏳ à faire · 💡 idée de Claude (à valider) · ❌ abandonné

Règles techniques : `CLAUDE.md`. Jeu en ligne : https://yvanngn.github.io/day-life/

## 1. L'histoire (résumé)
Point and click pixel art. Chapitre 1 : « une matinée ordinaire… ou pas ». Magali se réveille et doit se préparer pour aller au travail. Ses chats lui compliquent la vie : Shaggy doit prendre un bain, et un matou squatteur dort dans le salon.

## 2. Personnages
| Qui | Ce qu'on sait | Voix |
|---|---|---|
| Magali | Héroïne jouée | `mag` |
| Shaggy | Son chat ; devient blanc (`catWhite`) puis prend un bain | `cat` |
| Le matou squatteur | Dort dans le salon ; il faut le distraire | `matou` |
| Une souris | S'enfuit (`mouseGone`) | — |
| Narrateur, télé, baignoire | Voix d'ambiance | `narr`, `tv`, `tub` |

## 3. Chapitres
| # | Chapitre | Pièces (mot de passe) | État |
|---|---|---|---|
| 1 | Une matinée ordinaire (Magali) | chambre (REVEIL) → couloir (KIMONO) → salle de bain (PACHA) → salon/cuisine (CAFE) | ✅ (V1 et V2 redessinées à la main) |
| 2+ | — | — | ⏳ pas encore décrit |

Tâches du chapitre 1 : faire prendre un bain à Shaggy · prendre un café · s'habiller · trouver son téléphone · nettoyer le couloir · distraire le matou squatteur · aller au travail.

## 4. Inventaires par chapitre
Objets possibles : kimono, laser, Shaggy (le chat se met dans l'inventaire !), robe bleue, serviette, coussin, téléphone, fromage, clémentines.

**Chapitre 1** (d'après les points de départ des mots de passe) :
| Début de la pièce | Inventaire |
|---|---|
| Chambre (REVEIL) | rien |
| Couloir (KIMONO) | laser, robe bleue |
| Salle de bain (PACHA) | laser, robe bleue, Shaggy |
| Salon (CAFE) | laser, Shaggy, serviette (la robe est portée : Magali est habillée) |

Ramassés dans le salon : coussin, téléphone, fromage, clémentines (à confirmer en jouant jusqu'à « Aller au travail »).

## 5. Contradictions et points à vérifier
- Le **kimono** existe comme objet et comme drapeau (`f.kimono`) mais n'apparaît dans aucun point de départ : vérifier s'il se ramasse vraiment et à quoi il sert.
- Le mot de passe du couloir s'appelle **KIMONO** alors qu'on y arrive avec la robe bleue, pas le kimono.
- L'inventaire de fin du chapitre 1 n'est pas encore relevé automatiquement (pas d'outil comme `tools/inventaires.py` de Noël au Vietnam).

## 6. Idées de Claude (💡 à valider)
- (aucune en attente)

## 7. Abandonné
- (rien de noté pour l'instant)
