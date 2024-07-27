import { useState } from "react";

export default function Stats({ items }) {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <em>Start adding your items to your packing list</em>
      </footer>
    );
  }
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / totalItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "All Done 🚀"
          : ` You have ${totalItems} number of Item in your list, and you already
          packed ${packedItems} ${percentage}%`}
      </em>
    </footer>
  );
}
