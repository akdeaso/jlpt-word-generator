import React, { useState, useEffect } from "react";
import axios from "axios";

const RandomJapaneseWord = () => {
  const [word, setWord] = useState({});
  const [level, setLevel] = useState("");
  const [isLevelSelected, setIsLevelSelected] = useState(true);

  useEffect(() => {
    if (level) {
      axios
        .get(
          `https://jlpt-vocab-api.vercel.app/api/words/random?level=${level}`
        )
        .then((response) => {
          setWord(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [level]);

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
    setIsLevelSelected(false);
  };

  const handleLevelSelect = () => {
    setIsLevelSelected(true);
    setWord({});
  };

  const handleNewWordClick = () => {
    axios
      .get(`https://jlpt-vocab-api.vercel.app/api/words/random?level=${level}`)
      .then((response) => {
        setWord(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col items-center">
        {word.word ? (
          <>
            <div className="text-8xl font-bold">{word.word}</div>
            <div className="text-3xl font-bold">{word.furigana}</div>
            <div className="text-lg font-light">{word.meaning}</div>
            <div className="text-lg font-light">Level: N{word.level}</div>
            <div className="mt-4 flex flex-col items-center">
              <button
                onClick={handleLevelSelect}
                className="font-bold py-2 px-4 rounded"
              >
                Choose Level
              </button>
              <button
                onClick={handleNewWordClick}
                className="font-bold py-2 mt-2 px-4 rounded"
              >
                Generate New Word
              </button>
            </div>
          </>
        ) : (
          <div className="mt-4 flex flex-col items-center">
            {isLevelSelected ? (
              <>
                <label className="mb-2">Select JLPT Level:</label>
                <select value={level} onChange={handleLevelChange}>
                  <option value="">All Levels</option>
                  <option value="1">N1</option>
                  <option value="2">N2</option>
                  <option value="3">N3</option>
                  <option value="4">N4</option>
                  <option value="5">N5</option>
                </select>
                <button
                  onClick={handleNewWordClick}
                  className="mt-4 font-bold py-2 px-4 rounded"
                >
                  Generate New Word
                </button>
              </>
            ) : (
              <button
                onClick={handleLevelSelect}
                className="font-bold py-2 px-4 rounded"
              >
                Choose Level
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomJapaneseWord;
