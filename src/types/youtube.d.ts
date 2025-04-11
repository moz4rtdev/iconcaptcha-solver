interface YT {
  Player: {
    new (elementId: string, config: {
      videoId: string;
      events?: {
        onReady?: (event: { target: any }) => void;
        onStateChange?: (event: { data: number }) => void;
        onError?: (event: any) => void;
      };
    }): any;
  };
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

declare global {
  var YT: YT;
  var onYouTubeIframeAPIReady: (() => void) | null;
}