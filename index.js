const yargs = require('yargs');
const contacts = require('./contacts');

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts();
      break;
    case 'get':
      contacts.getContactById(id);
      break;
    case 'add':
      contacts.addContact(name, email, phone);
      break;
    case 'remove':
      contacts.removeContact(id);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

const argv = yargs
  .command('list', 'Display all contacts')
  .command('get', 'Get a contact by id', {
    id: {
      describe: 'Contact ID',
      demandOption: true,
      type: 'number',
    },
  })
  .command('add', 'Add a new contact', {
    name: { describe: 'Contact name', demandOption: true, type: 'string' },
    email: { describe: 'Contact email', demandOption: true, type: 'string' },
    phone: { describe: 'Contact phone', demandOption: true, type: 'string' },
  })
  .command('remove', 'Remove a contact', {
    id: {
      describe: 'Contact ID',
      demandOption: true,
      type: 'number',
    },
  })
  .help()
  .alias('help', 'h')
  .argv;

invokeAction(argv);


