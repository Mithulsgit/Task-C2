import { FaStar } from "react-icons/fa";

function TutorialCard({ tutorial }) {
  return (
    <div className="featured-card">
      <img src={tutorial.image} alt={tutorial.title} />

      <h3>{tutorial.title}</h3>

      <p>{tutorial.description}</p>

      <hr />

      <div className="featured-card-info">
        <span className="featured-rating">
          <FaStar />
          {tutorial.rating}
        </span>

        <span>{tutorial.author}</span>
      </div>
    </div>
  );
}

export default TutorialCard;