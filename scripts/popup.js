// ==========================================================================
// TrinkFit – Popup zur Eingabe persönlicher Angaben
// Berechnet individuellen Wasserbedarf basierend auf Alter & Gewicht
// Aktualisiert Wasserbedarf und ggf den maximal Wert des Wochen-Diagramms
// ==========================================================================


// === Pop-up-Funktionalität zur Eingabe von Alter und Gewicht ===
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup-overlay");
  const form = document.getElementById("angabenForm");

  // Falls Popup oder Formular nicht vorhanden sind, beende den Vorgang
  if (!popup || !form) return;

  // Pop-up nach 4 Sekunden einblenden
  setTimeout(() => {
    popup.classList.remove("hidden");
  }, 4000);

  // Bei Formular-Absenden persönliche Angaben auswerten
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Werte einlesen
    const alter = parseFloat(document.getElementById("alter").value);
    const gewicht = parseFloat(document.getElementById("gewicht").value);

    // Gültigkeitsprüfung
    if (isNaN(alter) || isNaN(gewicht) || gewicht <= 0 || alter < 0) {
      alert("Bitte gib gültige Werte ein.");
      return;
    }

    // Berechnung des Wasserbedarfsfaktors basierend auf dem Alter
    let faktor = 35;
    if (alter < 0.33) faktor = 130;
    else if (alter < 1) faktor = 110;
    else if (alter < 4) faktor = 95;
    else if (alter < 7) faktor = 75;
    else if (alter < 10) faktor = 60;
    else if (alter < 13) faktor = 50;
    else if (alter < 19) faktor = 40;
    else if (alter < 51) faktor = 35;
    else faktor = 30;

    // Zielwert in Litern berechnen
    const zielLiter = (gewicht * faktor / 1000).toFixed(2);

    // Zielwert in gespeicherten Daten aktualisieren
    if (!gespeicherteDaten) gespeicherteDaten = {};
    if (!gespeicherteDaten.heute) gespeicherteDaten.heute = {};
    gespeicherteDaten.heute.ziel = zielLiter;

    // Zielwert-Box aktualisieren
    const zielBox = document.getElementById("zielBox");
    if (zielBox) {
      zielBox.textContent = `täglicher Trinkbedarf: ${zielLiter} L`;
    }

    // Neue Zusammenfassung anzeigen
    const menge = parseFloat(gespeicherteDaten.heute.menge ?? 0);
    const rest = Math.max(0, zielLiter - menge).toFixed(2);
    const summary = document.getElementById("trinkSummary");
    if (summary) {
      summary.textContent = `Du hast heute ${menge} L getrunken. Noch ${rest} L bis zum Ziel!`;
    }

    // Wochenchart dynamisch aktualisieren
    if (wochenChart && wochenChart.data.datasets[1]) {
      const zielWert = parseFloat(zielLiter);
      wochenChart.data.datasets[1].data = new Array(wochenChart.data.labels.length).fill(zielWert);

      // Y-Achse dynamisch anpassen
      wochenChart.options.scales.y.max = Math.max(3, Math.ceil(zielWert * 2) / 2);
      wochenChart.update();
    }

    // Pop-up entfernen
    popup.remove();
  });
});
