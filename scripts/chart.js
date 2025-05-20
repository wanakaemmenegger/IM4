let gespeicherteDaten = null; // globale Variable

fetch('etl/chart_data.php')
  .then(response => response.json())
  .then(data => {
    console.log('Empfangene Daten:', data);
    gespeicherteDaten = data;

    // === Allgemeine Statistik-Anzeige ===
    const summary = document.getElementById('trinkSummary');
    const dateBox = document.getElementById('datumBox');
    const zielBox = document.getElementById('zielBox');

    if (summary && dateBox && zielBox && data.heute) {
      const menge = parseFloat(data.heute.menge);
      const ziel = parseFloat(data.heute.ziel);
      const rest = Math.max(0, ziel - menge);
      const heute = new Date();
      const wochentag = heute.toLocaleDateString('de-DE', { weekday: 'long' });
      const datum = heute.toLocaleDateString('de-DE');

      summary.textContent = `Du hast heute ${menge} L getrunken. Noch ${rest.toFixed(2)} L bis zum Ziel!`;
      dateBox.textContent = `${wochentag} ${datum}`;
      zielBox.textContent = `täglicher Trinkbedarf: ${ziel} L`;
    }

    // === Wochenchart anzeigen ===
    const ctx = document.getElementById('wochenChart')?.getContext('2d');
    if (ctx && data.wochenverlauf) {
      const labels = data.wochenverlauf.map(e => e.wochentag);
      const werte = data.wochenverlauf.map(e => parseFloat(e.summe));

      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, '#2f3d7e');
      gradient.addColorStop(1, '#17296d');

      const farben = data.wochenverlauf.map(e =>
        e.is_today ? '#EDC643' : gradient
      );

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
              data: new Array(labels.length).fill(parseFloat(data.heute.ziel)),
              type: 'line',
              borderColor: '#edc643',
              borderWidth: 4,
              pointRadius: 0,
              pointHoverRadius: 0,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
         scales: {
            y: {
              beginAtZero: true,
              max: 3,
              ticks: {
                stepSize: 0.5
              },
              grid: {
                display: false
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          elements: {
            bar: {
              borderRadius: Number.MAX_VALUE
            }
          },
          plugins: {
            tooltip: { enabled: false },
            legend: {
              position: 'bottom',
              labels: {
                generateLabels: function (chart) {
                  const datasets = chart.data.datasets;
                  const line = datasets.find(ds => ds.label === 'Dein täglicher Trinkbedarf');
                  return line ? [{
                    text: line.label,
                    strokeStyle: line.borderColor,
                    lineWidth: 4,
                    pointStyle: 'line',
                    fillStyle: line.borderColor,
                    hidden: false,
                    datasetIndex: datasets.indexOf(line)
                  }] : [];
                },
                usePointStyle: true,
                boxWidth: 20,
                font: {
                  family: 'Roboto',
                  size: 14
                },
                color: '#17296d'
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
  document.querySelector('.trinkfortschritt-box')?.classList.add('hidden');
});

document.getElementById('btn-day')?.addEventListener('click', () => {
  document.getElementById('wochenChart').style.display = 'none';
  document.getElementById('tagesChart').style.display = 'block';
  document.getElementById('btn-week').classList.remove('active');
  document.getElementById('btn-day').classList.add('active');

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
