import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';

const CommentList = ({ comments = [] }) => {
  if (!comments.length) return <p className="text-muted italic">No hay comentarios aún. ¡Sé el primero en responder!</p>;

  return (
    <ListGroup variant="flush" className="rounded">
      {comments.map((c) => (
        <ListGroup.Item key={c._id} className="py-3 bg-dark text-light border-secondary">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <strong style={{ color: '#00d8ff' }}>{c.author?.username || c.author?.email || 'Anónimo'}</strong>
              <div className="text-muted small">{new Date(c.createdAt).toLocaleString()}</div>
              <div className="mt-2 text-light">{c.content}</div> 
            </div>
            <div className="text-end">
              <Badge bg="secondary" className="border border-dark">{c.likes || 0} ♥</Badge>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CommentList;