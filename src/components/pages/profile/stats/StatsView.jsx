import React from 'react';
import PieChart from './PieChart';

// The StatsView component will have multiple ways to visualize your game history.

export default function StatsView() {
  return (
    <div className="card-background card-style center-all w-full h-full">
      <h2 className="h2-text">Statistics</h2>
      <div>
        <PieChart />
      </div>
    </div>
  );
}