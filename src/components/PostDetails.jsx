import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById, deletePost, clearCurrentPost, } from "../features/slices/postSlice";


const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {currentPost: post, loading, error, } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostById(id));
    return () => dispatch(clearCurrentPost());
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (window.confirm("you want to deletepost?")) {
      await dispatch(deletePost(id));
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">Error: {error}</div>
        <Link to="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="card-title mb-3">{post.title}</h1>
              <small className="text-muted d-block mb-4">
                Posted on{" "}
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {post.updatedAt !== post.createdAt && (
                  <span>
                    {" "}
                    · Updated {new Date(post.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </small>
              <p
                className="card-text"
                style={{ whiteSpace: "pre-wrap", lineHeight: "1.8" }}
              >
                {post.content}
              </p>
            </div>
            <div className="card-footer bg-white d-flex gap-2 p-4">
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate(`/edit/${post.id}`)}
              >
                Edit
              </button>
              <button className="btn btn-outline-danger" onClick={handleDelete}>
                Delete
              </button>
              <Link to="/" className="btn btn-secondary ms-auto">
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
