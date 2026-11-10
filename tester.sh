#!/bin/sh
# Assemble le jeu puis rejoue les scénarios demandés : sh tester.sh chambre   (sans argument : tout)
# Groupes : menu chambre couloir bain salon complet
cd "$(dirname "$0")" && python3 build.py && python3 tests/scenarios.py "$@"
