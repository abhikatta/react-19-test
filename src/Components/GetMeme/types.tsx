export interface IMeme {
  success: true;
  data: {
    memes: [
      {
        id: string;
        name: string;
        url: string;
        width: number;
        height: number;
        box_count: number;
        captions: number;
      }
    ];
  };
}

export interface MemeText {
  topText: string;
  bottomText: string;
}
