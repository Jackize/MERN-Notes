import { connect } from 'react-redux';
import { createNote } from '../reducers/noteReducer';
const NoteForm = (props) => {
    const addNote = async (event) => {
        event.preventDefault();
        const content = event.target.note.value;
        event.target.note.value = '';
        props.createNote({ content, important: true });
    };

    return (
        <div className="formDiv">
            <h2>Create a new note</h2>

            <form onSubmit={addNote}>
                <input name="note" />
                <button type="submit">save</button>
            </form>
        </div>
    );
};

export default connect(null, { createNote })(NoteForm);
