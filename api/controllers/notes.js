const notesRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const Note = require("../models/note");
const User = require("../models/user");

const getTokenFrom = (request) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        return authorization.substring(7);
    }
    return null;
};

notesRouter.get("/", async (request, response) => {
    const notes = await Note.find({}).populate("user", {
        username: 1,
        name: 1,
    });

    response.json(notes);
});

notesRouter.get("/:id", async (request, response, next) => {
    try {
        const note = await Note.findById(request.params.id);

        if (note) {
            response.json(note.toJSON());
        } else {
            response.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});

notesRouter.post("/", async (request, response, next) => {
    try {
        const { content, important } = request.body;

        const token = getTokenFrom(request);
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: "token missing or invalid" });
        }
        const user = await User.findById(decodedToken.id);

        const note = new Note({
            content,
            important,
            date: new Date(),
            user: user._id,
        });

        const savedNote = await note.save();
        user.notes = user.notes.concat(savedNote._id);
        await user.save();

        response.status(201).json(savedNote);
    } catch (error) {
        next(error);
    }
});

notesRouter.delete("/:id", async (request, response) => {
    Note.findByIdAndRemove(request.params.id)
        .then((result) => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

notesRouter.put("/:id", (request, response, next) => {
    const body = request.body;

    const note = {
        content: body.content,
        important: body.important,
    };

    Note.findByIdAndUpdate(request.params.id, note, { new: true, runValidators: true, context: 'query' })
        .then((updatedNote) => {
            response.json(updatedNote);
        })
        .catch((error) => next(error));
});

module.exports = notesRouter;
