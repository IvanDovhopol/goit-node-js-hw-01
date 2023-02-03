const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');
require('colors');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const contacts = await parseData();
  console.table(contacts);
};

const getContactById = async contactId => {
  const contacts = await parseData();
  const result = contacts.find(contact => contact.id === contactId);
  console.log(result);
};

const addContact = async newContact => {
  const contacts = await parseData();

  const data = { id: v4(), ...newContact };
  contacts.push(data);
  console.log(data);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const removeContact = async contactId => {
  const contacts = await parseData();
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) return null;

  const [contactDeleted] = contacts.splice(index, 1);
  console.log(contactDeleted);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contactDeleted;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

async function parseData() {
  const data = await fs.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(data);
  return contacts;
}
