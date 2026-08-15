import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import communityService from '../../services/communityService';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPost = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await communityService.getPost(id);
      setPost(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPost();
    // eslint-disable-next-line
  }, [id]);

  const handleAddedComment = (comment) => {
    setPost(prev => ({ ...prev, comments: [...(prev.comments || []), comment] }));
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error) return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;
  if (!post) return null;

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h3>{post.title}</h3>
        <div className="text-muted mb-2">by {post.author?.username || post.author?.email} · {new Date(post.createdAt).toLocaleString()}</div>
        <p>{post.content}</p>

        <hr />

        <h5>Comments</h5>
        <CommentList comments={post.comments || []} />
        <div className="mt-3">
          <CommentForm postId={post._id} onAdded={handleAddedComment} />
        </div>
      </Card>
    </Container>
  );
};

export default PostDetail;
