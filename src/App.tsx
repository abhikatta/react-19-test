// PLEASE IGNORE ALL THE COMMENTS

// import { useEffect } from "react";
// import StateTest from "./stateTest/stateTest";

import ActionsForm from "./Components/Form/ActionsForm";
import Meme from "./Components/GetMeme/Meme";

const App = () => {
  return (
    <div className="bg-slate-800">
      <nav className="pt-3">meme downloader</nav>
      <div className="gap-10 py-10 flex min-h-screen h-full w-full flex-col justify-center items-center">
        <Meme />
        <ActionsForm />
        {/* <StateTest /> */}
      </div>
    </div>
  );
};

export default App;
