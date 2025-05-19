fetch('etl/chart_data.php')
  .then(response => response.json())
let gespeicherteDaten = null; // globale Variable

fetch('etl/chart_data.php')
  .then(response => response.json())
  .then(data => {
    console.log('Empfangene Daten:', data);
    gespeicherteDaten = data; // speichern für später

    // === Wochenchart anzeigen ===
    const ctx = document.getElementById('wochenChart')?.getContext('2d');
    if (ctx && data.wochenverlauf) {
      const labels = data.wochenverlauf.map(e => e.wochentag);
      const werte = data.wochenverlauf.map(e => parseFloat(e.summe));
      const farben = data.wochenverlauf.map(e => e.is_today ? '#EDC643' : '#17296d');

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Getrunken (L)',
              data: werte,
              backgroundColor: farben,
              borderRadius: 20,
              borderSkipped: false
            },
            {
              label: 'Dein täglicher Trinkbedarf',
              data: Array(7).fill(parseFloat(data.heute.ziel)),
              type: 'line',
              borderColor: '#edc643',
              borderWidth: 4,
              pointRadius: 0,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 3
            }
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  family: 'Roboto',
                  size: 14
                }
              }
            }
          }
        }
      });
    }
  })
  .catch(err => console.error('Fehler beim Laden der Daten:', err));

// === Umschaltbuttons ===
document.getElementById('btn-week')?.addEventListener('click', () => {
  document.getElementById('wochenChart').style.display = 'block';
  document.getElementById('tagesChart').style.display = 'none';
  document.getElementById('btn-week').classList.add('active');
  document.getElementById('btn-day').classList.remove('active');

  // Fortschrittsanzeige ausblenden
  document.querySelector('.trinkfortschritt-box')?.classList.add('hidden');
});

document.getElementById('btn-day')?.addEventListener('click', () => {
  document.getElementById('wochenChart').style.display = 'none';
  document.getElementById('tagesChart').style.display = 'block';
  document.getElementById('btn-week').classList.remove('active');
  document.getElementById('btn-day').classList.add('active');

  // Fortschrittsanzeige einblenden
  const fill = document.getElementById('trinkFill');
  const info = document.getElementById('trinkInfo');
  const box = document.querySelector('.trinkfortschritt-box');

  if (fill && info && gespeicherteDaten?.heute) {
    const menge = parseFloat(gespeicherteDaten.heute.menge);
    const ziel = parseFloat(gespeicherteDaten.heute.ziel);
    const prozent = Math.min(100, (menge / ziel) * 100);
    fill.style.width = prozent + '%';
    info.textContent = `${menge} L von ${ziel} L getrunken`;
    box?.classList.remove('hidden');
  }
});
