import { useState, useEffect } from "react";
import "./App.css";
import { useDictionary } from "./hooks/useDictionary";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WordDisplay from "./components/WordDisplay";
import Examples from "./components/Examples";
import Synonyms from "./components/Synonyms";
import Footer from "./components/Footer";

function App() {
  const [input, setInput] = useState("form");
  const {
    data,
    synonyms,
    audio,
    loading,
    error,
    searchText,
    playAudio,
  } = useDictionary();

  useEffect(() => {
    const filteredText = input.toLowerCase().replace(/[^A-Z0-9]/gi, "");
    searchText(filteredText);
  }, []);

  const handleSearch = () => {
    if (input !== "") {
      const filteredText = input.toLowerCase().replace(/[^A-Z0-9]/gi, "");
      searchText(filteredText);
    }
  };

  const handleSynonymClick = (synonym) => {
    setInput(synonym);
    const filteredText = synonym.toLowerCase().replace(/[^A-Z0-9]/gi, "");
    searchText(filteredText);
  };

  return (
    <div className="App">
      <div className="above">
        <Header />
        <SearchBar
          input={input}
          setInput={setInput}
          onSearch={handleSearch}
          loading={loading}
        />
        {error && <div className="error_message">{error}</div>}
      </div>

      {!error && (data.word || loading) && (
        <>
          <WordDisplay
            data={data}
            audio={audio}
            onPlayAudio={playAudio}
            loading={loading}
          />

          {!loading && (
            <div className="output__container">
              <Examples example={data.example} />
              <Synonyms
                synonyms={synonyms}
                onSynonymClick={handleSynonymClick}
              />
            </div>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;

