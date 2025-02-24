document.getElementById('addButton').addEventListener('click', function() {
    const entryInput = document.getElementById('entry');
    const newEntry = entryInput.value.trim();
    if (newEntry) {
        const li = document.createElement('li');
        li.textContent = newEntry;
        document.getElementById('directoryList').appendChild(li);
        entryInput.value = '';
    }
});
