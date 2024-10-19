import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 16, packed: true },
];

function App() {
  const [items, setItems] = useState(initialItems);

  function handelItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }
  function handelDelete(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }
  function handelToogle(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form handelAddItem={handelItems} />
      <PackingList
        items={items}
        hanDeleteItem={handelDelete}
        handelToogle={handelToogle}
      />
      <Stats items={items} />
    </div>
  );
}

function Item({ item, handelDeleteItem, handelToogle }) {
  return (
    <li>
      <input
        checked={item.packed}
        onChange={() => handelToogle(item.id)}
        type="checkbox"
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        onClick={() => handelDeleteItem(item.id)}
        style={{ color: "red", fontSize: "32px" }}
      >
        &times;
      </button>
    </li>
  );
}

function Logo() {
  return <h1>Far Away </h1>;
}

function Form({ handelAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handelSubmit(e) {
    e.preventDefault();
    if (!description || !quantity) return;

    const newItem = { id: Date.now(), description, quantity, packed: false };

    handelAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={(e) => handelSubmit(e)}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function PackingList({ items, hanDeleteItem, handelToogle }) {
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
      <div className="actions">
        <select value={sortedBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="status">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}
function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list !</em>
      </p>
    );
  }
  const itemsNum = items.length;
  const itemsPacked = items.filter((item) => item.packed).length;
  const percenage = Math.round((itemsPacked / itemsNum) * 100);

  return (
    <footer className="stats">
      <em>
        {percenage === 100
          ? "You got everything! Ready to go"
          : `You have ${itemsNum} items on your list, and you already packed ${itemsPacked} item (${percenage}%) `}
      </em>
    </footer>
  );
}

export default App;
