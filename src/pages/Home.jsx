// import Header from "../components/Header";
import PostList from "../components/PostList";

const Home = () => {
  return (
    <>
      <div className="container py-5">
        <div className="mb-5">
          <h1 className="text-secondary">
            My Best Articles to Help You <br />
            Build a Successful Blog
          </h1>
        </div>
        <PostList />
      </div>
    </>
  )
}

export default Home;
