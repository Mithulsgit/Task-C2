import tutorials from "../data/tutorials";
import TutorialCard from "./TutorialCard";

function Tutorials() {

  function showAllTutorials() {
    alert("More tutorials coming soon!");
  }

  return (
    <section className="featured-articles">

      <h2>Featured Tutorials</h2>

      <div className="featured-grid">

        {tutorials.map((tutorial, index) => (

          <TutorialCard
            key={index}
            tutorial={tutorial}
          />

        ))}

      </div>

      <button
        className="see-all-button"
        onClick={showAllTutorials}
      >
        See all tutorials
      </button>

    </section>
  );
}

export default Tutorials;