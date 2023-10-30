import { useState } from "react";
import ImageCarousel from "./ImageCarousel";

const images = [
  "https://images.unsplash.com/photo-1682687219570-4c596363fd96?q=25",
  "https://images.unsplash.com/photo-1511656890657-c8b3f9464a9e?q=25",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?q=25",
  "https://images.unsplash.com/photo-1616411023041-f0223e26110f?q=25",
  "https://images.unsplash.com/photo-1541585485705-933a0f48b48d?q=25",
  "https://images.unsplash.com/photo-1487418493465-9b479a9bda5f?q=25",
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="wrapper">
      <ImageCarousel images={images} activeIndex={activeIndex} />
      <div>
        <button
          onClick={() => {
            const nextIndex = (activeIndex - 1 + images.length) % images.length;
            setActiveIndex(nextIndex);
          }}
        >
          &larr;
        </button>
        <button
          onClick={() => {
            const nextIndex = (activeIndex + 1) % images.length;
            setActiveIndex(nextIndex);
          }}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
