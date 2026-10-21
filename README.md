# Where is my Pint?

Karte der Pubs in Franken, die Guinness vom Fass zapfen — mit Preis, Telefon,
Website, Speisekarte, Route und Pub-Score.

**Prototyp.** Die Daten (19 Pubs) sind von Hand recherchiert und teils ungeprüft;
Preise sind noch lückenhaft. Neue Pubs kommen über OpenStreetMap-Suche in der App
oder über Meldungen dazu.

## Wie es funktioniert
- Karte: OpenStreetMap (Leaflet)
- Keine Server, keine Konten: Beiträge, Pints und Preise liegen lokal im Browser
- `laeden.json` — Pub-Datenbank · `angebote.json` — Guinness-Dosen-Angebote
- Installierbar als PWA (Safari → Zum Home-Bildschirm)

## Dateien
- `index.html` — die App
- `map-test.html` — dieselbe App mit MapLibre/OpenFreeMap (Testfassung)
- `manifest.json`, `sw.js` — PWA
