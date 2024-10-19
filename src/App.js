import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
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
  function handelReset() {
    const confirmed = window.confirm(
      "are you sure you want to delete all the items ?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form handelAddItem={handelItems} />
      <PackingList
        items={items}
        hanDeleteItem={handelDelete}
        handelToogle={handelToogle}
        handelReset={handelReset}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
