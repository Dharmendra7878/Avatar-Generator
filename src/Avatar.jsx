import React, { useState } from 'react';
import './Avatar.css';
import Axios from 'axios';

const Avatar = () => {
  const [sprite, setSprite] = useState("bottts"); // default style
  const [seed, setSeed] = useState("default");   // default seed

  // Change sprite style
  const handleSprite = (spritetype) => {
    setSprite(spritetype);
  };

  // Generate a random seed
  const handleGenerate = () => {
    const newSeed = Math.random().toString(36).substring(2, 10); // random 8-char seed
    setSeed(newSeed);
  };

  // Download the SVG image
  const downloadImage = () => {
    const url = `https://api.dicebear.com/7.x/${sprite}/svg?seed=${seed}`;
    Axios({
      method: "get",
      url: url,
      responseType: "arraybuffer"
    })
      .then((response) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(
          new Blob([response.data], { type: "image/svg+xml" })
        );
        link.download = `${seed}.svg`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error("Download error:", error);
      });
  };

  return (
    <div className="container">
      <div className="nav">
        <p>Random Avatar Generator</p>
      </div>

      <div className="home">
        <div className="btns">
          <button onClick={() => handleSprite("avataaars")}>Human</button>
          <button onClick={() => handleSprite("pixel-art")}>Pixels</button>
          <button onClick={() => handleSprite("bottts")}>Bots</button>
          <button onClick={() => handleSprite("micah")}>Micah</button>
          <button onClick={() => handleSprite("shapes")}>Shapes</button>
          <button onClick={() => handleSprite("identicon")}>Identi</button>
          <button onClick={() => handleSprite("pixel-art-neutral")}>Alien</button>
        </div>

        <div className="avatar">
          <img
            src={`https://api.dicebear.com/7.x/${sprite}/svg?seed=${seed}`}
            alt="Avatar"
          />
        </div>

        <div className="generate">
          <button id="gen" onClick={handleGenerate}>Next</button>
          <button id="down" onClick={downloadImage}>Download</button>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
