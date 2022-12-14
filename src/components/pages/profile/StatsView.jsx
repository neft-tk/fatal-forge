import React from 'react';
import PieChart from '../../PieChart';

function StatsView() {
  return (
    <div className="font-bold p-4 w-full h-full border-2 rounded-md border-gray-300 bg-alt-bg text-main-text text-center">
      <h2 className="text-center text-2xl font-display-text-f">Statistics</h2>
      <div>
        <PieChart />
      </div>
    </div>
  );
}

export default StatsView;
