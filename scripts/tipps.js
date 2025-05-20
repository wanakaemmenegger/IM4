document.addEventListener('DOMContentLoaded', () => {
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

  const tipHeadline = document.getElementById('tip-headline');
  const tipText = document.getElementById('tip-text');
  let currentTip = 0;

  function showTip(index) {
    tipHeadline.innerHTML = `<strong>${tips[index].headline}</strong>`;
    tipText.textContent = tips[index].text;
  }

  showTip(currentTip);

  setInterval(() => {
    currentTip = (currentTip + 1) % tips.length;
    showTip(currentTip);
  }, 120000); // 120000 ms = 2 Minuten
});
