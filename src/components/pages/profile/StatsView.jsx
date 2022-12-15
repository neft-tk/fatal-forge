import React from 'react';
import PieChart from '../../PieChart';

function StatsView() {
  return (
    <div className="card-style w-full h-full text-center">
      <h2 className="h2-text">Statistics</h2>
      <div>
        <PieChart />
      </div>
    </div>
  );
}

export default StatsView;
