function WordDisplay({ data, audio, onPlayAudio, loading }) {
  if (loading) {
    return (
      <div className="word_container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!data.word) {
    return null;
  }

  return (
    <div className="word_container">
      <div className="word_sound">
        <span className="word_title">{data.word}</span>
        {audio && (
          <span className="word_play">
            <span className="material-symbols-outlined" onClick={onPlayAudio}>
              volume_up
            </span>
          </span>
        )}
      </div>
      <div className="partOfSpeech_definition">
        <div className="part0fSpeech_view">
          {data.partOfSpeech && (
            <span className="part0fSpeech">{data.partOfSpeech}</span>
          )}
          {data.phonetic && <span className="view">{data.phonetic}</span>}
        </div>
        {data.definition && (
          <p className="definition">
            <span className="definition__content">{data.definition}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default WordDisplay;

