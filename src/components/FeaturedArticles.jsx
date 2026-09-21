import featuredArticles from "../data/featuredArticles";
import FeaturedArticleCard from "./FeaturedArticleCard";

function FeaturedArticles() {
  function showAllArticles() {
    alert("More articles coming soon!");
  }

  return (
    <section className="featured-articles">
      <h2>Featured Articles</h2>

      <div className="featured-grid">
        {featuredArticles.map((article, index) => (
          <FeaturedArticleCard
            key={index}
            article={article}
          />
        ))}
      </div>

      <button
        className="see-all-button"
        onClick={showAllArticles}
      >
        See all articles
      </button>
    </section>
  );
}

export default FeaturedArticles;