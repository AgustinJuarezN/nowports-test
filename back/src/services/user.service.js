const bcrypt = require("bcrypt");
const connection = require("./../config/db.config");

class UserService {
  createUser(userData) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "INSERT INTO user SET ?",
          {
            firstname: userData.firstname,
            lastname: userData.lastname,
            createdAt: new Date(Date.now()),
            email: userData.email,
            password: bcrypt.hashSync(userData.password, 10),
          },
          (error, result) => {
            if (error) reject(error);
            if (result) resolve();
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  existingEmail(email) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM user WHERE email = ?",
          [email],
          (error, result) => {
            if (error) {
                reject(error);
            }
            if (result) {
                resolve(result[0]);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  validateCredentials(email , password) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM user WHERE email = ?",
          [email],
          async (error, result) => {
            if (error) {
                reject(error);
            }
            if (result) {
              if (result.length) {
                const passwordEncrypted = result.shift().password;
                if (bcrypt.compareSync(password, passwordEncrypted)) {
                  resolve({valid: true});
                } else {
                  resolve({valid: false, msg: 'Invalid password!'});
                }
              } else {
                resolve({valid: false, msg: 'User does not exist!'});
              }
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new UserService();
