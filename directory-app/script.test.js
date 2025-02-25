// script.test.js

// Mocking the contacts array and functions for testing
let contacts = [];

function addContact(name, department, location) {
    contacts.push({ name, department, location });
}

function searchContacts(query) {
    return contacts.filter(contact => 
        contact.name.toLowerCase().includes(query.toLowerCase()) || 
        contact.department.toLowerCase().includes(query.toLowerCase()) || 
        contact.location.toLowerCase().includes(query.toLowerCase())
    );
}

// Test suite
describe('Directory App Tests', () => {
    beforeEach(() => {
        contacts = [];
    });

    test('Adding contacts', () => {
        addContact('John Doe', 'Sales', 'New York');
        expect(contacts.length).toBe(1);
        expect(contacts[0]).toEqual({ name: 'John Doe', department: 'Sales', location: 'New York' });
    });

    test('Searching contacts', () => {
        addContact('Jane Smith', 'Marketing', 'Los Angeles');
        addContact('John Doe', 'Sales', 'New York');
        const results = searchContacts('Jane');
        expect(results.length).toBe(1);
        expect(results[0]).toEqual({ name: 'Jane Smith', department: 'Marketing', location: 'Los Angeles' });
    });

    test('Searching with no results', () => {
        addContact('John Doe', 'Sales', 'New York');
        const results = searchContacts('Marketing');
        expect(results.length).toBe(0);
    });
});
