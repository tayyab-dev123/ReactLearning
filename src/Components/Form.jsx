import { useState } from "react";

export default function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;

    const newItem = { id: Date.now(), description, quantity, packed: false };
    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  };
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for Trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item name"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* <Button backgroundColor="yellow" color="blue">
        Add
      </Button> */}
      <Button>Add</Button>
    </form>
  );
}

const Button = ({ backgroundColor, color, children }) => {
  const buttonStyle = {
    backgroundColor: backgroundColor,
    color: color,
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
  };

  return <button style={buttonStyle}>{children}</button>;
};
