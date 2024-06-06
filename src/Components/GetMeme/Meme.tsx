import { RefObject, Suspense, use, useEffect, useRef, useState } from "react";
import Button from "../Button";
import { IMeme, MemeText } from "./types";
import { download, generateRandomMemeId } from "../../utils/utils";
import { API_URL } from "../../constans/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import DownloadIcon from "../../Assets/Icons/downloadIcon.png";
import NextRandomMeme from "../../Assets/Icons/nextRandomIcon.png";
const MemeItem = ({
  fetchMeme,
  Id,
  canvasRef,
  memeText,
}: {
  fetchMeme: () => Promise<IMeme>;
  Id: number;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  memeText: MemeText;
}) => {
  const memes = use<IMeme>(fetchMeme());
  const memeItem = memes.data.memes[Id];

  // eslint-disable-next-line react-compiler/react-compiler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const canvasContext = canvas.getContext("2d");
      if (canvasContext) {
        const image = new Image();

        // following fixes the error tainted canvasses may not be exported
        image.crossOrigin = "anonymous";
        image.src = memeItem.url;
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;

          // drawing image
          canvasContext.drawImage(image, 0, 0);

          // apply font
          canvasContext.font = "2em Impact, sans-serif";
          canvasContext.fillStyle = "white";
          canvasContext.textAlign = "center";
          canvasContext.textBaseline = "top";
          canvasContext.lineWidth = 2;

          // apply text styling and the shawdow as per the css
          const drawTextWithShadow = (text: string, x: number, y: number) => {
            canvasContext.fillStyle = "black";
            canvasContext.shadowColor = "black";
            canvasContext.shadowOffsetX = 2;
            canvasContext.shadowOffsetY = 2;
            canvasContext.shadowBlur = 0;
            canvasContext.fillText(text, x, y);
            canvasContext.fillStyle = "white";
            canvasContext.shadowOffsetX = -2;
            canvasContext.shadowOffsetY = -2;
            canvasContext.fillText(text, x, y);
            canvasContext.shadowOffsetX = 2;
            canvasContext.shadowOffsetY = -2;
            canvasContext.fillText(text, x, y);
            canvasContext.shadowOffsetX = -2;
            canvasContext.shadowOffsetY = 2;
            canvasContext.fillText(text, x, y);
            canvasContext.shadowOffsetX = 0;
            canvasContext.shadowOffsetY = 2;
            canvasContext.fillText(text, x, y);
            canvasContext.shadowOffsetX = 2;
            canvasContext.shadowOffsetY = 0;
            canvasContext.fillText(text, x, y);
            canvasContext.shadowOffsetX = 0;
            canvasContext.shadowOffsetY = -2;
            canvasContext.fillText(text, x, y);
            canvasContext.shadowOffsetX = -2;
            canvasContext.shadowOffsetY = 0;
            canvasContext.fillText(text, x, y);
            canvasContext.shadowBlur = 5;
            canvasContext.fillText(text, x, y);
          };

          const drawMemeText = (text: string, x: number, y: number) => {
            const lines = text.toUpperCase().split("\n");
            const lineHeight = 30;
            lines.forEach((line, index) => {
              drawTextWithShadow(line, x, y + index * lineHeight);
            });
          };

          if (memeText.topText) {
            drawMemeText(memeText.topText, canvas.width / 2, 10);
          }

          if (memeText.bottomText) {
            drawMemeText(
              memeText.bottomText,
              canvas.width / 2,
              canvas.height - 50
            );
          }
        };
      }
    }
  }, [memeItem, canvasRef, memeText.topText, memeText.bottomText]);

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
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <Button
        classname="meme-text"
        onClick={async () => {
          if (canvasRef.current) {
            console.log("askjnas");

            const dataUrl = canvasRef.current.toDataURL("image/png");
            await download(dataUrl, memeItem.name);
          }
          //  download(dataUrl, memeItem.name, canvasRef)}
        }}>
        <img width={50} src={DownloadIcon} alt="icon of sin" />
      </Button>
    </div>
  );
};
const Meme = () => {
  const memeText = useSelector((state: RootState) => state.memeText);
  const [Id, setId] = useState<number>(generateRandomMemeId);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fetchMeme = async (): Promise<IMeme> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const res = await fetch(API_URL);
    return res.json();
  };

  const showNewMeme = () => {
    setId(generateRandomMemeId);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Suspense
        fallback={<p className="meme-text">Loading an awesome meme...</p>}>
        <MemeItem
          fetchMeme={fetchMeme}
          canvasRef={canvasRef}
          memeText={memeText}
          Id={Id}
        />
      </Suspense>
      <Button classname="meme-text" onClick={showNewMeme}>
        <img width={50} src={NextRandomMeme} alt="icon of sin" />
      </Button>
    </div>
  );
};

export default Meme;
