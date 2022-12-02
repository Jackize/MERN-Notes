const Note = ({ note, handleClick }) => {
    return (
        <li>
            {note.content}
            <button onClick={handleClick} style={{ marginLeft: '10px' }}>
                {note.important ? 'make none important' : 'make important'}
            </button>
        </li>
    );
};

export default Note;
