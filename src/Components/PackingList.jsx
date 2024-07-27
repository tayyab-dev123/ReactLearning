import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  handleDeleteItem,
  onToggleItem,
  onClearItem,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems = items;
  if (sortBy === "input") {
    sortedItems = items;
  } else if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === "packed") {
    sortedItems = items.slice().sort((a, b) => b.packed - a.packed);
  }

  return (
    <div className="list">
      <ul style={{ overflow: "hidden" }}>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleDeleteItem={handleDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div style={{ display: "flex" }}>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input Order</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort By Packed Item</option>
        </select>
        <button onClick={() => onClearItem()}>Clear</button>
      </div>
    </div>
  );
}
