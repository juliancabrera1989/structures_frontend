// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Container, Card, Spinner, Alert, Button } from 'react-bootstrap';
// import communityService from '../../services/communityService';
// import CommentList from './CommentList';
// import CommentForm from './CommentForm';

// const PostDetail = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const fetchPost = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const data = await communityService.getPost(id);
//       setPost(data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) fetchPost();
//   }, [id]);

//   const handleAddedComment = (comment) => {
//     setPost(prev => ({ ...prev, comments: [...(prev.comments || []), comment] }));
//   };

//   if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="info" /></div>;
//   if (error) return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;
//   if (!post) return null;

//   return (
//     <Container className="mt-4 pb-5" style={{ maxWidth: '800px' }}>
//       <Link to="/community-support" className="btn btn-sm btn-outline-info mb-3">
//         ← Return to Community 
//       </Link>

//       <Card className="p-4 shadow-sm bg-dark text-light border-secondary">
//         <h3 style={{ color: '#00d8ff' }}>{post.title}</h3>
//         <div className="text-muted small mb-3">
//           por <span className="text-light">{post.author?.username || post.author?.email || 'Anónimo'}</span> · {new Date(post.createdAt).toLocaleString()}
//         </div>
        
//         <p className="fs-5" style={{ color: '#e6edf3' }}>{post.content || post.body}</p>

//         <hr className="border-secondary my-4" />

//         <h5 className="mb-3 text-info">Comments ({post.comments?.length || 0})</h5>
//         <CommentList comments={post.comments || []} />
        
//         <div className="mt-4 pt-3 border-top border-secondary">
//           <CommentForm postId={post._id} onAdded={handleAddedComment} />
//         </div>
//       </Card>
//     </Container>
//   );
// };

// export default PostDetail;




// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Container, Card, Spinner, Alert, Image } from 'react-bootstrap';
// import communityService from '../../services/communityService';
// import CommentList from './CommentList';
// import CommentForm from './CommentForm';

// const PostDetail = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const fetchPost = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const data = await communityService.getPost(id);
//       setPost(data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) fetchPost();
//   }, [id]);

//   const handleAddedComment = (comment) => {
//     setPost(prev => ({ ...prev, comments: [...(prev.comments || []), comment] }));
//   };

//   if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="info" /></div>;
//   if (error) return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;
//   if (!post) return null;

//   // Extraer el nombre de autor del post
//   const postAuthorName = post.author?.username || post.author?.email || post.authorName || 'Anónimo';

//   return (
//     <Container className="mt-4 pb-5" style={{ maxWidth: '800px' }}>
//       <Link to="/community-support" className="btn btn-sm btn-outline-info mb-3">
//         ← Return to Community 
//       </Link>

//       <Card className="p-4 shadow-sm bg-dark text-light border-secondary">
//         <h3 style={{ color: '#00d8ff' }}>{post.title}</h3>
//         <div className="text-muted small mb-3">
//           por <span className="text-info fw-bold">{postAuthorName}</span> · {new Date(post.createdAt).toLocaleString()}
//         </div>
        
//         <p className="fs-5" style={{ color: '#e6edf3', whiteSpace: 'pre-line' }}>{post.content || post.body}</p>

//         {/* 📸 Si el post incluye una captura del lienzo, la renderizamos */}
//         {post.imageUrl && (
//           <div className="my-3 p-2 bg-black rounded border border-secondary text-center">
//             <Image src={post.imageUrl} fluid rounded style={{ maxHeight: '350px' }} />
//           </div>
//         )}

//         <hr className="border-secondary my-4" />

//         <h5 className="mb-3 text-info">Comments ({post.comments?.length || 0})</h5>
//         <CommentList comments={post.comments || []} />
        
//         <div className="mt-4 pt-3 border-top border-secondary">
//           <CommentForm postId={post._id} onAdded={handleAddedComment} />
//         </div>
//       </Card>
//     </Container>
//   );
// };

// export default PostDetail;


// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Container, Card, Spinner, Alert, Image, Modal } from 'react-bootstrap';
// import communityService from '../../services/communityService';
// import CommentList from './CommentList';
// import CommentForm from './CommentForm';

// const PostDetail = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
  
//   // 🔍 Estado para el Lightbox / Zoom
//   const [showImageModal, setShowImageModal] = useState(false);

//   const fetchPost = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const data = await communityService.getPost(id);
//       setPost(data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) fetchPost();
//   }, [id]);

//   const handleAddedComment = (comment) => {
//     setPost(prev => ({ ...prev, comments: [...(prev.comments || []), comment] }));
//   };

//   if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="info" /></div>;
//   if (error) return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;
//   if (!post) return null;

//   const postAuthorName = post.author?.username || post.author?.email || post.authorName || 'Anónimo';

//   return (
//     <Container className="mt-4 pb-5" style={{ maxWidth: '800px' }}>
//       <Link to="/community-support" className="btn btn-sm btn-outline-info mb-3">
//         ← Return to Community 
//       </Link>

//       <Card className="p-4 shadow-sm bg-dark text-light border-secondary">
//         <h3 style={{ color: '#00d8ff' }}>{post.title}</h3>
//         <div className="text-muted small mb-3">
//           por <span className="text-info fw-bold">{postAuthorName}</span> · {new Date(post.createdAt).toLocaleString()}
//         </div>
        
//         <p className="fs-5" style={{ color: '#e6edf3', whiteSpace: 'pre-line' }}>{post.content || post.body}</p>

//         {/* 📸 Imagen clickeable con cursor de zoom */}
//         {post.imageUrl && (
//           <div className="my-3 p-2 bg-black rounded border border-secondary text-center">
//             <Image 
//               src={post.imageUrl} 
//               fluid 
//               rounded 
//               style={{ maxHeight: '350px', cursor: 'zoom-in' }} 
//               onClick={() => setShowImageModal(true)}
//               title="Click to enlarge"
//             />
//             <div className="text-muted small mt-1">🔍 Click image to enlarge</div>
//           </div>
//         )}

//         <hr className="border-secondary my-4" />

//         <h5 className="mb-3 text-info">Comments ({post.comments?.length || 0})</h5>
//         <CommentList comments={post.comments || []} />
        
//         <div className="mt-4 pt-3 border-top border-secondary">
//           <CommentForm postId={post._id} onAdded={handleAddedComment} />
//         </div>
//       </Card>

//       {/* 🔍 Lightbox / Modal desplegable */}
//       {/* <Modal 
//         show={showImageModal} 
//         onHide={() => setShowImageModal(false)} 
//         size="xl" 
//         centered 
//         contentClassName="bg-dark text-light border-secondary"
//       >
//         <Modal.Header closeButton closeVariant="white" className="border-secondary">
//           <Modal.Title className="text-info small">Canvas Snapshot View</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="text-center p-3 bg-black">
//           <Image src={post.imageUrl} fluid style={{ maxHeight: '80vh', objectFit: 'contain' }} />
//         </Modal.Body>
//       </Modal> */}
// <Modal 
//   show={showImageModal} // 👈 Usá el nombre real de tu estado (ej: showImageModal o showModal)
//   onHide={() => setShowImageModal(false)} // 👈 Usá la función real que cierra tu modal
//   centered 
//   size="xl" // 👈 Esto agranda la ventana para que la captura no se vea enana
//   contentClassName="bg-dark text-light border-secondary"
// >
//   <Modal.Header closeButton closeVariant="white" className="border-secondary">
//     <Modal.Title className="text-info">Canvas Snapshot View</Modal.Title>
//   </Modal.Header>
// <Modal.Body className="p-3 text-center bg-black">
//   {(post?.canvasSnapshot || post?.image || post?.snapshot) ? (
//     <img 
//       src={post.canvasSnapshot || post.image || post.snapshot} 
//       alt="Canvas Snapshot" 
//       style={{ 
//         width: '100%', 
//         maxHeight: '75vh', 
//         objectFit: 'contain',
//         borderRadius: '8px'
//       }} 
//     />
//   ) : (
//     <p className="text-muted my-4">No snapshot image available for this post.</p>
//   )}
// </Modal.Body>
// </Modal>
//     </Container>
//   );
// };

// export default PostDetail;



import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Spinner, Alert, Image, Modal } from 'react-bootstrap';
import communityService from '../../services/communityService';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // 🔍 Estado para el Lightbox / Zoom
  const [showImageModal, setShowImageModal] = useState(false);

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

  const postAuthorName = post.author?.username || post.author?.email || post.authorName || 'Anónimo';

  return (
    <Container className="mt-4 pb-5" style={{ maxWidth: '800px' }}>
      <Link to="/community-support" className="btn btn-sm btn-outline-info mb-3">
        ← Return to Community 
      </Link>

      <Card className="p-4 shadow-sm bg-dark text-light border-secondary">
        <h3 style={{ color: '#00d8ff' }}>{post.title}</h3>
        {/* <div className="text-muted small mb-3">
          por <span className="text-info fw-bold">{postAuthorName}</span> · {new Date(post.createdAt).toLocaleString()}
        </div> */}
        {/* Reemplazá el bloque de autor por este: */}
        <div className="text-muted small mb-3 d-flex align-items-center gap-2">
          <span>por <strong className="text-info">{postAuthorName}</strong></span>
          
          {/* 👈 Badge si el autor del post es admin */}
          {(post.author?.role === 'admin' || post.authorRole === 'admin') && (
            <span className="badge bg-info text-dark fw-bold px-2 py-1" style={{ fontSize: '0.75rem' }}>
              Admin
            </span>
          )}
  
  <span>· {new Date(post.createdAt).toLocaleString()}</span>
</div>
        
        <p className="fs-5" style={{ color: '#e6edf3', whiteSpace: 'pre-line' }}>{post.content || post.body}</p>

        {/* 📸 Imagen clickeable con cursor de zoom */}
        {post.imageUrl && (
          <div className="my-3 p-2 bg-black rounded border border-secondary text-center">
            <Image 
              src={post.imageUrl} 
              fluid 
              rounded 
              style={{ maxHeight: '350px', cursor: 'zoom-in' }} 
              onClick={() => setShowImageModal(true)}
              title="Click to enlarge"
            />
            <div className="text-muted small mt-1">🔍 Click image to enlarge</div>
          </div>
        )}

        <hr className="border-secondary my-4" />

        <h5 className="mb-3 text-info">Comments ({post.comments?.length || 0})</h5>
        <CommentList comments={post.comments || []} />
        
        <div className="mt-4 pt-3 border-top border-secondary">
          <CommentForm postId={post._id} onAdded={handleAddedComment} />
        </div>
      </Card>

      {/* 🔍 Lightbox / Modal gigante corregido */}
{/* 🔍 Visor de imagen en tamaño gigante */}
      <Modal 
        show={showImageModal} 
        onHide={() => setShowImageModal(false)} 
        centered 
        dialogClassName="modal-95w" // 👈 Clase para romper la restricción de Bootstrap
        style={{ padding: 0 }}
        contentClassName="bg-dark text-light border-secondary shadow-lg"
      >
        <Modal.Header closeButton closeVariant="white" className="border-secondary py-2">
          <Modal.Title className="text-info fs-5">Canvas Snapshot View</Modal.Title>
        </Modal.Header>
        <Modal.Body 
          className="p-2 text-center bg-black" 
          style={{ 
            maxHeight: '88vh', 
            overflow: 'auto', // Permite scroll si la imagen es muy grande
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {post.imageUrl ? (
            <img 
              src={post.imageUrl} 
              alt="Canvas Snapshot Full" 
              style={{ 
                minWidth: '70%', // 👈 Fuerza a que no se reduzca
                maxWidth: '100%', 
                height: 'auto',
                maxHeight: '82vh',
                objectFit: 'contain',
                borderRadius: '6px'
              }} 
            />
          ) : (
            <p className="text-muted my-4">No snapshot image available for this post.</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PostDetail;