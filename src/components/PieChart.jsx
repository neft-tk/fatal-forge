import 'chart.js/auto'
import { Pie } from 'react-chartjs-2';

function PieChart() {
  return (
    <Pie
      data={{
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
      }}
      options={{
        legend: {          
          labels: {
            fontSize: 50,
            fontColor: 'green',
          }
        }
      }}
      height={400}
      width={400}
    />
  );
}

export default PieChart