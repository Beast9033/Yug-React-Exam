import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../features/slices/postSlice';

const PostForm = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.posts);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    await dispatch(addPost({ title, content }));
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="blogTitle" className="form-label">
            Blog title
          </label>
          <input
            type="text"
            className="form-control"
            id="blogTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="blogContent" className="form-label">
            Blog Content
          </label>
          <textarea
            className="form-control"
            id="blogContent"
            placeholder="Write Your Blog Here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            rows="5"
            >

          </textarea>
        </div>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Posting...' : 'Submit'}
          
        </button>
      </form>
    </div>
  )
}

export default PostForm;