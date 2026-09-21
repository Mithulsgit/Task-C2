import { FaStar } from "react-icons/fa";

function FeaturedArticleCard({ article }) {
  return (
    <div className="featured-card">
      <img src={article.image} alt={article.title} />

      <h3>{article.title}</h3>

      <p>{article.description}</p>

      <hr />

      <div className="featured-card-info">
        <span className="featured-rating">
          <FaStar />
          {article.rating}
        </span>

        <span>{article.author}</span>
      </div>
    </div>
  );
}

export default FeaturedArticleCard;