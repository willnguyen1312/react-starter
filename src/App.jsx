import { useState } from "react";
import "./styles.css";

const NUMBER_OF_SIDES = 6;

const DIE_FACE_POSITIONS = [
  ["center"],
  ["top-right", "bottom-left"],
  ["top-right", "center", "bottom-left"],
  ["top-left", "top-right", "bottom-left", "bottom-right"],
  ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
  [
    "top-left",
    "top-right",
    "center-left",
    "center-right",
    "bottom-left",
    "bottom-right",
  ],
];

const generateId = (() => {
  let id = 0;
  return function generateId() {
    return ++id;
  };
})();

function generateDices(numberOfDice) {
  return Array.from({ length: numberOfDice }, () => ({
    value: Math.ceil(Math.random() * NUMBER_OF_SIDES),
    id: generateId(),
  }));
}

const App = () => {
  const [dices, setDiceValues] = useState([]);

  return (
    <div className="wrapper">
      <form
        className="dice-form"
        onSubmit={(event) => {
          // To prevent a page reload.
          event.preventDefault();

          const data = new FormData(event.target);
          const numberOfDice = data.get("dice");
          setDiceValues(generateDices(+numberOfDice));
        }}
      >
        <label htmlFor="dice">Number of dice</label>
        <input id="dice" name="dice" type="number" min="1" max="99" />

        <button aria-controls="result" type="submit">
          Roll
        </button>
      </form>

      <div className="dices">
        {dices.map(({ id, value }) => {
          const dotPositions = DIE_FACE_POSITIONS[value - 1];
          return (
            <div key={id} className="dice">
              <div className="dots">
                {dotPositions.map((dotPosition) => (
                  <div key={dotPosition} className={`dot ${dotPosition}`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div role="region" id="result" aria-live="polite">
        {dices.length} dices are rolled successfully
      </div>
    </div>
  );
};

export default App;
