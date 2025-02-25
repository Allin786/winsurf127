let contacts = [];

function addContact() {
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const location = document.getElementById('location').value;
    if (name && department && location) {
        contacts.push({ name, department, location });
        document.getElementById('name').value = '';
        document.getElementById('department').value = '';
        document.getElementById('location').value = '';
        displayContacts();
    }
}

function displayContacts() {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        contactList.innerHTML += `<div>${contact.name} - ${contact.department} - ${contact.location}</div>`;
    });
}

function searchContacts() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(query) || 
        contact.department.toLowerCase().includes(query) || 
        contact.location.toLowerCase().includes(query)
    );
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    filteredContacts.forEach(contact => {
        contactList.innerHTML += `<div>${contact.name} - ${contact.department} - ${contact.location}</div>`;
    });
}

function showAddContactForm() {
    const form = document.getElementById('add-contact-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}
