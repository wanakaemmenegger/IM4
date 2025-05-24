# IM4
Leistungsnachweis IM4

# TrinkFit – Ein smartes Trink-Tracking-System mit LED-Erinnerung

**TrinkFit** ist ein smartes Trinkpad, das den Wasserkonsum automatisch erfasst, online darstellt und über ein LED-System an das regelmässige Trinken erinnert. Das Projekt entstand im Rahmen des Moduls **Interaktive Medien IV** an der Fachhochschule Graubünden.

Ziel ist es, eine funktionale und visuell unterstützende Lösung zu entwickeln, die Nutzer:innen über 50 motiviert, über den Tag hinweg ausreichend zu trinken – ohne manuelles Eintragen auf dem Smartphone.

Wie das TrinkfitPad funktioniert sieht man in diesem Video:

Link zu unserer Website: https://trinkfit.wanaka.ch/

---

## 💡 Projektidee

Die Idee basiert auf der Beobachtung, dass viele Menschen zu wenig trinken – besonders während Beschäftigungen durch den Tag. In Interviews mit zwei Zielpersonen wurde deutlich, dass visuelle Signale wie Licht und ein möglichst automatischer Ablauf zum trinken animieren.

TrinkFit erkennt Trinkvorgänge automatisch und bietet Feedback über Lichtsignale (LED-Ring) und ein OLED-Display. Zusätzlich werden die Daten an eine Datenbank übertragen und auf der Website grafisch dargestellt. Zusätzlich bitete die Website hilfreiche Tipps und Vorteile um mehr Wasser zu trinken.

Unsere Idee haben wir zu Beginn des Projekts in einem Flussdiagramm aufgezeichnet:
![Flussdiagramm_Trinkfit](images/Flussdiagramm_TrinkFit.png)

Link zum Flussdiagram: https://www.figma.com/design/Npsf3iH8oIAoPRJ0vXs33R/IM-4-%E2%80%93-App-Konzeption-Milena-Stadtelmann-Wanaka-Emmenegger?node-id=1402-201&t=jZKB1xrbvuY2Au7f-1

---

## ⚙️ So wird das TrinkFit-Pad bedient

1. Schliesse das TrinkFit Pad am Strom an und starte es.
2. Warte 10 Sekunden und folge den Anweisungen auf dem Display. 
3. Stelle dein volles Glas auf das TrinkFit Pad. 
4. Trinke aus dem Glas und stelle es immer wieder zurück auf das TrinkFit Pad.
5. Glas leer getrunken? Fülle es einfach wieder auf oder nimm das Glas vom TrinkFit Pad und stelle es mit dem Knopf wieder auf Tara. Nach 10 Sekunden ist das TrinkFit Pad wieder einsatzfähig.
6. Beobachte deinen Fortschritt hier online und trink dich fit.
7. Vergessen zu trinken? Mit einem Blinken erinnert dich das TrinkFit Pad nach zwei Stunden daran. Sobald du trinkst, hört es wieder auf.

Eine detaillierte Bedienungsanleitung ist unter folgendem Link zu finden:
https://docs.google.com/document/d/1XEH3uDcnz3PhZMaaVluLnOC8TfT7FdvxlLkdgI5IRxk/edit?usp=sharing

---

## Technische Umsetzung

Diese technischen Funktionen hat das TrinkFit Pad:

- Automatische Erkennung von Trinkmengen (via HX711-Wägezelle)
- OLED-Anzeige mit Status- und Bedienhinweisen
- LED-Ring für visuelles Feedback:
  - Startanimation bei Inbetriebnahme
  - Erinnerung nach Inaktivität (animierter Farbwechsel)
  - Erfolgssignal nach Trinkvorgang (grün)
  - Fehlerhinweis bei fehlgeschlagener Messung (rot)
- Datenübertragung an eine Online-Datenbank
- Visualisierung der Daten auf Website

Um das Projekt umzusetzen waren verschiedene Schritte nötig.
1. Hardware aufbauen
2. ESP32 programmieren
3. Server aufsetzen 
4. Datenbank aufsetzen und mit Hardware verbinden
5. Website programmieren, mit Datenbank verbinden, Daten darauf auslesen und auf Server laden

Unter diesem Link ist eine detaillierte Schritt-für-Schritt Bauanleitung abgespeichert, um das Projekt nachzubauen (inklusive Steckschema): 

![Steckschema Trinkfit](images/Steckplan_Trinkfit.png)

Link Bauanleitung

## Komponentenübersicht:

Für die Umsetzung unseres Projekt sind folgende Komponenten nötig:

| Komponente             | Funktion                                                       |
|------------------------|----------------------------------------------------------------|
| ESP32 Dev Board        | Mikrocontroller, führt Hauptprogramm aus, kommuniziert via WLAN |
| HX711 + Wägezelle      | Gewichtssensor zur Erkennung der Trinkmenge                    |
| SSD1306 OLED Display   | Zeigt Hinweise und Statusmeldungen an                         |
| WS2812B LED-Ring       | Gibt visuelles Feedback (Erinnerung, Erfolg etc.)              |
| Powerbank (5 V)        | Mobile Stromversorgung über USB                                |

#### Protokolle & Verbindungen

| Verbindung / Protokoll | Funktion                                                        |
|------------------------|-----------------------------------------------------------------|
| GPIO                   | Datenübertragung zwischen ESP32 und Sensoren (z. B. HX711, LED) |
| I²C                    | Kommunikation mit dem OLED Display (SDA D20, SCL D21)           |
| WLAN (WiFi)            | Verbindung des ESP32 mit dem Webserver                          |
| HTTP (POST)            | Sendet JSON-Daten vom ESP32 an den Server (`load.php`)          |
| SQL (MySQL)            | Datenübertragung zwischen PHP und Datenbank                     |

#### Programmlogik / Steuerung

| Datei / Modul          | Funktion                                                       |
|------------------------|----------------------------------------------------------------|
| `mc.ino`               | Arduino-Hauptprogramm: Gewichtsmessung, Anzeige, Logik         |
| `load.php`             | Serverlogik: Empfängt Daten und schreibt sie in die Datenbank  |
| `chart_data.php`       | Serverlogik: Stellt gespeicherte Trinkdaten als JSON bereit    |
| `chart.js`             | Visualisiert Daten auf der Website                             |
| `tipps.js`             | Zeigt Trinktipps auf Website, Wechsel all 2 Minuten            |
| `popup.js`             | Eingabe von Alter und Gewicht Users, Berechnung Wasserbedarf   |


#### Web-Frontend & Konfiguration

| Komponente             | Funktion                                                       |
|------------------------|----------------------------------------------------------------|
| `index.html`           | Grundstruktur der Website                                      |
| `styles.css`           | Visuelles Styling der Website                                  |
| `db_config.php`        | Stellt Verbindung zur Datenbank her (für PHP)                  |
| Images                 | Statische Inhalte zur Darstellung                              |


Die Komponenten sind in Hardware, Protokolle und Software gegliedert und bilden gemeinsam das technische System hinter dem TrinkFit Pad. Die Programmlogik auf dem ESP32 kommuniziert über WLAN und HTTP mit dem Webserver, wo die Daten gespeichert und anschliessend visualisiert werden. Die Weboberfläche besteht aus HTML, CSS und JavaScript und ruft die Messdaten über PHP-Schnittstellen aus der Datenbank ab.

Hier Komponentenplan einfügen
---

### Programmierung

#### Waage

Das TrinkFit Pad wurde über die **Arduino IDE** programmiert. 

Der Ablauf ist als **Zustandsautomat** implementiert und umfasst die Phasen:
- Warten auf Glas
- Glas erkannt
- Trinken erkannt
- Erinnerung aktivieren

Der vollständige Code ist hier zu finden:
Genauere Erläuterungen zu den Codes sind im Anhang der Schritt-für-Schritt Bauanleitung aufgeführt:
Die gesendeten Daten werden über eine PHP-API (`load.php`) an eine MySQL-Datenbank übermittelt.  


#### Website

Die Website wurde mit Visual Code programmiert und zeigt in Echtzeit die in der Datenbank erfassten Trinkmengen. ???

Genauere Erläuterungen zu den Codes sind in den jeweiligen Code-Abschnitten im GitHub einszusehen.

---

## ✍️ Umsetzungsprozess & Reflexion

Hier Reflexion ergänzen:

#### Planung
- Bewusst für LED entschieden und nicht für Ton, da ein Ton zu agressiv wäre.

#### Aufgabenverteilung
Für uns war folgende Aufgabenverteilung am effizientisten. Wir haben uns aber natürlich gegenseitg im Bereich der jeweils anderen untersützt.
- Ideenfindung (beide)
- UX Design, Persona, Stylesheet, MockUp Website (beide)
- Hardware-Programmierung (Milena)
- Website-Darstellung (Wanaka)
- Produktdesign (Milena)
- Dokumentation (beide)
#### Entwicklungsprozess
#### verworfene Lösungsansätze
#### Designentscheidungen
#### Inspiration
#### Fehlschläge und Umplanung

- Beim Anschliessen des Sensors und der anderen Komponenten auf dem Breadboard, kam es gleich zweinmal vermutlich zu einem Kurzschluss, was den Microcontroller zerstört hat. Der Grund war, dass Stromzuflüsse falsch gesteckt wurden, wodurch auf dem Board vermutlich zu viel Strom floss. Zum Glück haben wir von Jan schnell einen Ersatz bekommen. 

- Leider ist auch die erste Waage, die wir auf AliExpress bestellt haben kaputt gegangen. Die Kabelverbindungen am HX711 Sensor lösten sich und da wir keine Erfahrung im Löten haben, konnten wir ihn nicht flicken. Wir haben schliesslich eine stabilere Waage neu bestellt, die nun im Einsatz ist.

- Im Prozess der Datenbankerstellung haben wir einmal ausversehen das Dokument db_config.php auf GitHub geladen, da wir den Namen des Dokuments angepasst, aber es nicht in gitignore geändert haben. Anschliessend haben wir das Dokument über den Task Manager von Visual Codes wieder aus GitHub entfernt. Zudem haben wir das Login und Passwort angepasst, um die Sicherheit zu gewährleisten. Das selbe ist und mit dem sftp.json File passiert, da wir ausversehen im .gitignore etwas angepasst hatten. Auch hier haben wir das Dokument direkt aus GitHub entfernt und die Logindaten angepasst. Gemäss Absprache mit Jan Fiess reicht dieses Vorgehen im Rahmen dieses Projektes aus.

#### Challenges
#### Lerneffekte (z.B. Erkenntnisse im Umgang mit Stromversorgung, Kalibrierung)
#### Known Bugs (Optimierungspotenzial)

- Die Waage ist manchmal fehleranfällig. Insbesondere beim ersten Gebrauch (wenn sie sich mit einem neuen WLAN verbindet), bei einer unruhigen Unterlage oder wenn sie mit einem schweren Trinkgefäss verwendet wird. Zudem driftet die Gewichtsmessung der Waage bei langem Gebrauch ab, wodurch falsche Messergebnisse (Trinkgefäss + Wasser) auf dem Display angezeigt werden. Das hat allerdings keinen Einfluss auf die Messung der Trinkmessung. Durch die eingebauten Sicherheitsmechanismen im Code kommt es so gut wie nie zu falschen Trinkmessungen, die in der Datenbank landen. Zudem sind die Trinkmessungen gemäss unserer Einschätzung bis auf ca. 10ml genau (wir haben die Waage über 3 Wochen lang regelmässig getestet). Daher sind wir mit der Genauigkeit der Waage sehr zufrieden. 

#### Mögliche Erweiterungen für TrinkFit

- Eine Möglichkeit einbauen, um auf der Website von Hand Werte einzutragen. (Haben wir bewusst nicht gemacht, da man so zum Schummeln neigt.)
- Personalisiertes Login auf die Website mit detaillierten Statistiken
- Optimierung der Hardware, z.B. kompakteres Gehäuse

#### Hilfsmittel (KI erlaubt und erwünscht)

- Für die Umsetzung des Projekts wurde ChatGPT als Hilfsmittel in fast allen Projektphasen eingesetzt. Besonders hilfreich war ChatGPT bei der Programmierung des Arduino Codes. So konnte der Code Schritt für Schritt überarbeitet und weiterentwickelt werden. Auch bei der Umsetzung der Website mittels PHP, JavaScript, HTML und CSS kam ChatGPT zum Einsatz. Zudem auch getwaves.io zur Generierung der Wellen im Header und Footer Bereich. Die KI hat dabei Schritt für Schritt beim Aufbau, der Umsetzung und Fehlersuche geholfen. ChatGPT wurde auch genutzt, um Teile der Dokumenation zu schreiben oder um sie auf die Rechtschreibung zu überprüfen. Allerdings lieferte ChatGPT bei der Textgenerierung der Dokumentation meist keine zufriedenstellende Ergebnisse. So konnten die Texte zwar als Ausgangslage genutzt, mussten aber von Hand optimiert werden.

---

## Fazit

Hier ein kleines Fazit ergänzen.

- Lernfortschritt

---

## 👥 Projektteam

- **Wanaka Emmenegger**
- **Milena Stadelmann** 

FH Graubünden  
Modul: Interaktive Medien 4 – Frühling 2025

---

