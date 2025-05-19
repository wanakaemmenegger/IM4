fetch('chart_data.php')
  .then(response => response.json())
  .then(data => {
    const ctx = document.getElementById('wochenChart').getContext('2d');

    const labels = data.map(e => e.wochentag);
    const werte = data.map(e => e.summe);
    const farben = data.map(e => e.is_today ? '#EDC643' : '#17296d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Getrunken (L)',
          data: werte,
          backgroundColor: farben,
          borderRadius: 20,
          borderSkipped: false
        },
        {
          label: 'Dein täglicher Trinkbedarf',
          data: Array(7).fill(1.8),
          type: 'line',
          borderColor: '#edc643',
          borderWidth: 4,
          pointRadius: 0,
          fill: false
        }]
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
  });
