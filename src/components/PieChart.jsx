import 'chart.js/auto'
import { Pie } from 'react-chartjs-2';

// TODO: Add functionality to the chart.

function PieChart() {
  const chartData = {
    labels: ['Wins', 'Loses', 'Ties'],
    datasets: [{
      label: 'W/L Distribution',
      data: [64, 37, 6],
      backgroundColor: [
        '#65a30d',
        '#dc2626',
        '#facc15'
      ],
      borderColor: [
        '#4d7c0f',
        '#b91c1c',
        '#eab308'
      ],
      borderWidth: 1,
    }]
  };

  const chartOptions = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: 'white'
      }
    }
  };

  return (
    <Pie
      data={chartData}
      options={chartOptions}
      width={"100%"}
    />
  );
}

export default PieChart