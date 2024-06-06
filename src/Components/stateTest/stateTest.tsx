import { useEffect, useState } from "react";
import Button from "../Button";

const StateTest = () => {
  const [inc, setInc] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("in app");
  });

  return (
    <div className="text-white">
      <p>{inc}</p>
      <Button onClick={() => setInc((c) => c + 1)}>+</Button>
      <input
        className="text-black"
        value={name}
        onChange={(e) => setName(e.target.value)}></input>
      <Child name={name} />
    </div>
  );
};

function Child({ name }: { name: string }) {
  useEffect(() => {
    console.log("in child");
  });
  return <p className="text-white">I am a child with name {name}</p>;
}

export default StateTest;
