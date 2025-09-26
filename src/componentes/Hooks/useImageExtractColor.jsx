import { FastAverageColor } from "fast-average-color";
import { useEffect, useState } from "react";
//este hook permite extraer los colores de las imagenes para que este como background 
export function useImageExtractColor(imgRef,src) {
    const [bgColor,setBgColor] = useState("#e5e7eb");
    useEffect (()=>{
        const fac = new FastAverageColor();
        const img = imgRef.current;
            if(!img) return;
            const handleload = async () => {
                try {
                    const color = await fac.getColorAsync(img);
                    setBgColor (color.hex);
                } catch (error) {
                    console.warn("no se pudo obtener el color promedio usando gris por defecto")
                }
            };
            if(img.complete){
                handleload();
            }else {
                img.addEventListener("load",handleload);
                return() => img.removeEventListener("load",handleload);
            }
    },[src]);
    return bgColor;
}