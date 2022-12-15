import React from 'react';
import PieChart from '../../PieChart';

function StatsView() {
  return (
    <div className="card-background card-style center-all w-full h-full">
      <h2 className="h2-text">Statistics</h2>
      <div>
        <PieChart />
      </div>
    </div>
  );
}

export default StatsView;
