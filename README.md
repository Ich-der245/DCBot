# DCBot - Discord Bot mit Cloudflare Workers

Ein einfacher Discord Bot der auf Cloudflare Workers laeuft. Günstig, schnell und einfach zu deployen.

## 🚀 Schnellstart

### 1. Discord Bot erstellen

1. Gehe zu [Discord Developer Portal](https://discord.com/developers/applications)
2. Klicke auf **"New Application"** und gib deinen Bot einen Namen
3. Gehe zu **"Bot"** → **"Add Bot"**
4. Unter **"Bot"** findest du den **Bot Token** - speichere diesen sicher!
5. Gehe zu **"OAuth2"** → **"URL Generator"**
   - Wähle **`bot`** und **`applications.commands`** unter Scopes
   - Wähle **"Send Messages"** unter Bot Permissions
   - Kopiere die generierte URL und öffne sie im Browser, um den Bot zu deinem Server einzuladen

### 2. Commands registrieren

Du musst die Commands manuell im Discord Developer Portal registrieren:

1. Gehe zu deiner Application im [Discord Developer Portal](https://discord.com/developers/applications)
2. Klicke auf **"Commands"** in der Seitenleiste
3. Klicke auf **"New Command"** und erstelle folgende Commands:

| Command Name | Description | Type |
|--------------|-------------|------|
| `ping` | Antworte mit Pong! | Chat Input |
| `hello` | Sagt Hallo zurueck | Chat Input |
| `help` | Zeigt alle verfuegbaren Commands an | Chat Input |

**Wichtig:** Notiere dir die **Application ID** (unter "General Information") und den **Public Key** (unter "General Information" → "Public Key").

### 3. Cloudflare Worker einrichten

#### Cloudflare Account erstellen (falls noch nicht vorhanden)
1. Gehe zu [Cloudflare Dashboard](https://dash.cloudflare.com/sign-up)
2. Melde dich an oder erstelle einen Account

#### Worker erstellen
1. Klicke auf **"Workers & Pages"** in der Seitenleiste
2. Klicke auf **"Create application"** → **"Worker"**
3. Gib deinem Worker einen Namen (z.B. `dcbot`)
4. Klicke auf **"Create Worker"**

#### Worker konfigurieren
1. Ersetze den gesamten Code im Worker mit dem Inhalt aus `src/index.js`
2. Gehe zu **"Settings"** → **"Variables"** (Environment Variables)
3. Füge folgende Variablen hinzu:

| Variable Name | Wert | Beschreibung |
|---------------|------|--------------|
| `DISCORD_PUBLIC_KEY` | Dein Discord Public Key | Unter "General Information" im Developer Portal |
| `DISCORD_APPLICATION_ID` | Deine Application ID | Unter "General Information" im Developer Portal |
| `DISCORD_BOT_TOKEN` | Dein Bot Token | Unter "Bot" im Developer Portal |

### 4. Interactions Endpoint URL setzen

1. Gehe zurück zu deiner Discord Application im [Developer Portal](https://discord.com/developers/applications)
2. Klicke auf **"Commands"** in der Seitenleiste
3. Unter **"Interactions Endpoint URL"** trage folgende URL ein:
   ```
   https://<dein-worker-name>.<dein-username>.workers.dev
   ```
   (Ersetze `<dein-worker-name>` und `<dein-username>` mit deinen tatsächlichen Werten)
4. Klicke auf **"Save Changes"**

### 5. Worker deployen

1. In Cloudflare: Klicke auf **"Save and Deploy"**
2. Warte einen Moment bis der Worker deployed ist
3. Teste deine Commands in Discord!

## 📁 Projektstruktur

```
dcbot/
├── src/
│   └── index.js          # Haupt-Worker Code
├── wrangler.toml         # Cloudflare Worker Konfiguration
├── package.json          # Node.js Abhängigkeiten
└── README.md             # Diese Datei
```

## 🔧 Lokale Entwicklung

### Voraussetzungen
- [Node.js](https://nodejs.org/) (v18 oder höher)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

### Installation
```bash
# Installiere Abhängigkeiten
npm install

# Logge dich bei Cloudflare ein
wrangler login

# Starte den lokalen Entwicklungsserver
npm run dev
```

### Testen
1. Starte den lokalen Server mit `npm run dev`
2. Nutze [ngrok](https://ngrok.com/) um eine öffentliche URL zu erstellen:
   ```bash
   ngrok http 8787
   ```
3. Trage die ngrok URL als Interactions Endpoint URL im Discord Developer Portal ein
4. Teste deine Commands!

## 🤖 Verfügbare Commands

| Command | Beschreibung | Beispiel |
|---------|--------------|----------|
| `/ping` | Antworte mit Pong! | `/ping` → `Pong! 🏓` |
| `/hello` | Sagt Hallo zurueck | `/hello` → `Hallo, @User! 👋` |
| `/help` | Zeigt alle Commands an | `/help` → Liste aller Commands |

## 🔒 Sicherheit

- **Bot Token geheim halten!** Teile ihn nie mit anderen oder commite ihn nicht in Git
- Nutze Environment Variables für sensible Daten
- Cloudflare Workers sind sicher und verschlüsselt

## 💡 Tipps

- **Commands aktualisieren:** Wenn du neue Commands hinzufügst, musst du sie manuell im Discord Developer Portal registrieren
- **Logs ansehen:** In Cloudflare unter **"Workers"** → **"Logs"** kannst du die Logs deines Bots sehen
- **Bot einladen:** Nutze den OAuth2 URL Generator um den Bot zu weiteren Servern einzuladen

## 📚 Ressourcen

- [Discord Developer Documentation](https://discord.com/developers/docs/intro)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [discord-interactions Library](https://github.com/discord/discord-interactions-js)

## 🤝 Mitwirken

1. Forke das Repository
2. Erstelle einen neuen Branch (`git checkout -b feature/neues-command`)
3. Committe deine Änderungen (`git commit -am 'Füge neues Command hinzu'`)
4. Pushe zum Branch (`git push origin feature/neues-command`)
5. Erstelle einen Pull Request

---

💬 **Fragen?** Öffne ein Issue oder kontaktiere mich!
