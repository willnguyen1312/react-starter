import { useState } from "react";

export default function App() {
  const [values, setValues] = useState([]);

  return (
    <div>
      <button
        onClick={() => {
          // Generate random values from 1 to 10
          return setValues(
            Array.from({ length: 10 }, () => Math.floor(Math.random() * 10) + 1)
          );
        }}
      >
        Random
      </button>

      {values.map((i) => (
        <Num key={i} i={i} />
      ))}
    </div>
  );
}

function Num({ i }) {
  return <p>{i}</p>;
}
