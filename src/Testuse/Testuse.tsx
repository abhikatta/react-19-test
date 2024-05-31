import { Suspense, use, useState } from "react";
import Button from "../Components/Button";

const Testuse = () => {
  const [text, setText] = useState<Promise<string> | null>(null);
  const [show, setShow] = useState(false);
  const resolveFunction = (): Promise<string> => {
    setShow(true);

    return new Promise((resolve) => setTimeout(resolve, 1500, "Done!"));
  };

  const download = () => {
    setShow(true);
    setText(resolveFunction());
  };

  const MessageContainer = ({ text }: { text: Promise<string> }) => {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <MessageItem text={text} />
      </Suspense>
    );
  };

  const MessageItem = ({ text }: { text: Promise<string> }) => {
    const message = use(text);
    return <p>{message}</p>;
  };
  return (
    <>
      <Button onClick={download}>Press</Button>
      {show && text && <MessageContainer text={text} />}
    </>
  );
};

export default Testuse;
