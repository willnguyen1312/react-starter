import { useEffect, useRef } from "react";

const SIZE = 10;

export default function App() {
  const boxRef = useRef();
  const anchor = useRef();
  const selectedGrids = useRef([]);

  useEffect(() => {
    const move = (e) => {
      const { x, y } = e;

      const diffX = x - anchor.current.x;
      const diffY = y - anchor.current.y;

      if (diffX <= 0) {
        boxRef.current.style.left = `${x}px`;
      } else {
        // Fix anchor position in case previous x is smaller than anchor x
        boxRef.current.style.left = `${anchor.current.x}px`;
      }

      if (diffY <= 0) {
        boxRef.current.style.top = `${y}px`;
      } else {
        // Fix anchor position in case previous x is smaller than anchor y
        boxRef.current.style.top = `${anchor.current.y}px`;
      }

      const width = Math.abs(diffX);
      const height = Math.abs(diffY);

      boxRef.current.style.width = `${width}px`;
      boxRef.current.style.height = `${height}px`;

      const { left, top } = boxRef.current.getBoundingClientRect();

      const grids = document.querySelector(".grids").querySelectorAll("div");
      const scrollLeft = document.documentElement.scrollLeft;
      const scrollTop = document.documentElement.scrollTop;

      selectedGrids.current = [];
      // Evaluate each grid
      for (let i = 0; i < grids.length; i += 1) {
        const {
          x,
          y,
          width: cellWidth,
          height: cellHeight,
        } = grids[i].getBoundingClientRect();

        const cellX = scrollLeft + x;
        const cellY = scrollTop + y;

        if (
          cellX > left &&
          cellX + cellWidth < left + width &&
          cellY > top &&
          cellY + cellHeight < top + height
        ) {
          grids[i].style.background = "#b6b6b6";
          selectedGrids.current.push(grids[i]);
        } else {
          grids[i].style.background = "transparent";
        }
      }
    };

    const down = (e) => {
      // Get click position and make it as an anchor
      const { x, y } = e;
      anchor.current = { x, y };

      boxRef.current.style.left = `${x}px`;
      boxRef.current.style.top = `${y}px`;
      boxRef.current.style.border = "2px dashed black";

      // Start selecting
      window.addEventListener("mousemove", move);
    };

    const up = () => {
      // Stop selecting
      window.removeEventListener("mousemove", move);

      // Reset boundingRect style
      boxRef.current.style.width = `${0}px`;
      boxRef.current.style.height = `${0}px`;
      boxRef.current.style.border = "none";

      // Change selected grids color
      selectedGrids.current.forEach((cell) => {
        cell.style.background = "#96AAF9";
      });

      // Empty selected grids
      selectedGrids.current = [];
    };

    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousedown", down);
      window.addEventListener("mouseup", up);
      window.removeEventListener("mousemove", move);
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
            return <div className="grids__item" key={`grid${index}`} />;
          })}
        </div>
      </div>
    </>
  );
}
