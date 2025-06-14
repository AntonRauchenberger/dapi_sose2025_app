import * as React from "react";
import Svg, { Defs, Pattern, Rect } from "react-native-svg";
import constants from "@/app/consts";

export default function BackgroundSvg(props: any) {
    return (
        <Svg viewBox="0 0 400 600" width="100%" height="100%" {...props}>
            <Defs>
                <Pattern
                    id="diagonalStripes"
                    patternUnits="userSpaceOnUse"
                    width="60"
                    height="60"
                    patternTransform="rotate(45)"
                >
                    <Rect
                        x="0"
                        y="0"
                        width="30"
                        height="60"
                        fill={constants.BACKGROUND_COLOR}
                    />
                    <Rect
                        x="30"
                        y="0"
                        width="30"
                        height="60"
                        fill={constants.SECCONDARY_COLOR}
                    />
                </Pattern>
            </Defs>
            <Rect width="400" height="600" fill={constants.FONT_COLOR} />
            <Rect width="400" height="600" fill="url(#diagonalStripes)" />
        </Svg>
    );
}
