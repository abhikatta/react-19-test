import Meme from "./GetMeme/Meme";

function App() {
  return (
    <div>
      <h1 className=" meme-text text-[4rem]">meme downloader</h1>
      <div className="bg-black gap-10 text-white py-10 flex min-h-screen h-full w-full flex-col justify-center items-center">
        <Meme />
      </div>
    </div>
  );
}

export default App;
