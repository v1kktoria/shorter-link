import { Transform } from "class-transformer";

export function NormalizeUrl(defaultProtocol: string = "https://") {
  return Transform(({ value }) => {
    if (typeof value !== 'string') return value;
    
    let url = value.trim();
    
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      if (url.includes(".") && !url.includes(" ")) {
        url = defaultProtocol + url;
      }
    }
    
    return url;
  });
}