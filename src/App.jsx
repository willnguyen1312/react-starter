import { useEffect, useRef, useState } from "react";

const SIZE = 10;

export default function App() {
  const boxRef = useRef();
  const cornerRef = useRef();
  const [selectedGrids, setSelectedGrids] = useState(new Set());
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDraggingRef.current) {
        return;
      }

      const { x, y } = e;

      const diffX = x - cornerRef.current.x;
      const diffY = y - cornerRef.current.y;
      const boxElement = boxRef.current;

      // Update select-box position
      if (diffX <= 0) {
        boxElement.style.left = `${x}px`;
      } else {
        boxElement.style.left = `${cornerRef.current.x}px`;
      }

      if (diffY <= 0) {
        boxElement.style.top = `${y}px`;
      } else {
        boxElement.style.top = `${cornerRef.current.y}px`;
      }

      const width = Math.abs(diffX);
      const height = Math.abs(diffY);

      // Update select-box size
      boxElement.style.width = `${width}px`;
      boxElement.style.height = `${height}px`;

      const { left, top } = boxElement.getBoundingClientRect();
      const grids = document.querySelectorAll(".grids__item");

      const newSelectedGrids = new Set();

      // Evaluate each grid
      for (let i = 0; i < grids.length; i += 1) {
        const {
          x,
          y,
          width: cellWidth,
          height: cellHeight,
        } = grids[i].getBoundingClientRect();

        if (
          // Check if grid is partially inside select-box
          left <= x + cellWidth &&
          x <= left + width &&
          top <= y + cellHeight &&
          y <= top + height
        ) {
          newSelectedGrids.add(i);
        }
      }

      setSelectedGrids(newSelectedGrids);
    };

    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      // Reset selected grids
      setSelectedGrids(new Set());
      // Get click position and store it in ref
      const { x, y } = e;
      cornerRef.current = { x, y };

      boxRef.current.style.left = `${x}px`;
      boxRef.current.style.top = `${y}px`;
      boxRef.current.style.border = "2px dashed black";
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      // Reset select-box style
      boxRef.current.style.width = `${0}px`;
      boxRef.current.style.height = `${0}px`;
      boxRef.current.style.border = "none";
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={boxRef} className="select-box" />
      <div className="wrapper">
        <div
          className="grids"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${SIZE}, 1fr)`,
          }}
        >
          {Array.from({ length: SIZE * SIZE }, (_, index) => {
            return (
              <div
                className={`grids__item ${
                  selectedGrids.has(index) ? "grids__item--highlight" : ""
                }`}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
