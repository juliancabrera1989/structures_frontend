import React from 'react';
import { Table, Container, Alert } from 'react-bootstrap';

const SavedDataStructures = ({ dataStructures }) => {
    if(!dataStructures || dataStructures.length === 0) {
    return <Alert variant="info">No data structures saved yet.</Alert>;
  }

  return (
    <Container className="mt-4">
      <h4 className="text-center mb-4">Your Saved Data Structures</h4>
      <div className="table-responsive"> {/* Responsive wrapper */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {dataStructures.map((structure, index) => (
              <tr key={index}>
                <td>{structure.id}</td>
                <td>{structure.name}</td>
                <td>{structure.type}</td>
                <td>{new Date(structure.dateCreated).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default SavedDataStructures;