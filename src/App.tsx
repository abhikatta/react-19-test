// import { useEffect } from "react";
// import ActionsForm from "./Form/ActionsForm";
// import Meme from "./GetMeme/Meme";
import StateTest from "./stateTest/stateTest";

const App = () => {
  return (
    <div className="bg-slate-800">
      <nav className="pt-3">meme downloader</nav>
      <div className="gap-10 py-10 flex min-h-screen h-full w-full flex-col justify-center items-center">
        {/* <Meme />
        <ActionsForm /> */}
        <StateTest />
      </div>
    </div>
  );
};

export default App;
