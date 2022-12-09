const router = require('express').Router();

const { tokenExtractor } = require('../util/middleware');
const { Note, User } = require('../models');

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Note,
            attributes: { exclude: ['userId'] },
        },
    });
    res.json(users);
});

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).end();
    }
});

const isAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.decodedToken.id, {
        raw: true,
    });
    if (!user.admin) {
        return res.status(401).json({ error: 'operation not allowed' });
    }
    next();
};
router.put('/:id', tokenExtractor, isAdmin, async (req, res) => {
    let user = await User.findByPk(req.params.id, {
        raw: true,
    });
    if (user) {
        await User.update(
            { ...req.body },
            {
                where: {
                    id: user.id,
                },
            }
        );
        user = { ...user, ...req.body };
        res.json(user);
    } else {
        res.status(404).end();
    }
});

module.exports = router;
