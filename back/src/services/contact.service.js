const connection = require("./../config/db.config");

class ContactService {
  createContact(contactData) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "INSERT INTO contact SET ?",
          {
            owner: contactData.owner,
            firstname: contactData.firstname,
            lastname: contactData.lastname,
            phone: contactData.phone,
            createdAt: new Date(Date.now()),
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

  existingPhone(phone, ownerId) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM contact WHERE phone = ? and owner = ?",
          [phone, ownerId],
          (error, result) => {
            if (error) {
                reject(error);
            }
            if (result) {
              resolve(result);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  getAllByOwnerId(ownerId) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM `contact` WHERE `owner` = ?",
          [ownerId],
          (error, result) => {
            if (error) reject(error);
            if (result) resolve(result);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  getContactById(id) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM `contact` WHERE `id` = ?",
          [id],
          (error, result) => {
            if (error) reject(error);
            if (result) resolve(result.shift());
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  EditContact(id, data) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "UPDATE contact SET firstname = ?, lastname = ?, phone = ? WHERE `id` = ?",
          [data.firstname, data.lastname, data.phone, id],
          (error, result) => {
            if (error) reject(error);
            if (result) resolve(result.affectedRows);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteContactById(id) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "DELETE FROM `contact` WHERE `id` = ?",
          [id],
          (error, result) => {
            if (error) reject(error);
            if (result) resolve(result.affectedRows);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new ContactService();
