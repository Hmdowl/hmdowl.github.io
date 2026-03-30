---
# TEMPLATE WRITEUP CTF - Howl Blog
# Copier ce fichier et adapter pour chaque nouveau writeup
# Respecter la structure H1/H3 pour le TOC
---

---
layout: post
title: "Plateforme — Nom de la machine"
date: YYYY-MM-DD
categories: [CTF, Plateforme]
tags: [tag1, tag2, tag3]
difficulty: easy/medium/hard
platform: tryhackme/hackthebox/rootme
excerpt: "Description courte de la machine en 1-2 phrases. Doit donner envie de lire le writeup sans spoiler les flags."
---

# C'est quoi [Outil/Concept principal] ?

Paragraphe d'introduction sur l'outil ou le concept principal utilise dans ce CTF.
Expliquer **ce que c'est**, **a quoi ca sert**, et **pourquoi c'est utile** en CTF.

- [Lien ressource 1](url)
- [Lien ressource 2](url)

---

# Comment ca marche ?

Explication du fonctionnement de l'outil/concept.
Lister les elements cles :

1. **Element 1** (description courte)
2. **Element 2** (description courte)
3. **Element 3** (description courte)

### Syntaxe de base

```bash
commande -option <argument> <cible>
```

| Parametre | Signification |
|-----------|---------------|
| `-x` | description |
| `-y` | description |

### Exemples concrets

**Cas d'utilisation 1 :**
```bash
commande -option valeur cible
```

**Cas d'utilisation 2 :**
```bash
commande -option valeur cible
```

---

# Exploitation

| | |
|---|---|
| **Machine** | Nom de la machine |
| **IP Cible** | X.X.X.X |
| **Difficulte** | Easy/Medium/Hard |
| **Plateforme** | TryHackMe/HackTheBox/Root-Me |

---

### Flag 1 — Description courte

Explication de l'approche : ce qu'on fait, pourquoi, comment.

![Description de l'image]({{ '/assets/images/posts/ctf/plateforme/machine/1.png' | relative_url }})

On observe [ce qu'on voit]. On lance la commande :

```bash
> commande -options arguments
Output complet de la commande...
[RESULTAT] host: X.X.X.X   login: user   password: motdepasse
1 of 1 target successfully completed
```

On trouve le mot de passe **motdepasse**. On se connecte.

![Description du resultat]({{ '/assets/images/posts/ctf/plateforme/machine/2.png' | relative_url }})

---

### Flag 2 — Description courte

Meme structure que Flag 1 :
1. Explication de l'approche
2. Screenshot si pertinent
3. Commande avec output complet
4. Resultat et conclusion

```bash
> commande -options arguments
Output complet...
```

---

<!--
REGLES DE STYLE :
- H1 (#) = 3 grandes sections : "C'est quoi X ?", "Comment ca marche ?", "Exploitation"
- H3 (###) = sous-sections : Syntaxe, Exemples, Flag 1, Flag 2, etc.
- Les flags sont TOUJOURS en H3 sous Exploitation
- Blocs bash : mettre > devant les commandes tapees par l'utilisateur
- Inclure le output COMPLET des commandes (pas de resume)
- Images : assets/images/posts/ctf/plateforme/machine/N.png
- Pas de badges THM/Easy dans le header du post
- Excerpt : 1-2 phrases descriptives (pas le titre H1)
- Tags : outils utilises + techniques (pas "easy", pas le nom de la plateforme)
-->
