const ContactService = require("../services/contact.service");

class ContactController {
    
  async createContact(req, resp) {
    try {
      const data = req.body;
      const results = await ContactService.existingPhone(data.phone, data.owner);
      if(!results.length) {
        await ContactService.createContact(data);
        resp.status(200).send({ msg: "Contact created!" });
      } else {
        resp.status(409).send({
            msg: 'Contact phone already exists!',
            status: 409
        });
      }
    } catch (error) {
      resp.status(500).send({
        msg: error.message,
        status: 500,
      });
    }
  }

  async getAllContacts(req, resp) {
    try {
      let contacts = await ContactService.getAllByOwnerId(req.query.owner);
      if (contacts.length) {
        contacts = contacts.sort((a, b) => {
          let nameA = a.firstname.toLowerCase();
          let nameB = b.firstname.toLowerCase();
          if (nameA < nameB)
            //sort string ascending
            return -1;
          if (nameA > nameB) return 1;

          return 0; //default return value (no sorting)
        });
      }
      resp.status(200).send(contacts);
    } catch (error) {
      resp.status(500).send({
        msg: error.message,
        status: 500,
      });
    }
  }

  async getContact(req, resp) {
    try {
      const contact = await ContactService.getContactById(req.params.id);
      if (contact) {
        resp.status(200).send(contact);
      } else {
        resp.status(404).send({
          msg: "User does not exist!",
        });
      }
    } catch (error) {
      resp.status(500).send({
        msg: error.message,
        status: 500,
      });
    }
  }

  async editContact(req, resp) {
    try {
      const data = req.body;
      const id = req.params.id;
      const updated = await ContactService.EditContact(id, data);
      if (updated) {
        resp.status(200).send({ msg: "Contact updated!" });
      } else {
        resp.status(404).send({
          msg: "User does not exist!",
        });
      }
    } catch (error) {
      resp.status(500).send({
        msg: error.message,
        status: 500,
      });
    }
  }

  async deleteContact(req, resp) {
    try {
      const response = await ContactService.deleteContactById(req.params.id);
      if (response) {
        resp.status(204).send();
      } else {
        resp.status(404).send({
          msg: "User does not exist!",
        });
      }
    } catch (error) {
      resp.status(500).send({
        msg: error.message,
        status: 500,
      });
    }
  }
}

module.exports = new ContactController();
