import React from 'react';
import { useLocation } from 'react-router-dom';
import Conversation from './Conversation';

const ScenarioDetail = () => {
  const { state } = useLocation();
  const { scenario } = state;

  if (!scenario) {
    return <div>No scenario data available.</div>;
  }

  return (
    <div>
      <Conversation scenario={scenario} />
    </div>
  );
};

export default ScenarioDetail; 