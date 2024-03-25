const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import UUID

// Zmienna contactsPath przechowuje ścieżkę do pliku contacts.json w folderze db
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Lista kontaktów
function listContacts() {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    console.table(contacts); // Wyświetlanie w formie tabeli
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
    const contacts = JSON.parse(data) || []; // Dodano zabezpieczenie na wypadek pustego pliku
    const newContact = { id: uuidv4(), name, email, phone }; // Użycie uuid do generowania ID
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), err => {
      if (err) throw err;
      console.log(`Dodano nowy kontakt: ${name}`);
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
