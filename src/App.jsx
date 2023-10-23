import { useEffect, useState } from "react";
import "./styles.css";

const MIN = 1;
const MAX = 15;
const MAX_NUMBER = 200;
const Y_AXIS_SCALE = 10;

// Extract out the fetching of numbers
async function fetchNumbers() {
  const response = await fetch(
    `https://www.random.org/integers/?num=${MAX_NUMBER}&min=${MIN}&max=${MAX}&col=1&base=10&format=plain&rnd=new`
  );

  const numbersString = await response.text();
  return numbersString
    .split("\n")
    .filter(Boolean)
    .map((number) => +number);
}

function countNumbers(numbers) {
  const counter = {};

  for (let i = MIN; i <= MAX; i++) {
    counter[i] = 0;
  }

  numbers.forEach((number) => {
    counter[number]++;
  });

  return counter;
}

export default function DataFetching() {
  const [counts, setCounts] = useState({});
  async function getNumbers() {
    const numbers = await fetchNumbers();
    setCounts(countNumbers(numbers));
  }

  useEffect(() => {
    getNumbers();
  }, []);

  const maxCount = Math.max(0, ...Object.values(counts));
  const maxYAxis = Math.min(
    Math.ceil(maxCount / Y_AXIS_SCALE) * Y_AXIS_SCALE,
    MAX_NUMBER
  );

  return (
    <div className="wrapper">
      <div className="chart">
        <div className="chartYAxis">
          <div className="chartYAxisItems">
            {Array.from({ length: maxYAxis / Y_AXIS_SCALE }).map((_, index) => (
              <div key={index} className="chartYAxisItem">
                {(index + 1) * Y_AXIS_SCALE}
              </div>
            ))}
          </div>
          <div className="chartYAxisZero">0</div>
        </div>

        <div className="chartMainBody">
          <div className="chartMainBodyBars">
            {Array.from({ length: MAX - MIN + 1 }).map((_, index) => (
              <div
                key={index}
                className="chartMainBodyBar"
                style={{
                  height: `${(counts[index + MIN] / maxYAxis) * 100}%`,
                }}
              />
            ))}
          </div>
          <div className="chartXAxisItems">
            {Array.from({ length: MAX - MIN + 1 }).map((_, index) => (
              <div className="chartXAxisItem" key={index}>
                {index + MIN}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={getNumbers}>Refresh</button>
    </div>
  );
}
