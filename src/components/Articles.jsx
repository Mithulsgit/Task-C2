import articles from "../data/articles";
import ArticleCard from "./ArticleCard";

function Articles() {
  return (
    <section className="articles" id="work">
      <h2>Here is what I have done so far</h2>

      <div className="article-list">
        {articles.map((article, index) => (
          <ArticleCard
            key={index}
            article={article}
          />
        ))}
      </div>
    </section>
  );
}

export default Articles;