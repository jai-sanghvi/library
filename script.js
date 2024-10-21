const myLibrary = [
  {
    name: 'Atomic habits',
    author: 'James Clear',
    pages: 240,
    isRead: 'yes'
  },
  {
    name: 'The power of habit',
    author: 'Charles duhigg',
    pages: 350,
    isRead: 'no'
  }
];

function Book(name, author, pages, isRead) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Get the form element
const form = document.querySelector('form[method="dialog"]');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  dialog.close();

  const formData = new FormData(form);
  form.reset();
  addBookToLibrary(formData);
});

function addBookToLibrary(formData) {
  let args = [];
  for (let [key, value] of formData.entries()) {
    args.push(value);
  }

  const bookObj = new Book(...args);

  myLibrary.push(bookObj);
  displayBooks();
}

let table = document.querySelector('table.library');

function displayBooks() {
  while (table.children.length > 1) {
    table.removeChild(table.lastElementChild);
  }

  for (let book of myLibrary) {
    let row = document.createElement('tr');

    let name = document.createElement('td');
    name.textContent = book.name;
    row.appendChild(name);

    let author = document.createElement('td');
    author.textContent = book.author;
    row.appendChild(author);

    let pages = document.createElement('td');
    pages.textContent = book.pages;
    row.appendChild(pages);

    let isRead = document.createElement('td');
    let readStatusCheckbox = document.createElement('input');
    readStatusCheckbox.setAttribute('type', 'checkbox');
    (book.isRead === 'yes') ? readStatusCheckbox.setAttribute('checked', '') : readStatusCheckbox.removeAttribute('checked');
    isRead.appendChild(readStatusCheckbox);
    row.appendChild(isRead);

    let removeButtonContainer = document.createElement('td');
    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.setAttribute('data-index', `${myLibrary.indexOf(book)}`)
    removeButtonContainer.appendChild(removeButton);
    row.appendChild(removeButtonContainer);

    table.appendChild(row);

    removeButton.addEventListener('click', removeBook);

  }
}

document.addEventListener('DOMContentLoaded', displayBooks);

const showModalButton = document.querySelector('#show-modal-button');
const closeModalButton = document.querySelector('#close-modal-button');
const dialog = document.querySelector('dialog');
showModalButton.addEventListener('click', () => dialog.showModal());
closeModalButton.addEventListener('click', () => dialog.close());

function removeBook(e) {
  myLibrary.splice(e.currentTarget.dataset.index, 1);
  displayBooks();
}