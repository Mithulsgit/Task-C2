function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <img src={article.image} alt={article.title} />

      <div className="article-content">
        <h3>{article.title}</h3>
        <p>{article.description}</p>
      </div>
    </div>
  );
}

export default ArticleCard;