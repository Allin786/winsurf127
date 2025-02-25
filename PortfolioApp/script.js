document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const name = this.elements[0].value;
    const email = this.elements[1].value;
    const message = this.elements[2].value;

    // Simple validation
    if (name && email && message) {
        alert('Thank you for your message!');
        this.reset(); // Reset the form
    } else {
        alert('Please fill in all fields.');
    }
});
