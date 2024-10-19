import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 16, packed: true },
];


function App() {
  const [items, setItems] = useState(initialItems);

  function handelItems(item){
    setItems((prevItems) => [...prevItems, item]);
  } 
  function handelDelete(id){
    setItems((prevItems)=> prevItems.filter(item => item.id !== id))
  }
  function handelToogle(id){
    setItems(prevItems => prevItems.map(item => item.id === id ? {...item, packed : !item.packed } : item))
  }
  return (
    <div className="app">
      <Logo />
      <Form handelAddItem={handelItems} />
      <PackingList  items={items} hanDeleteItem={handelDelete} handelToogle={handelToogle}/>
      <Stats />
    </div>
  );
}

function Item({ item, handelDeleteItem, handelToogle }) {
  return (
    <li>
      <input onChange={()=> handelToogle(item.id)} type="checkbox"  />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={()=> handelDeleteItem(item.id)} style={{ color: "red", fontSize: "32px" }}>&times;</button>
    </li>
  );
}

function Logo() {
  return <h1>Far Away </h1>;
}

function Form({handelAddItem}) {
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

function PackingList({items, hanDeleteItem, handelToogle}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} handelDeleteItem={hanDeleteItem} handelToogle={handelToogle} />
        ))}
      </ul>
    </div>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X</em>
    </footer>
  );
}


export default App;
