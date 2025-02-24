class Directory {
    constructor() {
        this.contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        this.currentId = this.contacts.length > 0 ? 
            Math.max(...this.contacts.map(c => c.id)) + 1 : 1;
        this.editingId = null;
        this.init();
    }

    init() {
        // DOM Elements
        this.contactsList = document.getElementById('contactsList');
        this.addButton = document.getElementById('addButton');
        this.modal = document.getElementById('formModal');
        this.form = document.getElementById('contactForm');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.searchInput = document.getElementById('searchInput');
        this.modalTitle = document.getElementById('modalTitle');

        // Event Listeners
        this.addButton.addEventListener('click', () => this.showModal());
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.cancelBtn.addEventListener('click', () => this.hideModal());
        this.searchInput.addEventListener('input', () => this.handleSearch());

        // Initial render
        this.renderContacts();
    }

    showModal(contact = null) {
        this.modal.style.display = 'block';
        this.modalTitle.textContent = contact ? 'Edit Contact' : 'Add New Contact';
        if (contact) {
            this.editingId = contact.id;
            document.getElementById('name').value = contact.name;
            document.getElementById('email').value = contact.email;
            document.getElementById('phone').value = contact.phone;
        } else {
            this.editingId = null;
            this.form.reset();
        }
    }

    hideModal() {
        this.modal.style.display = 'none';
        this.form.reset();
        this.editingId = null;
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        const contact = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone')
        };

        if (this.editingId) {
            this.updateContact(this.editingId, contact);
        } else {
            this.addContact(contact);
        }

        this.hideModal();
        this.renderContacts();
    }

    addContact(contact) {
        contact.id = this.currentId++;
        this.contacts.push(contact);
        this.saveToLocalStorage();
        this.showNotification('Contact added successfully!');
    }

    updateContact(id, updatedContact) {
        const index = this.contacts.findIndex(c => c.id === id);
        if (index !== -1) {
            this.contacts[index] = { ...updatedContact, id };
            this.saveToLocalStorage();
            this.showNotification('Contact updated successfully!');
        }
    }

    deleteContact(id) {
        if (confirm('Are you sure you want to delete this contact?')) {
            this.contacts = this.contacts.filter(c => c.id !== id);
            this.saveToLocalStorage();
            this.renderContacts();
            this.showNotification('Contact deleted successfully!');
        }
    }

    handleSearch() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const filteredContacts = this.contacts.filter(contact => 
            contact.name.toLowerCase().includes(searchTerm) ||
            contact.email.toLowerCase().includes(searchTerm) ||
            contact.phone.toLowerCase().includes(searchTerm)
        );
        this.renderContacts(filteredContacts);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    saveToLocalStorage() {
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }

    renderContacts(contactsToRender = this.contacts) {
        this.contactsList.innerHTML = contactsToRender.length === 0 
            ? '<div class="empty-state">No contacts found. Click the "Add Contact" button to create one.</div>'
            : contactsToRender
                .map(contact => `
                    <div class="contact-card">
                        <h3>${contact.name}</h3>
                        <p><span class="material-icons">email</span> ${contact.email}</p>
                        <p><span class="material-icons">phone</span> ${contact.phone}</p>
                        <div class="contact-actions">
                            <button class="action-btn" onclick="directory.showModal(${JSON.stringify(contact)})">
                                <span class="material-icons">edit</span>
                            </button>
                            <button class="action-btn" onclick="directory.deleteContact(${contact.id})">
                                <span class="material-icons">delete</span>
                            </button>
                        </div>
                    </div>
                `).join('');
    }
}

// Initialize the directory
const directory = new Directory();
