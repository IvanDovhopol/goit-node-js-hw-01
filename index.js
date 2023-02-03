const { program } = require('commander');
const contacts = require('./db/contacts.js');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.log(argv, '\n');
      contacts.listContacts();
      break;

    case 'get':
      console.log(argv, '\n');
      contacts.getContactById(id);
      break;

    case 'add':
      console.log(argv, '\n');
      contacts.addContact({
        name,
        email,
        phone,
      });
      break;

    case 'remove':
      console.log(argv, '\n');
      contacts.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

// invokeAction({ action: 'list' });

// invokeAction({ action: 'get', id: '3' });

// invokeAction({
//   action: 'add',
//   name: 'Ivan Dovhopol',
//   email: 'hello123@gmail.com',
//   phone: '(123) 123-1234',
// });

// invokeAction({ action: 'remove', id: '83c5526f-0dc6-483a-936c-c8c9013eef34' });
