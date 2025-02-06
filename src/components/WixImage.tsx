
import { ImgHTMLAttributes } from "react";
import {media as wixmedia} from "@wix/sdk";

type  WixImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height" | "alt"
> & {
    mediaIdentifier : string | undefined;
    placeholder? : string;
    alt?: string| null| undefined;

} & ({
    scaleToFill?: true;
    width: number;
    height: number;
}
 | {
    scaleToFill: false;
});

export default function WixImage({mediaIdentifier,
    placeholder = "/placeholder.png",
    alt,
    ...props

}: WixImageProps) {
    const imageUrl = mediaIdentifier
    ? props.scaleToFill || props.scaleToFill === undefined
    ? wixmedia.getScaledToFillImageUrl(
        mediaIdentifier,
        props.width,
        props.height,
        {}
    )
    : wixmedia.getImageUrl(mediaIdentifier).url
    : placeholder;

    return <img src={imageUrl} alt={alt || ""} {...props}/>;
}