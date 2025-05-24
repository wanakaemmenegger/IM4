// ==========================================================================
// TrinkFit – Tipp-Rotation
// Zeigt wechselnde Trinktipps im 2-Minuten-Takt im Infobereich
// ==========================================================================


// === Tipps zyklisch anzeigen (alle 2 Minuten) ===
document.addEventListener('DOMContentLoaded', () => {
  // Liste aller Tipps mit Überschrift und Text
  const tips = [
    {
      headline: 'Keine Lust auf Wasser?',
      text: 'Verdünnte Fruchtsäfte oder ungesüsster Tee bringen Abwechslung!'
    },
    {
      headline: 'Wie berechnen wir deinen Trink-Bedarf?',
      text: 'Je nach Alter benötigst du pro Tag 30 bis 40ml Wasser pro Kilogramm Körpergewicht.'
    },
    {
      headline: 'Entziehen Getränke auch Flüssigkeit?',
      text: 'Alkohol, Cola, Kaffee und Brennnessel- oder Birkenblättertee entziehen dem Körper Flüssigkeit.'
    },
    {
      headline: 'Flüssigkeit via Ernährung?',
      text: 'Der Körper nimmt täglich etwa 1 Liter der benötigten Flüssigkeit über Nahrung auf.'
    }
  ];

  // DOM-Elemente für die Anzeige der Tipps
  const tipHeadline = document.getElementById('tip-headline');
  const tipText = document.getElementById('tip-text');
  let currentTip = 0;

  // Funktion zum Anzeigen eines bestimmten Tipps
  function showTip(index) {
    tipHeadline.innerHTML = `<strong>${tips[index].headline}</strong>`;
    tipText.textContent = tips[index].text;
  }

  // Zeige den ersten Tipp direkt beim Laden
  showTip(currentTip);

  // Wechsle alle 2 Minuten zum nächsten Tipp
  setInterval(() => {
    currentTip = (currentTip + 1) % tips.length;
    showTip(currentTip);
  }, 120000); // 120000 ms = 2 Minuten
});
