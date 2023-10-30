export default function ImageCarousel({ images, activeIndex }) {
  return (
    <div className="carousel">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          className={`carousel__image ${
            index !== activeIndex ? "carousel__image--hide" : ""
          }`}
        />
      ))}
    </div>
  );
}
