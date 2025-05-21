document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup-overlay");
  const form = document.getElementById("angabenForm");

  if (!popup || !form) return;

  // Pop-up nach 4 Sekunden anzeigen
  setTimeout(() => {
    popup.classList.remove("hidden");
  }, 4000);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const alter = parseFloat(document.getElementById("alter").value);
    const gewicht = parseFloat(document.getElementById("gewicht").value);

    if (isNaN(alter) || isNaN(gewicht) || gewicht <= 0 || alter < 0) {
      alert("Bitte gib gültige Werte ein.");
      return;
    }

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

    const zielLiter = (gewicht * faktor / 1000).toFixed(2);

    if (!gespeicherteDaten) gespeicherteDaten = {};
    if (!gespeicherteDaten.heute) gespeicherteDaten.heute = {};
    gespeicherteDaten.heute.ziel = zielLiter;

    const zielBox = document.getElementById("zielBox");
    if (zielBox) {
      zielBox.textContent = `täglicher Trinkbedarf: ${zielLiter} L`;
    }

    const menge = parseFloat(gespeicherteDaten.heute.menge ?? 0);
    const rest = Math.max(0, zielLiter - menge).toFixed(2);
    const summary = document.getElementById("trinkSummary");
    if (summary) {
      summary.textContent = `Du hast heute ${menge} L getrunken. Noch ${rest} L bis zum Ziel!`;
    }

    if (wochenChart && wochenChart.data.datasets[1]) {
      const zielWert = parseFloat(zielLiter);
      wochenChart.data.datasets[1].data = new Array(wochenChart.data.labels.length).fill(zielWert);

      // Dynamisch y-Achse aktualisieren
      wochenChart.options.scales.y.max = Math.max(3, Math.ceil(zielWert * 2) / 2);
      wochenChart.update();
    }

    popup.remove();
  });
});
