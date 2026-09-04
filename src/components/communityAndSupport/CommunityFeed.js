import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import communityService from '../../services/communityService';
import PostForm from './PostForm';
import { useAuth } from '../../hooks/useAuth';

const CommunityFeed = () => {
  const { auth } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await communityService.getPosts({ limit: 20 });
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreated = (newPost) => {
    // place the new post on top
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Community Feed</h4>
        <div>
          {auth?.user ? (
            <Button onClick={() => setShowForm(true)}>New Post</Button>
          ) : (
            <Link to="/login" className="btn btn-outline-primary">Login to Post</Link>
          )}
        </div>
      </div>

      {loading && <div className="text-center py-5"><Spinner animation="border" /></div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <Row>
        {posts.map((post) => (
          <Col xs={12} md={6} lg={6} key={post._id} className="mb-3">
            <Card className="h-100 border-secondary bg-dark text-light shadow-sm">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="mb-2">
                    <Link to={`/community-support/post/${post._id}`} className="text-decoration-none fw-bold" style={{ color: '#00d8ff' }}>
                      {post.title}
                    </Link>
                  </Card.Title>

                  <Card.Subtitle className="mb-3 text-muted small">
                    por <span className="text-light">{post.author?.username || 'Anónimo'}</span> · {new Date(post.createdAt).toLocaleDateString()}
                  </Card.Subtitle>

                  <Card.Text className="text-muted small" style={{ maxHeight: 60, overflow: 'hidden' }}>
                    {post.body}
                  </Card.Text>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-secondary">
                  <div>
                    {(post.tags || []).map((t, i) => (
                      <Badge bg="info" text="dark" key={i} className="me-1">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <Link to={`/community-support/post/${post._id}`} className="btn btn-sm btn-outline-info">
                    Read →
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <PostForm show={showForm} onClose={() => setShowForm(false)} onCreated={handleCreated} />
    </>
  );
};

export default CommunityFeed;
