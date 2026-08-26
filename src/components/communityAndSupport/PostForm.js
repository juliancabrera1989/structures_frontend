// import React, { useState } from 'react';
// import { Modal, Button, Form, Alert } from 'react-bootstrap';
// import communityService from '../../services/communityService';
// import { useAuth } from '../../hooks/useAuth';

// const PostForm = ({ show, onClose, onCreated }) => {
//   const { auth } = useAuth();
//   const token = auth?.token;
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [tags, setTags] = useState('');
//   const [error, setError] = useState('');
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e?.preventDefault();
//     setError('');
//     if (!token) {
//       setError('You must be logged in to create a post.');
//       return;
//     }
//     if (!title.trim() || !body.trim()) {
//       setError('Title and content are required.');
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const newPost = await communityService.createPost(
//         { title: title.trim(), content: body.trim(), tags: tags.split(',').map(t => t.trim()).filter(Boolean) },
//         token
//       );
//       setTitle('');
//       setBody('');
//       setTags('');
//       onCreated && onCreated(newPost);
//       onClose();
//     } catch (err) {
//       console.error(err);
//       setError(err?.response?.data?.message || 'Failed to create post');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onClose} centered>
//       <Form onSubmit={handleSubmit}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create New Post</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <Form.Group className="mb-3" controlId="postTitle">
//             <Form.Label>Title</Form.Label>
//             <Form.Control
//               placeholder="Short descriptive title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               maxLength={120}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="postBody">
//             <Form.Label>Content</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={6}
//               placeholder="Write your question, explanation or discussion..."
//               value={body}
//               onChange={(e) => setBody(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group controlId="postTags">
//             <Form.Label>Tags (comma separated)</Form.Label>
//             <Form.Control
//               placeholder="e.g. linked-list, javascript, debugging"
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//             />
//             <Form.Text className="text-muted">
//               Tags help others find your post.
//             </Form.Text>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={onClose} disabled={submitting}>
//             Cancel
//           </Button>
//           <Button variant="primary" type="submit" disabled={submitting}>
//             {submitting ? 'Posting...' : 'Post'}
//           </Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   );
// };

// export default PostForm;



import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import communityService from '../../services/communityService';
import { useAuth } from '../../hooks/useAuth';

const PostForm = ({ show, onClose, onCreated }) => {
  const { auth } = useAuth();
  const token = auth?.token;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    if (!token) {
      setError('You must be logged in to create a post.');
      return;
    }
    if (!title.trim() || !body.trim()) {
      setError('Title and content are required.');
      return;
    }

    setSubmitting(true);
    try {
      const newPost = await communityService.createPost(
        { title: title.trim(), content: body.trim(), tags: tags.split(',').map(t => t.trim()).filter(Boolean) },
        token
      );
      setTitle('');
      setBody('');
      setTags('');
      onCreated && onCreated(newPost);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to create post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered contentClassName="bg-dark text-light border-secondary">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton closeVariant="white" className="border-secondary">
          <Modal.Title style={{ color: '#00d8ff' }}>Create New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form.Group className="mb-3" controlId="postTitle">
            <Form.Label className="text-light">Title</Form.Label>
            <Form.Control
              placeholder="Short descriptive title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              className="bg-dark text-light border-secondary"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="postBody">
            <Form.Label className="text-light">Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Write your question, explanation or discussion..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="bg-dark text-light border-secondary"
            />
          </Form.Group>

          <Form.Group controlId="postTags">
            <Form.Label className="text-light">Tags (comma separated)</Form.Label>
            <Form.Control
              placeholder="e.g. linked-list, javascript, debugging"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="bg-dark text-light border-secondary"
            />
            <Form.Text className="text-muted">
              Tags help others find your post.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-secondary">
          <Button variant="outline-secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="info" type="submit" disabled={submitting} className="text-dark fw-bold">
            {submitting ? 'Posting...' : 'Post'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PostForm;