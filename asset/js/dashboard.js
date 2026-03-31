// --- CAU HINH CAC TUY CHON CUA BIEU DO ---
const options = {
  chart: {
    type: 'line',   // Loai bieu do la duong ke
    height: 500     // Chieu cao cua bieu do (pixel)
  },
  series: [{
    name: 'Doanh thu',
    data: [100, 230, 150, 550, 350, 500] // Du lieu hien thi tren bieu do
  }],
  xaxis: {
    // Cac nhan hien thi duoi truc hoanh (truc X)
    categories: ['Thang 1', 'Thang 2', 'Thang 3', 'Thang 4', 'Thang 5', 'Thang 6']
  },
  yaxis: {
    labels: {
      // Ham dinh dang lai gia tri hien thi tren truc tung (truc Y)
      formatter: function (val) {
        return val + 'tr'; // Them don vi "tr" (trieu) vao sau con so
      }
    }
  },
  colors: ['#333'], // Mau sac cua duong ke tren bieu do
  title: {
    text: 'Doanh thu 6 thang dau nam', // Tieu de cua bieu do
    align: 'center',                    // Can giua tieu de
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#222'
    }
  }
};

// --- KHOI TAO VA VE BIEU DO ---
// Tim phan tu co id="chart" de ve bieu do vao do
const chart = new ApexCharts(document.querySelector("#chart"), options);

// Goi ham render de bat dau ve bieu do len giao dien
chart.render();