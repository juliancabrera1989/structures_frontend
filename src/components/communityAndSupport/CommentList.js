import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';

const CommentList = ({ comments = [] }) => {
  if (!comments.length) return <p className="text-muted">No comments yet. Be the first!</p>;

  return (
    <ListGroup variant="flush">
      {comments.map((c) => (
        <ListGroup.Item key={c._id} className="py-3">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <strong>{c.author?.username || c.author?.email || 'Anonymous'}</strong>
              <div className="text-muted small">{new Date(c.createdAt).toLocaleString()}</div>
                <div className="mt-2">{c.content}</div> 
            </div>
            <div className="text-end">
              <Badge bg="light" text="dark">{c.likes || 0} ♥</Badge>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CommentList;
