function Examples({ example }) {
  if (!example) {
    return null;
  }

  return (
    <div className="examples">
      <div className="examples__title">Example</div>
      <div className="examples__content">{example}</div>
    </div>
  );
}

export default Examples;

