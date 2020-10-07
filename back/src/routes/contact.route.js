const express = require('express');
const ContactController = require('../controllers/contact.controller');

const ContactRouter = express.Router();
ContactRouter.post('/', ContactController.createContact);
ContactRouter.get('/', ContactController.getAllContacts);
ContactRouter.put('/:id', ContactController.editContact);
ContactRouter.get('/:id', ContactController.getContact);
ContactRouter.delete('/:id', ContactController.deleteContact);

module.exports = ContactRouter;