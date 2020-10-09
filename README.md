# ACO

Le but est de réaliser un programme qui trouve le chemin le plus court entre une position et une autre, en simulant le fonctionnement ‘naturel’ d’une fourmilière.
Ce type d’algorithme est très intéressant pour une raison principale : le changement.
En effet, si la source de nourriture venait à bouger ou si des murs étaient déplacés (imaginons une branche
d’arbre tombant au sol), ce même algorithme, sans modification, mettrait à jour rapidement le bon chemin.

Sur une Map contenant un point de départ (la fourmilière) et une source de nourriture, des fourmis se
déplacent.
Les fourmis n’ont pas réellement de cerveau : de fait de leur capacité de calcul et de mémorisation est quasi
nulle.
Pourtant ces dernières sont capables de prouesses techniques en raison de leur grand nombre et de l’utilisation
des phéromones qui sont des messages chimiques qu’elles déposent au sol.
“Un exemple classique de comportement collectif auto-organisé est l’exploitation des pistes de phéromones. Une
fourmi seule n’a pas l’intelligence nécessaire pour choisir le plus court chemin dans un environnement complexe.
De fait, c’est la colonie dans son ensemble (ou du moins les individus impliqués dans la recherche de la nourriture)
qui va choisir ce chemin.”
