import { useEffect, useRef, useState } from 'react';
import noteService from './services/notes';
import loginService from './services/login';
import './App.css';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Togglable from './components/Toggleable';
import NoteForm from './components/NoteForm';
import Notification from './components/Notification';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import { useDispatch } from 'react-redux';
import { initializeNotes } from './reducers/noteReducer';

const App = (props) => {
    const [errorMessage, setErrorMessage] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const noteFormRef = useRef();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeNotes());
    }, [dispatch]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem(
                'loggedNoteappUser',
                JSON.stringify(user)
            );
            noteService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            setErrorMessage('Wrong credentials');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />

            {user === null ? (
                <Togglable buttonLabel="login">
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) =>
                            setUsername(target.value)
                        }
                        handlePasswordChange={({ target }) =>
                            setPassword(target.value)
                        }
                        handleSubmit={handleLogin}
                    />
                </Togglable>
            ) : (
                <div>
                    <p>{user.name} logged in</p>
                    <Togglable buttonLabel="new note" ref={noteFormRef}>
                        <NoteForm />
                    </Togglable>

                    <VisibilityFilter />
                    <Notes />
                </div>
            )}
            <Footer />
        </div>
    );
};

export default App;
