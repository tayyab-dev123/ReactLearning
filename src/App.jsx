import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Stats from "./Components/Stats";
import PackingList from "./Components/PackingList";
import Form from "./Components/Form";
import Logo from "./Components/Logo";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  const [items, setItems] = useState([]);
  const handleSubmitItem = (item) => {
    setItems([...items, item]);
  };

  const handleDeleteItem = (id) => {
    console.log("id", id);
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };
  const handleClearItem = () => {
    setItems([]);
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleSubmitItem} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItem={handleClearItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
