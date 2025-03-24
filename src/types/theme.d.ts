declare interface Window {
  matchMedia(query: string): {
    matches: boolean;
    addEventListener: (type: string, listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void) => void;
    removeEventListener: (type: string, listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void) => void;
  };
} 