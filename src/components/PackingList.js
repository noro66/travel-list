import { useState } from "react";
import Item from "../Items";
export default function PackingList({
  items,
  hanDeleteItem,
  handelToogle,
  handelReset,
}) {
  const [sortedBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortedBy === "input") sortedItems = items;
  if (sortedBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortedBy === "status")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            handelDeleteItem={hanDeleteItem}
            handelToogle={handelToogle}
          />
        ))}
      </ul>

      {items.length > 0 && (
        <div className="actions">
          <select value={sortedBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="status">Sort by packed status</option>
          </select>
          <button onClick={handelReset}>Clear List</button>
        </div>
      )}
    </div>
  );
}