---
layout: post
title: "Network Scanner"
date: 2026-02-10 12:00:00 +0100
author: Howl
categories: [projet]
tags: [python, networking, scanner, recon, tools]
tech: "Python"
github: ""
excerpt: "Scanner réseau léger avec détection de services, fingerprinting OS et export de rapports en HTML/JSON. Conçu pour être rapide et lisible sans dépendance lourde."
---

## Description

Scanner réseau Python léger, sans dépendance à Nmap, permettant de cartographier rapidement un réseau cible et d'exporter les résultats dans différents formats.

## Fonctionnalités

- Scan TCP/UDP sur plages d'IP et de ports
- Détection de bannières et fingerprinting de services
- Export rapport HTML et JSON
- Mode silencieux pour éviter la détection (throttle configurable)

## Stack technique

| Composant | Détail |
|-----------|--------|
| Langage | Python 3.11 |
| Libs | socket, threading, jinja2 |
| Output | HTML / JSON |

## Statut

Version 1.0 stable — roadmap : intégration CVE lookup.
