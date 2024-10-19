export default function Stats({ items }) {
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