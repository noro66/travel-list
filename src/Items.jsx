export default function Item({ item, handelDeleteItem, handelToogle }) {
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
