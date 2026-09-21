const photos = ["/1.png", "/2.png", "/3.png", "/4.png"];

function Photos() {
  return (
    <section className="photos" id="photos">
      <h2>My Photos</h2>

      <div className="photo-grid">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Gallery item ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Photos;