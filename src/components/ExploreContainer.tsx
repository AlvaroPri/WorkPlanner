import React from 'react';
import './ExploreContainer.css';

interface ExploreContainerProps { }

const ExploreContainer: React.FC<ExploreContainerProps> = () => {
  return (
    <div className="explore-container">
      <div className="option">In Progress</div>
      <div className="option">Complete</div>
      <div className="option">Pending Task</div>
      <div className="option">Log Out</div>
    </div>
  );
};

export default ExploreContainer;
