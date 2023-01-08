import React from "react";
import { SvgXml } from "react-native-svg";

export default function SvgComponent_Mine(props) {

    const {svgMarkup} = props;

    

const SVGimage=()=><SvgXml xml={svgMarkup} width="250" height="250" />

return <SVGimage/>;
}