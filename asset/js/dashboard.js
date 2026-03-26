
// Dữ liệu mẫu
const options = {
  chart: {
    type: 'line', 
    height: 500
  },
  series: [{
    name: 'Doanh thu',
    data: [100, 230, 150, 550, 350, 500]
  }],
  xaxis: {
    categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6']
  },
   yaxis: {
    labels: {
      formatter: function (val) {
        return val + 'tr'; // thêm đơn vị cho trục Y
      }
    }
  },
  colors: ['#333'],
  title: {
    text: 'Doanh thu 6 tháng đầu năm', // Tên biểu đồ
    align: 'center',                   // căn giữa
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#222'
    }
  }
};

const chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();