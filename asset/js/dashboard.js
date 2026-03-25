const charts = [
  { id: "#chart-revenue", data: [10, 20, 30, 25, 40] },
  { id: "#chart-users", data: [5, 15, 25, 20, 30] },
  { id: "#chart-orders", data: [8, 18, 12, 22, 28] },
  { id: "#chart-views", data: [12, 10, 20, 18, 35] }
];

charts.forEach(item => {
  const chart = new ApexCharts(
    document.querySelector(item.id),
    {
      chart: {
        type: 'area',
        height: 120,
        sparkline: {
          enabled: true // 🔥 quan trọng nhất
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0
        }
      },
      series: [{
        data: item.data
      }]
    }
  );

  chart.render();
});