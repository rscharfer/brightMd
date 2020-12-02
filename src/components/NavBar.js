export function NavBar({
  mode,
  title,
  subtitle,
  saveHandler,
  cancelHandler,
  editHandler,
}) {
  return (
    <div className="headerWrapper">
      <header>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </header>
      <div>
        {mode === "edit" ? (
          <>
            <button className="cancelButton" onClick={cancelHandler}>
              Cancel
            </button>
            <button className="saveButton" onClick={saveHandler}>
              Save
            </button>
          </>
        ) : (
          <button onClick={editHandler}>Edit</button>
        )}
      </div>
    </div>
  );
}
