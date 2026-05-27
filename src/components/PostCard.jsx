import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const preview =
    post.content?.length > 120
      ? post.content.substring(0, 120) + "..."
      : post.content;

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text text-muted">{preview}</p>
      </div>
      <div className="card-footer bg-white border-top-0">
        <Link to={`/post/${post.id}`} className="btn btn-sm btn-primary w-100">
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
