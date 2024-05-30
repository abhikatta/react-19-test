import { Suspense, use, useState } from "react";
import Button from "../Components/Button";
import { IMeme } from "./types";
import { download } from "../utils/utils";

const API_URL = "https://api.imgflip.com/get_memes";
const TOTAL_MEME_COUNT = 100;

const Meme = () => {
  const generateRandomMemeId = () => {
    return Math.floor(Math.random() * TOTAL_MEME_COUNT);
  };
  const [Id, setId] = useState<number>(generateRandomMemeId);
  const fetchMeme = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const res = await fetch(API_URL);
    return res.json();
  };
  const MemeItem = () => {
    const memes = use<IMeme>(fetchMeme());
    const memeItem = memes.data.memes[Id];

    return (
      <div className="flex flex-col justify-center items-center gap-10">
        <img width={400} src={memeItem.url} alt={memeItem.name} />
        <Button
          classname="meme-text"
          onClick={() => download(memeItem.url, memeItem.name)}>
          Download this meme
        </Button>
      </div>
    );
  };

  const showNewMeme = () => {
    setId(generateRandomMemeId);
  };
  return (
    <>
      <Button classname="meme-text" onClick={showNewMeme}>
        Get a new Meme
      </Button>
      <Suspense
        fallback={<p className="meme-text">Loading an awesome meme...</p>}>
        <MemeItem />
      </Suspense>
    </>
  );
};

export default Meme;
