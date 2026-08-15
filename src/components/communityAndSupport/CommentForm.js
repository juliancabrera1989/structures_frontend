import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import communityService from '../../services/communityService';
import { useAuth } from '../../hooks/useAuth';

const CommentForm = ({ postId, onAdded }) => {
  const { auth } = useAuth();
  const token = auth?.token;
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [posting, setPosting] = useState(false);

  const submit = async (e) => {
    e?.preventDefault();
    setError('');
    if (!token) {
      setError('You must be logged in to comment.');
      return;
    }
    if (!text.trim()) {
      setError('Comment cannot be empty.');
      return;
    }
    setPosting(true);
    try {
      const newComment = await communityService.createComment(postId, { content: text.trim() }, token);
      setText('');
      onAdded && onAdded(newComment);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to post comment');
    } finally {
      setPosting(false);
    }
  };

  return (
    <Form onSubmit={submit} className="mb-3">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="commentText">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder={auth?.user ? "Write a helpful comment..." : "Login to comment"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!token}
        />
      </Form.Group>
      <div className="d-flex justify-content-end mt-2">
        <Button type="submit" disabled={!token || posting}>
          {posting ? 'Posting...' : 'Post Comment'}
        </Button>
      </div>
    </Form>
  );
};

export default CommentForm;
