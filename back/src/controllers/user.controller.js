const UserService = require('../services/user.service');

class UserController {
    async createUser(req, resp) {
        try {
            const data = req.body;
            const exist = await UserService.existingEmail(data.email);
            if (!exist) {
                await UserService.createUser(data);
                resp.status(202).send(
                    {msg: 'User created !'}
                );
            } else {
                resp.status(409).send({
                    msg: 'User already exists!',
                    status: 409
                });
            }
        } catch (error) {
            resp.status(500).send({
                msg: error.message,
                status: 500
            });
        }
    }
}

module.exports = new UserController();