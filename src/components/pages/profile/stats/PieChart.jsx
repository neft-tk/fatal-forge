// Chart.js
import 'chart.js/auto'
import { Pie } from 'react-chartjs-2';

// TODO: Make this chart dynamic, just a placeholder for now.

function PieChart() {
  const chartData = {
    // Labels/Keys
    labels: ['Wins', 'Loses', 'Ties'],
    datasets: [{
      label: 'W/L Distribution',
      // Ratios
      data: [64, 37, 6],
      // Styling
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

  // Chart.js options object
  const chartOptions = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: 'white'
      }
    }
  };

  // Chart component with data and options.
  return (
    <Pie
      data={chartData}
      options={chartOptions}
      width={"100%"}
    />
  );
}

export default PieChart