import { Suspense, use, useState } from "react";

const fetchRequest = (): Promise<string> => {
  return new Promise((resolve) => setTimeout(resolve, 1500, "Done!"));
};

const Message = () => {
  const [messagePromise, setMessagePromise] = useState<Promise<string> | null>(
    null
  );
  const [show, setShow] = useState<boolean>(false);
  const download = () => {
    setMessagePromise(fetchRequest());
    setShow(true);
  };

  const MessageOutput = ({
    messagePromise,
  }: {
    messagePromise: Promise<string>;
  }) => {
    const messageContent = use(messagePromise);
    return <p>Download is {messageContent}</p>;
  };

  const MessageContainer = ({
    messagePromise,
  }: {
    messagePromise: Promise<string>;
  }) => {
    return (
      <Suspense fallback={<p>Downloading...</p>}>
        <MessageOutput messagePromise={messagePromise}></MessageOutput>
      </Suspense>
    );
  };
  if (show && messagePromise) {
    return <MessageContainer messagePromise={messagePromise} />;
  } else {
    return (
      <button
        className="bg-slate-700 rounded-md outline-none border-none cursor-pointer px-4 py-2"
        onClick={download}>
        Download
      </button>
    );
  }
};
export default Message;
