const Note = require('./note');
const User = require('./user');
const Team = require('./team');
const Membership = require('./membership');

User.hasMany(Note);
Note.belongsTo(User);
User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });
Note.sync({ alter: true });
User.sync({ alter: true });

module.exports = {
    Note,
    User,
    Team,
    Membership,
};
