import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";

export const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "300", "700", "800"],
});
export const bodyText = localFont({
    src: "../Spiegel-OTF/Spiegel-Regular.otf"
})
export const subTitle = localFont({
    src: "../BeaufortForLoL-OTF/BeaufortforLOL-Medium.otf"
})

export const logo = localFont({
    src: "../hackone-x-01-font/HackoneX01Demo-MV6DJ.ttf"
})

export const mainTitle = localFont({
    src: "../mate-sc-font/MateScRegular-7y9E.ttf"
})