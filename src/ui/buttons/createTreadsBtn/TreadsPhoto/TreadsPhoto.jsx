import styles from "./TreadsPhoto.module.css"
import { useState } from "react";

const TreadsPhoto = ({ src }) => {
    const [newWidth, setNewWidth] = useState(null)
    const [newHeight, setNewHeight] = useState(null)

    const style = {
        width: newWidth,
        height:newHeight
    }

    const imgElement = document.createElement('img');
  
    imgElement.onload = function () {
      const width = this.width;
      const height = this.height;
  
      setNewWidth(width)
      setNewHeight(height)
      console.log(`Ширина изображения: ${width}px`);
      console.log(`Высота изображения: ${height}px`);
    };
  
    imgElement.src = src;
  
    return <img   src={src} alt="" />;
  };
  
  export default TreadsPhoto;
