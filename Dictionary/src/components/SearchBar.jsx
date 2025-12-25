function SearchBar({ input, setInput, onSearch, loading }) {
  const handleKeyUp = (e) => {
    if (e.key === "Enter" && input !== "" && !loading) {
      onSearch();
    }
  };

  return (
    <div className="inputs_container">
      <div className="input_box">
        <input
          type="text"
          placeholder="Search a Word"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={handleKeyUp}
          disabled={loading}
        />
      </div>
      <div className="btn">
        <button className="submit_btn" onClick={onSearch} disabled={loading}>
          {loading ? "..." : "Search"}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

