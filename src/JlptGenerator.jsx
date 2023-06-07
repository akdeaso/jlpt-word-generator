import React, { useState, useEffect } from "react";
import axios from "axios";

function RandomJapaneseWord() {
  const [word, setWord] = useState({});

  useEffect(() => {
    axios
      .get("https://jlpt-vocab-api.vercel.app/api/words/random")
      .then((response) => setWord(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="text-8xl font-bold mb-4">{word.word}</div>
        <div className="text-3xl font-bold mb-2">{word.furigana}</div>
        <div className="text-lg font-light mb-2">{word.meaning}</div>
        <div className="text-lg font-light mb-8">Level: N{word.level}</div>
        <button
          onClick={() => window.location.reload(false)}
          className="font-bold py-2 px-4 rounded"
        >
          Generate New Word
        </button>
      </div>
    </div>
  );
}

export default RandomJapaneseWord;
