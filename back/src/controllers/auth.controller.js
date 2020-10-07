const jwt = require("jsonwebtoken");
const UserService = require('../services/user.service');

class ContactController {

  async login (req, resp) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const response = await UserService.validateCredentials(email, password);
      if (response.valid) {
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        const { exp } = jwt.decode(token);
        const userData = await UserService.existingEmail(email);
        return resp
          .status(200)
          .send({ 
            token: token,
            expires: new Date(exp * 1000),
            user: userData
          });
      } else {
        resp.status(401).send({
          msg: response.msg,
          code: 401
        });
      }
    } catch (error) {
      return resp.status(500).send({
        msg: error.message,
        code: 500,
      });
    }
  }
}

module.exports = new ContactController();
