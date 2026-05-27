import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, deletePost, fetchPostById } from "../features/slices/postSlice";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentPost, loading, error } = useSelector((state) => state.posts);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [id, dispatch]);



  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill in all fields");
      return;
    }

    await dispatch(updatePost({ id: parseInt(id), Data: { title, content } }));
    navigate(`/post/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await dispatch(deletePost(parseInt(id)));
      navigate("/");
    }
  };

  if (loading && !currentPost) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="mb-4">Edit Post</h2>
            
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="blogTitle" className="form-label">
                  Blog Title
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
                  placeholder="Edit Your Blog Here"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={loading}
                  rows="8"
                />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Updating..." : "Update Post"}
                </button>
                
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete Post"}
                </button>
                
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => navigate("/")}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
