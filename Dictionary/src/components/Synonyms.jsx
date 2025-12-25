function Synonyms({ synonyms, onSynonymClick }) {
  if (!synonyms || synonyms.length === 0) {
    return null;
  }

  return (
    <div className="synonyms">
      <div className="synonyms__title">synonyms</div>
      <div className="synonyms__content">
        {synonyms.map((synonym, index) => (
          <span
            key={index}
            className="synonyms_each"
            onClick={() => onSynonymClick(synonym)}
          >
            {synonym}
            {index < synonyms.length - 1 && ","}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Synonyms;

