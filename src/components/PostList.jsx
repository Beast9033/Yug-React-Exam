import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/slices/postSlice";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";

const PostList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error:</strong> {error}
        <br />
        <small>Make sure <code>json-server</code> is running on port 3000 (<code>npm run server</code>)</small>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-info d-inline-block">
          No posts yet! <Link to="/CreatePost" className="alert-link">Create your first post →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      {items.map((post) => (
        <div key={post.id} className="col-md-6 col-lg-4 mb-4">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
