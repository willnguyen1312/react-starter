import { useState } from "react";

import "./styles.css";

function Comp({ value }) {
  return <h1>{value}</h1>;
}

const PAGE_SIZE = 3;

export default function App() {
  const [arr, setArr] = useState([]);

  return (
    <div className="app">
      {arr.map((item, index) => (
        <Comp key={item} value={item} />
      ))}

      <button
        onClick={() => {
          const newArr = [];
          for (let i = 0; i < PAGE_SIZE; i++) {
            newArr.push(Math.floor(Math.random() * 10));
          }
          setArr(newArr);
        }}
      >
        Shuffle
      </button>
    </div>
  );
}
