# Aura Mobile App - Quick Start Guide

## 🚀 Starten der App (iOS Simulator)

### Voraussetzungen:
- ✅ Backend läuft auf http://localhost:5094
- ✅ PostgreSQL läuft auf Port 5433
- ✅ Xcode installiert (für iOS Simulator)
- ✅ Node.js installiert

### Schritt 1: Backend starten

```bash
# Terminal 1
cd /Users/kon_sp/Desktop/SE_learning/Projekts/aura-project/backend/src
dotnet run --project AuraContract.Api
```

**Erwarte:**
```
Now listening on: http://localhost:5094
```

### Schritt 2: Frontend starten

```bash
# Terminal 2
cd /Users/kon_sp/Desktop/SE_learning/Projekts/aura-project/frontend/src/aura-mobile
npm start
```

### Schritt 3: iOS Simulator öffnen

Wenn Expo gestartet ist, drücke im Terminal:
- **`i`** - Öffnet iOS Simulator

### Schritt 4: Testen

1. **Registrierung:**
   - Klicke auf "Registrieren"
   - E-Mail: `test@example.com`
   - Vorname: `Max`
   - Nachname: `Mustermann`
   - Passwort: `Test1234!`
   - Passwort bestätigen: `Test1234!`
   - Klicke "Registrieren"

2. **Login:**
   - E-Mail: `test@example.com`
   - Passwort: `Test1234!`
   - Klicke "Anmelden"

3. **Vertrag erstellen:**
   - Klicke auf "+ Neu" oder "Vertrag hinzufügen"
   - Anbieter: `Netflix`
   - Kategorie: `Streaming`
   - Kosten: `12.99`
   - Abrechnungszeitraum: `Monatlich`
   - Klicke "Erstellen"

---

## 🔧 API Konfiguration

### Aktuell (iOS Simulator):
```typescript
// src/services/api/apiClient.ts
return 'http://localhost:5094/api';
```

### Für Android Emulator:
```typescript
return 'http://10.0.2.2:5094/api';
```

### Für echtes Gerät:
```typescript
// Finde deine IP-Adresse:
// macOS: System Settings → Network → WiFi → Details → IP Address
// Beispiel: 192.168.1.10
return 'http://192.168.1.10:5094/api';
```

**Wichtig:** Stelle sicher, dass dein Gerät im selben WiFi-Netzwerk ist wie dein Computer!

---

## 📱 Unterstützte Plattformen

### ✅ Getestet:
- iOS Simulator (empfohlen für Entwicklung)

### ⚙️ Konfiguration erforderlich:
- Android Emulator (API URL zu `10.0.2.2` ändern)
- Echtes iOS Gerät (API URL zu deiner IP-Adresse ändern)
- Echtes Android Gerät (API URL zu deiner IP-Adresse ändern)

---

## 🐛 Troubleshooting

### Problem: "Network request failed"
**Lösung:**
1. Prüfe ob Backend läuft: `curl http://localhost:5094/api/auth/login`
2. Prüfe ob PostgreSQL läuft: `docker ps`
3. Prüfe API URL in `src/services/api/apiClient.ts`

### Problem: "Cannot connect to localhost"
**Lösung (iOS Simulator):**
- Verwende `http://localhost:5094/api` ✅

**Lösung (Android Emulator):**
- Verwende `http://10.0.2.2:5094/api` ✅

**Lösung (Echtes Gerät):**
- Verwende `http://[DEINE-IP]:5094/api` (z.B. `http://192.168.1.10:5094/api`)

### Problem: Backend nicht erreichbar
**Lösung:**
```bash
# Backend neu starten
cd backend/src
lsof -ti:5094 | xargs kill -9  # Kill alter Prozess
dotnet run --project AuraContract.Api
```

### Problem: "Anmeldung fehlgeschlagen"
**Prüfe:**
1. Backend läuft und erreichbar
2. User wurde erfolgreich registriert
3. Korrekte E-Mail/Passwort verwendet

---

## 📊 Test-Daten

### Templates in Datenbank (25 Stück):
- Netflix, Disney+, Amazon Prime, Spotify, YouTube Premium
- Microsoft 365, Adobe Creative Cloud
- Dropbox, Google One
- Telekom, Vodafone, o2
- Allianz, ERGO, HUK-COBURG
- Fitnessstudio, Urban Sports Club
- Strom, Gas
- Der Spiegel, FAZ
- PlayStation Plus, Xbox Game Pass
- Udemy Pro, LinkedIn Learning

Diese kannst du in der Datenbank sehen mit DBeaver (localhost:5433).

---

## 🎯 Nächste Schritte

Nach erfolgreichem Test:
1. Git Commit erstellen
2. Week 2 Features implementieren:
   - Template Auswahl
   - Voice Input (Whisper)
   - Dashboard Charts
   - Reminder System

---

**Viel Erfolg! 🚀**
