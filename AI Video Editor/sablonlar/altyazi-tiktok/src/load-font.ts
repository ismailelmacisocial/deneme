import { continueRender, delayRender } from "remotion";
// Türkçe karakter (ş, ğ, ı, İ, ö, ü, ç) destekli yazı tipi.
// Orijinal şablondaki TheBoldFont bu harfleri içermiyordu.
import "@fontsource/montserrat/900.css";

export const TheBoldFont = `Montserrat`;

let loaded = false;

export const loadFont = async (): Promise<void> => {
  if (loaded) {
    return Promise.resolve();
  }
  const waitForFont = delayRender();
  loaded = true;
  await document.fonts.load(`900 120px Montserrat`, "ŞĞİıÖÜÇ");
  continueRender(waitForFont);
};
