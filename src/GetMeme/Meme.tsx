import { Suspense, use, useState } from "react";
import Button from "../Components/Button";
import { IMeme } from "./types";
import { download, generateRandomMemeId } from "../utils/utils";
import { API_URL } from "../constans/constants";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

const Meme = () => {
  const memeText = useSelector((state: RootState) => state.memeText);
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
        <div className="h-fit w-auto flex flex-col items-center">
          <p className="max-w-sm absolute translate-y-5 meme-text">
            {memeText.topText ?? ""}
          </p>
          <img width={400} src={memeItem.url} alt={memeItem.name} />
          <div className=" flex flex-col items-center">
            <p className="max-w-sm absolute -translate-y-16 meme-text">
              {memeText.bottomText ?? ""}
            </p>
          </div>
        </div>
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
      <Suspense
        fallback={<p className="meme-text">Loading an awesome meme...</p>}>
        <MemeItem />
      </Suspense>
      <Button classname="meme-text" onClick={showNewMeme}>
        Get a new Meme
      </Button>
    </>
  );
};

export default Meme;
