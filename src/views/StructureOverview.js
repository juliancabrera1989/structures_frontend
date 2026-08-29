import React from 'react';
import { Container } from 'react-bootstrap';
import StructureList from '../components/structureOverview/StructureList';

const StructureOverview = () => {
  return (
    <Container className="mt-5 text-light">
      <div className="border-bottom border-secondary pb-3 mb-5 text-center">
        <h2 className="fw-bold text-info">Structure Overview</h2>
        <p className="text-secondary mb-0">
          Select template to initialize it directly on the interactive visualizer canvas.
        </p>
      </div>

      <StructureList />
    </Container>
  );
};

export default StructureOverview;