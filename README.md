# IM4
Leistungsnachweis IM4

# TrinkFit – Ein smartes Trink-Tracking-System mit LED-Erinnerung

**TrinkFit** ist ein smartes Trinkpad, das den Wasserkonsum automatisch erfasst und über ein LED-System an das regelmässige Trinken erinnert. Das Projekt entstand im Rahmen des Moduls **Interaktive Medien IV** an der Fachhochschule Graubünden.

Ziel ist es, eine funktionale und visuell unterstützende Lösung zu entwickeln, die Nutzer:innen über 50 motiviert, über den Tag hinweg ausreichend zu trinken – ohne aktive App oder ständiges Tippen auf dem Smartphone.

Wie das TrinkfitPad funktioniert sieht man in diesem Video:

---

## 💡 Projektidee

Die Idee basiert auf der Beobachtung, dass viele Menschen zu wenig trinken – besonders während Beschäftigungen durch den Tag. In Interviews mit zwei Zielpersonen wurde deutlich, dass visuelle Signale wie Licht und ein möglichst automatischer Ablauf zum trinken animieren würden.

TrinkFit erkennt Trinkvorgänge automatisch und bietet Feedback über Lichtsignale (LED-Ring) und ein OLED-Display. Zusätzlich werden die Daten an eine Online-Datenbank übertragen und anschliessend auf seiner Website grafisch aufbereitet.

---

## ⚙️ So wird das TrinkFit-Pad bedient:

1. Schliesse das TrinkFit Pad am Strom an und starte es.
2. Warte 10 Sekunden und folge den Anweisungen auf dem Display. 
3. Stelle dein volles Glas auf das TrinkFit Pad. 
4. Trinke aus dem Glas und stelle es immer wieder zurück auf das TrinkFit Pad.
5. Glas leer getrunken? Fülle es einfach wieder auf oder nimm das Glas vom TrinkFit Pad und stelle es mit dem Knopf wieder auf Tara. Nach 10 Sekunden ist das TrinkFit Pad wieder einsatzfähig.
6. Beobachte deinen Fortschritt hier online und trink dich fit.
7. Vergessen zu trinken? Mit einem Blinken erinnert dich das TrinkFit Pad nach zwei Stunden daran. Sobald du trinkst, hört es wieder auf.

Eine detaillierte Bedienungsanleitung mit zusätzlichen Anmerkungen und Ergänzungen ist unter folgendem Link zu finden:
https://docs.google.com/document/d/1XEH3uDcnz3PhZMaaVluLnOC8TfT7FdvxlLkdgI5IRxk/edit?usp=sharing

---

## 🔧 Technik & Hardware

Diese technischen Funktionen hat unser TrinkFit Pad:
- Automatische Erkennung von Trinkmengen (via HX711-Wägezelle)
- OLED-Anzeige mit Status- und Bedienhinweisen
- LED-Ring für visuelles Feedback:
  - Startanimation bei Inbetriebnahme
  - Erinnerung nach Inaktivität (animierter Farbwechsel)
  - Erfolgssignal nach Trinkvorgang (grün)
  - Fehlerhinweis bei fehlgeschlagener Messung (rot)
- Datenübertragung an eine Online-Datenbank
- Visualisierung der Daten auf einer externen Website

Komponenten und ihre Funktion:

## Komponentenübersicht

### Hardware

| Komponente             | Funktion                                                       |
|------------------------|----------------------------------------------------------------|
| ESP32 Dev Board        | Mikrocontroller, führt Hauptprogramm aus, kommuniziert via WLAN |
| HX711 + Wägezelle      | Gewichtssensor zur Erkennung der Trinkmenge                    |
| SSD1306 OLED Display   | Zeigt Hinweise und Statusmeldungen an                         |
| WS2812B LED-Ring       | Gibt visuelles Feedback (Erinnerung, Erfolg etc.)              |
| Powerbank (5 V)        | Mobile Stromversorgung über USB                                |

### Protokolle & Verbindungen

| Verbindung / Protokoll | Funktion                                                        |
|------------------------|-----------------------------------------------------------------|
| GPIO                   | Datenübertragung zwischen ESP32 und Sensoren (z. B. HX711, LED) |
| I²C                    | Kommunikation mit dem OLED Display (SDA D20, SCL D21)           |
| WLAN (WiFi)            | Verbindung des ESP32 mit dem Webserver                          |
| HTTP (POST)            | Sendet JSON-Daten vom ESP32 an den Server (`load.php`)          |
| SQL (MySQL)            | Datenübertragung zwischen PHP und Datenbank                     |

### Programmlogik / Steuerung

| Datei / Modul          | Funktion                                                       |
|------------------------|----------------------------------------------------------------|
| `mc.ino`               | Arduino-Hauptprogramm: Gewichtsmessung, Anzeige, Logik         |
| `load.php`             | Serverlogik: Empfängt Daten und schreibt sie in die Datenbank  |
| `chart_data.php`       | Serverlogik: Stellt gespeicherte Trinkdaten als JSON bereit    |
| `chart.js`             | Visualisiert Daten auf der Website                             |
| `tipps.js`             | Zeigt zufällige Trinktipps im Frontend                         |

### Web-Frontend & Konfiguration

| Komponente             | Funktion                                                       |
|------------------------|----------------------------------------------------------------|
| `index.html`           | Grundstruktur der Website                                      |
| `styles.css`           | Visuelles Styling der Website                                  |
| `db_config.php`        | Stellt Verbindung zur Datenbank her (für PHP)                  |
| Icons, Media, Favicon  | Statische Inhalte zur Darstellung                              |


Die Komponenten sind in Hardware, Protokolle und Software gegliedert und bilden gemeinsam das technische System hinter dem TrinkFit-Pad. Die Programmlogik auf dem ESP32 kommuniziert über WLAN und HTTP mit dem Webserver, wo die Daten gespeichert und anschliessend visualisiert werden. Die Weboberfläche besteht aus HTML, CSS und JavaScript und ruft die Messdaten über PHP-Schnittstellen aus der Datenbank ab.

Direkt zum Komponentenplan:


### Schaltplan und Aufbau:

- HX711 → D18 (SCK) und D19 (DT)
- OLED → D20 (SDA) und D21 (SCL)
- LED-Ring → D5 (Data In)
- Stromversorgung aller Komponenten über 3.3 V (vom ESP32)

Unter diesem Link ist eine detaillierte Schritt-für-Schritt Bauanleitung abgespeichert, um das Projekt nachzubauen (inklusive Komponentenplan, Steckschema und Flussdiagramm):



Direkt zum Steckschema:
Direkt zum Flussdiagramm:

---

## 🛠 Software & Bibliotheken

Die Steuerung erfolgt über die **Arduino IDE**. Verwendete Bibliotheken:

- `Adafruit_GFX`, `Adafruit_SSD1306` – für OLED-Anzeige
- `HX711` – zur Ansteuerung des Gewichtssensors
- `Adafruit_NeoPixel` – für LED-Steuerung
- `WiFi`, `HTTPClient`, `Arduino_JSON` – für WLAN & Datenübertragung

Der Ablauf ist als **Zustandsautomat** implementiert und umfasst die Phasen:
- Warten auf Glas
- Glas erkannt
- Trinken erkannt
- Erinnerung aktivieren

Die Logik vom Code funktioniert wie folgt:

1. Gerät via USB (z. B. Powerbank) mit Strom versorgen.
2. Anzeige auf dem Display «Trinkfit startet...» und LED-Startanimation läuft
3. Im Display erscheint: „Bitte gefülltes Glas hinstellen“.
4. Glas hinstellen, ggf. Tara drücken.
5. Bei Entnahme und Rückstellen wird Trinkmenge automatisch erkannt.
6. Bei Inaktivität (2 Stunden) startet eine LED-Erinnerung.
7. Getrunkene Menge wird per HTTP an Webserver übermittelt.

Der vollständige Code ist hier zu finden:

---

## 🌐 Datenbank & Visualisierung

Die gesendeten Daten werden über eine PHP-API (`load.php`) an eine MySQL-Datenbank übermittelt.  
Eine separate Website visualisiert die Trinkhistorie grafisch. Mockups und Screenshots sind im Dokumentationsordner enthalten.

→ [Mockup ansehen](#) *(→ Link zur Figma-Datei oder Screenshot)*  
→ [Visualisierung (Demo-Link)](#) *(optional)*

Link zu unserer Website: https://trinkfit.wanaka.ch/

---

## ✍️ Umsetzungsprozess & Reflexion

Hier Reflexion ergänzen:
- verworfene Ideen 
- Probleme (z.B. db_config.php hochgeladen)
- Erkenntnisse im Umgang mit Stromversorgung, Kalibrierung
- Einsatz von KI-Tools zur Codeunterstützung
- bekannte Bugs und Optimierungspotenzial

---

## Fazit

Hier ein kleines Fazit ergänzen.

- Lernfortschritt

---

## 👥 Projektteam

- **Wanaka Emmenegger**
- **Milena Stadelmann** 

FH Graubünden  
Modul: Interaktive Medien IV – Frühling 2025

---

