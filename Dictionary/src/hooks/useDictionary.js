import { useState } from "react";

const initialData = {
  word: "",
  audio: "",
  partOfSpeech: "",
  phonetic: "",
  definition: "",
  example: "",
};

export const useDictionary = () => {
  const [data, setData] = useState(initialData);
  const [synonyms, setSynonyms] = useState([]);
  const [audio, setAudio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchText = (text) => {
    setLoading(true);
    setError("");
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Word not found. Please try another word.");
        }
        return res.json();
      })
      .then((data) => {
        getSentData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Something went wrong. Please try again.");
        setLoading(false);
        setData(initialData);
        setSynonyms([]);
        setAudio("");
      });
  };

  const getSentData = (result) => {
    const word = result[0].word;
    const phonetic = result[0].phonetic || "";

    // Find audio from phonetics array
    let aud = "";
    if (result[0].phonetics && result[0].phonetics.length > 0) {
      for (let p of result[0].phonetics) {
        if (p.audio && p.audio !== "") {
          aud = p.audio;
          break;
        }
      }
    }
    setAudio(aud);
    const meanings = result[0].meanings;

    // Find first definition with example
    let found = false;
    for (let i = 0; i < meanings.length && !found; i++) {
      const definitions = meanings[i].definitions;
      for (let j = 0; j < definitions.length && !found; j++) {
        if (definitions[j]?.example !== undefined) {
          const example = definitions[j].example;
          const definition = definitions[j].definition;
          const partOfSpeech = meanings[i].partOfSpeech;

          setData({
            word: word,
            partOfSpeech: partOfSpeech,
            phonetic: phonetic,
            definition: definition,
            example: example,
          });
          found = true;
        }
      }
    }

    // If no example found, use first definition
    if (!found && meanings.length > 0 && meanings[0].definitions.length > 0) {
      setData({
        word: word,
        partOfSpeech: meanings[0].partOfSpeech,
        phonetic: phonetic,
        definition: meanings[0].definitions[0].definition,
        example: meanings[0].definitions[0].example || "",
      });
    }

    // Collect all synonyms
    let syn = [];
    for (let i = 0; i < meanings.length; i++) {
      if (meanings[i].synonyms && meanings[i].synonyms.length > 0) {
        syn = [...syn, ...meanings[i].synonyms];
      }
    }
    // Remove duplicates
    setSynonyms([...new Set(syn)]);
  };

  const playAudio = () => {
    if (audio) {
      const audioPlayer = new Audio(audio);
      audioPlayer.play().catch((err) => {
        console.log("Audio playback failed:", err);
      });
    }
  };

  return {
    data,
    synonyms,
    audio,
    loading,
    error,
    searchText,
    playAudio,
  };
};

