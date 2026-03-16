---
layout: post
title: "CTF Auto-Solver"
date: 2026-01-10 12:00:00 +0100
author: Howl
categories: [projet]
tags: [python, automation, ctf, scripting]
tech: "Python"
github: ""
excerpt: "Script Python pour automatiser les tâches CTF répétitives : hash cracking, encoding/decoding, pattern detection et génération de payloads courants."
---

## Description

Script Python modulaire pour automatiser les tâches répétitives rencontrées lors de CTF.

## Fonctionnalités

- Détection et décodage automatique (Base64, Hex, ROT13, URL...)
- Hash cracking via wordlist (MD5, SHA1, SHA256)
- Génération de payloads courants (SQLi, XSS, LFI)
- Pattern detection sur des fichiers binaires

## Stack technique

| Composant | Détail |
|-----------|--------|
| Langage | Python 3.11 |
| Libs | hashlib, requests, pwntools |
| Interface | CLI argparse |

## Statut

En cours de développement.
