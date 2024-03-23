const fs = require('fs');
const path = require('path');

// Zmienna contactsPath przechowuje ścieżkę do pliku contacts.json w folderze db
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Lista kontaktów
function listContacts() {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}

// Pobieranie kontaktu po ID
function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const contact = contacts.find(contact => contact.id === contactId);
    console.log(contact);
  });
}

// Usuwanie kontaktu
function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) throw err;
    let contacts = JSON.parse(data);
    contacts = contacts.filter(contact => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), err => {
      if (err) throw err;
      console.log(`Kontakt o id ${contactId} został usunięty.`);
    });
  });
}

// Dodawanie nowego kontaktu
function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const newContact = { id: Math.max(...contacts.map(contact => contact.id)) + 1, name, email, phone };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), err => {
      if (err) throw err;
      console.log(`Dodano nowy kontakt: ${name}`);
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
