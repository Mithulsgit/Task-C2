import { useState } from "react";
import Header from "../components/Header";

function NewPost() {
  const [postType, setPostType] = useState("question");

  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const [articleTitle, setArticleTitle] = useState("");
  const [articleAbstract, setArticleAbstract] = useState("");
  const [articleText, setArticleText] = useState("");
  const [articleTags, setArticleTags] = useState("");

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
    setMessage("");
    setErrors([]);
  };

  const handleQuestionSubmit = (event) => {
    event.preventDefault();

    const validationErrors = [];

    if (!questionTitle.trim()) {
      validationErrors.push("Please enter a question title.");
    }

    if (!questionDescription.trim()) {
      validationErrors.push("Please describe your problem.");
    }

    if (!questionTags.trim()) {
      validationErrors.push("Please enter at least one tag.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setMessage("");
      return;
    }

    setErrors([]);
    setMessage("Post Received");

    setQuestionTitle("");
    setQuestionDescription("");
    setQuestionTags("");
  };

  const handleArticleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = [];

    if (!articleTitle.trim()) {
      validationErrors.push("Please enter an article title.");
    }

    if (!articleAbstract.trim()) {
      validationErrors.push("Please enter an article abstract.");
    }

    if (!articleText.trim()) {
      validationErrors.push("Please enter the article text.");
    }

    if (!articleTags.trim()) {
      validationErrors.push("Please enter at least one tag.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setMessage("");
      return;
    }

    setErrors([]);
    setMessage("Post Received");

    setArticleTitle("");
    setArticleAbstract("");
    setArticleText("");
    setArticleTags("");
  };

  return (
    <>
      <Header />

      <main className="new-post-page">
        <h1>New Post</h1>

        <div className="post-type-selection">
          <h2>Select Post Type</h2>

          <label>
            <input
              type="radio"
              name="postType"
              value="question"
              checked={postType === "question"}
              onChange={handlePostTypeChange}
            />
            Question
          </label>

          <label>
            <input
              type="radio"
              name="postType"
              value="article"
              checked={postType === "article"}
              onChange={handlePostTypeChange}
            />
            Article
          </label>
        </div>

        {postType === "question" ? (
          <section className="post-form">
            <h2>What do you want to ask or share</h2>

            <form onSubmit={handleQuestionSubmit}>
              <div className="form-group">
                <label htmlFor="question-title">Title</label>

                <input
                  id="question-title"
                  type="text"
                  value={questionTitle}
                  onChange={(event) =>
                    setQuestionTitle(event.target.value)
                  }
                  placeholder="Start your question with how, what, why, etc."
                />
              </div>

              <div className="form-group">
                <label htmlFor="question-description">
                  Describe your problem
                </label>

                <textarea
                  id="question-description"
                  value={questionDescription}
                  onChange={(event) =>
                    setQuestionDescription(event.target.value)
                  }
                  placeholder="Describe your problem"
                  rows="7"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="question-tags">Tags</label>

                <input
                  id="question-tags"
                  type="text"
                  value={questionTags}
                  onChange={(event) =>
                    setQuestionTags(event.target.value)
                  }
                  placeholder="Please add up to 3 tags, e.g. Java"
                />
              </div>

              {errors.length > 0 && (
                <div className="validation-errors">
                  {errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}

              {message && (
                <div className="success-message">
                  {message}
                </div>
              )}

              <button type="submit">Post</button>
            </form>
          </section>
        ) : (
          <section className="post-form">
            <h2>What do you want to ask or share</h2>

            <form onSubmit={handleArticleSubmit}>
              <div className="form-group">
                <label htmlFor="article-title">Title</label>

                <input
                  id="article-title"
                  type="text"
                  value={articleTitle}
                  onChange={(event) =>
                    setArticleTitle(event.target.value)
                  }
                  placeholder="Enter a descriptive title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="article-abstract">Abstract</label>

                <textarea
                  id="article-abstract"
                  value={articleAbstract}
                  onChange={(event) =>
                    setArticleAbstract(event.target.value)
                  }
                  placeholder="Enter a 1-paragraph abstract"
                  rows="4"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="article-text">Article Text</label>

                <textarea
                  id="article-text"
                  value={articleText}
                  onChange={(event) =>
                    setArticleText(event.target.value)
                  }
                  placeholder="Enter your article text"
                  rows="8"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="article-tags">Tags</label>

                <input
                  id="article-tags"
                  type="text"
                  value={articleTags}
                  onChange={(event) =>
                    setArticleTags(event.target.value)
                  }
                  placeholder="Please add up to 3 tags, e.g. Java"
                />
              </div>

              {errors.length > 0 && (
                <div className="validation-errors">
                  {errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}

              {message && (
                <div className="success-message">
                  {message}
                </div>
              )}

              <button type="submit">Post</button>
            </form>
          </section>
        )}
      </main>
    </>
  );
}

export default NewPost;