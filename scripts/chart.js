let gespeicherteDaten = null;
let wochenChart = null;
let gradient = null;

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
    const ctxWochen = document.getElementById('wochenChart')?.getContext('2d');
    if (ctxWochen && data.wochenverlauf && data.heute) {
      const labels = data.wochenverlauf.map(e => e.wochentag);
      const werte = data.wochenverlauf.map(e => parseFloat(e.summe));

      wochenChart = new Chart(ctxWochen, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Getrunken (L)',
              data: werte,
              backgroundColor: '#F5C400', // initial einfarbig
              borderRadius: 20,
              borderSkipped: false
            },
            {
              label: 'Dein täglicher Trinkbedarf',
              data: new Array(labels.length).fill(parseFloat(data.heute.ziel)),
              type: 'line',
              borderColor: '#F5C400',
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
              ticks: { stepSize: 0.5 },
              grid: { display: false }
            },
            x: {
              grid: { display: false }
            }
          },
          elements: {
            bar: { borderRadius: Number.MAX_VALUE }
          },
          plugins: {
            tooltip: { enabled: false },
            legend: {
              position: 'bottom',
              labels: {
                generateLabels(chart) {
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
                font: { family: 'Roboto', size: 14 },
                color: '#17296d'
              }
            }
          }
        },
        plugins: [{
          id: 'applyGradient',
          afterLayout(chart) {
            const {ctx, chartArea} = chart;
            if (!chartArea) return;

            if (!gradient) {
              gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
              gradient.addColorStop(0, '#17296d');
              gradient.addColorStop(1, '#2f3d7e');
            }

            const dataset = chart.data.datasets[0];
            dataset.backgroundColor = dataset.data.map((_, i) =>
              data.wochenverlauf[i].is_today ? '#F5C400' : gradient
            );
          }
        }]
      });
    }

    // === Tageschart anzeigen ===
    const ctxTages = document.getElementById('tagesChart')?.getContext('2d');
    if (ctxTages && data.tagesverlauf && data.heute) {
      const labels = data.tagesverlauf.map(e => e.zeit);
      const werte = data.tagesverlauf.map(e => parseFloat(e.menge));

      const gradientDay = ctxTages.createLinearGradient(0, 300, 0, 0);
      gradientDay.addColorStop(0, '#17296d');
      gradientDay.addColorStop(1, '#2f3d7e');

      const tagesChart = new Chart(ctxTages, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Getrunken (L)',
            data: werte,
            backgroundColor: gradientDay,
            borderRadius: 20,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 0.5,
              ticks: { stepSize: 0.1 },
              grid: { display: false }
            },
            x: {
              grid: { display: false }
            }
          },
          elements: {
            bar: { borderRadius: Number.MAX_VALUE }
          },
          plugins: {
            tooltip: { enabled: false },
            legend: { display: false }
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
  document.querySelector('.chart-area').classList.remove('tagesmodus');
  console.log('Wochenchart aktiv, Tagesmodus entfernt:', document.querySelector('.chart-area').classList);
});

document.getElementById('btn-day')?.addEventListener('click', () => {
  document.getElementById('wochenChart').style.display = 'none';
  document.getElementById('tagesChart').style.display = 'block';
  document.getElementById('btn-week').classList.remove('active');
  document.getElementById('btn-day').classList.add('active');
  document.querySelector('.chart-area').classList.add('tagesmodus');

  const fill = document.getElementById('trinkFill');
  const box = document.querySelector('.trinkfortschritt-box');
  if (fill && gespeicherteDaten?.heute) {
    const menge = parseFloat(gespeicherteDaten.heute.menge);
    const ziel = parseFloat(gespeicherteDaten.heute.ziel);
    const prozent = Math.min(100, (menge / ziel) * 100);
    fill.style.width = prozent + '%';
    box?.classList.remove('hidden');
  }
  console.log('Tageschart aktiv, Tagesmodus gesetzt:', document.querySelector('.chart-area').classList);
});
