import "../../Pages/Home/Home.css";
import foodclip from "../../Video/foodclip.mp4";

// This component is the application's Home page

function Home() {
  return (
    <div className="home">
      <video autoPlay loop muted className="video">
        <source src={foodclip} />
      </video>
      <div className="welcome">
        Welcome to delicious
        <i className="fas fa-utensils"></i>
      </div>
    </div>
  );
}

export default Home;
