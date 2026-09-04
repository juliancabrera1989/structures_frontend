import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Spinner, Alert, Button } from 'react-bootstrap';
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
  }, [id]);

  const handleAddedComment = (comment) => {
    setPost(prev => ({ ...prev, comments: [...(prev.comments || []), comment] }));
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="info" /></div>;
  if (error) return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;
  if (!post) return null;

  return (
    <Container className="mt-4 pb-5" style={{ maxWidth: '800px' }}>
      <Link to="/community-support" className="btn btn-sm btn-outline-info mb-3">
        ← Return to Community 
      </Link>

      <Card className="p-4 shadow-sm bg-dark text-light border-secondary">
        <h3 style={{ color: '#00d8ff' }}>{post.title}</h3>
        <div className="text-muted small mb-3">
          por <span className="text-light">{post.author?.username || post.author?.email || 'Anónimo'}</span> · {new Date(post.createdAt).toLocaleString()}
        </div>
        
        <p className="fs-5" style={{ color: '#e6edf3' }}>{post.content || post.body}</p>

        <hr className="border-secondary my-4" />

        <h5 className="mb-3 text-info">Comments ({post.comments?.length || 0})</h5>
        <CommentList comments={post.comments || []} />
        
        <div className="mt-4 pt-3 border-top border-secondary">
          <CommentForm postId={post._id} onAdded={handleAddedComment} />
        </div>
      </Card>
    </Container>
  );
};

export default PostDetail;