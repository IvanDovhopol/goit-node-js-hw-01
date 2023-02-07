const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

require('colors');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const contacts = await parseData();
    console.table(contacts);
  } catch (error) {
    console.log(`\x1B[31m${error.message}`);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await parseData();
    const result = contacts.find(contact => contact.id === contactId);

    if (!result) {
      console.log('Contact not found'.red);
      return null;
    }

    console.log(result);
  } catch (error) {
    console.log(`\x1B[31m${error.message}`);
  }
};

const addContact = async newContact => {
  try {
    const contacts = await parseData();

    const data = { id: v4(), ...newContact };
    contacts.push(data);
    console.log(data);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(`\x1B[31m${error.message}`);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await parseData();
    const index = contacts.findIndex(contact => contact.id === contactId);

    if (index === -1) {
      console.log('Contact not found'.red);
      return null;
    }

    const [contactDeleted] = contacts.splice(index, 1);
    console.log(contactDeleted);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contactDeleted;
  } catch (error) {
    console.log(`\x1B[31m${error.message}`);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

async function parseData() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(`\x1B[31m${error.message}`);
  }
}
