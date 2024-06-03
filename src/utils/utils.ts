import { Ref, RefObject } from "react";
import { IMeme, InitialState } from "../GetMeme/types";
import { TOTAL_MEME_COUNT } from "../constans/constants";

export const download = async (URL: string, name: string) => {
  try {
    const response = await fetch(URL);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `${name}.png`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading the image:", error);
  }
};

export const generateRandomMemeId = () => {
  return Math.floor(Math.random() * TOTAL_MEME_COUNT);
};
