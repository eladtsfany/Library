class Book {
    constructor(title, author, pageCount, isRead) {
        this.title = title; // string
        this.author = author; // string
        this.pageCount = pageCount; // number
        this.isRead = isRead; // bool
    }

    get info() {
        return `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.isRead ? "already read" : "not read yet"}.`
    }

    // A book function that can be used to add self to wanted a library.
    addBookToLibrary(library) {
        library.books.push(this);
    }
}

class Library {
    constructor() {
        this.books = [];
        // the DOM element to insert the library into
        this.tableElement = document.querySelector('.library table tbody');
    }

    addBookToLibrary(book) {
        this.books.push(book);
    }

    // Triggered upon clicking on [-] (last cell remove symbol).
    removeBook(e) {
        // console.log(e.target.parentElement.parentElement.firstChild);
        // Each row act as a book.
        const parentRow = e.target.parentElement.parentElement;
        const rowTitle = parentRow.firstChild.textContent;
        const bookIndex = this.books.findIndex(book => (book.title === rowTitle));
        this.books.splice(bookIndex, 1);
        parentRow.parentNode.removeChild(parentRow);
    }

    clearTableElement() {
        if (this.tableElement)
            while (this.tableElement.hasChildNodes()) {
                this.tableElement.removeChild(this.tableElement.firstChild);
            }
    }

    viewLibrary() {
        // clear prev book rows
        this.clearTableElement();
        // parse in console as a table
        console.table(this.books);
        // parse inside the table element
        this.books.forEach(book => {
            const tr = document.createElement('tr');
            const title_td = document.createElement('td');
            const author_td = document.createElement('td');
            const pages_td = document.createElement('td');
            const isRead_td = document.createElement('td');
            const remove_btn = document.createElement('button');
            const remove_btn_td = document.createElement('td');
            //creating table data cells
            title_td.textContent = book.title;
            author_td.textContent = book.author;
            pages_td.textContent = book.pageCount;
            isRead_td.textContent = book.isRead;
            remove_btn.textContent = '-';
            //adding classes to relevant cells
            pages_td.classList.add('centered');
            isRead_td.classList.add('centered');
            remove_btn.classList.add('remove-btn');
            remove_btn_td.className = 'last-cell centered';
            //event listeners
            remove_btn.addEventListener('click', (e) => { myLibrary.removeBook(e) });
            remove_btn_td.appendChild(remove_btn);
            tr.appendChild(title_td);
            tr.appendChild(author_td);
            tr.appendChild(pages_td);
            tr.appendChild(isRead_td);
            tr.appendChild(remove_btn_td);
            this.tableElement.appendChild(tr);
        })
    }
}

const myLibrary = new Library();

const tempBooks = [
    new Book('Harry Potter', 'J.K Rowling', 446, false),
    new Book("Elad's Life", 'Elad Tsfany', 114, true),
    new Book('The Wonderful Wizard of Oz', 'L. Frank Baum', 272, false),
    new Book('Rich Dad, Poor Dad', 'Robert T. Kiyosaki', 336, true)
];
tempBooks.forEach(book => { myLibrary.addBookToLibrary(book) });

// // Add 10 temporary test books:
// for (let i = 1; i < 11; i++) {
//     myLibrary.addBookToLibrary(new Book(`Temp #${i}`, 'Temp Robot', i, true));
// }

// Handling dialogs:
const dialog_add = document.getElementById('dialog-add');
const dialog_add_btn = document.querySelector('button.dialog-add-btn');
const dialog_filter = document.getElementById('dialog-filter');
const dialog_filter_btn = document.querySelector('button.dialog-filter-btn');
const dialog_suggested = document.getElementById('dialog-suggested');
const dialog_suggested_btn = document.querySelector('button.dialog-suggested-btn');


// Toggle dialogs:
function toggleDialog(dialog) {
    if (dialog.open) console.log(`${dialog.id} already opened`);
    else {
        closeOtherDialogs();
        dialog.show();
        dialog.style.display = 'flex';
        console.log(`${dialog.id} opened`);
    }
}

function closeOtherDialogs() {
    if (dialog_add.open) {
        dialog_add.style.display = 'none';
        dialog_add.close();
        console.log("dialog-add closed");
    }
    else if (dialog_filter.open) {
        dialog_filter.style.display = 'none';
        dialog_filter.close();
        console.log("dialog-filter closed");
    }
    else if (dialog_suggested.open) {
        dialog_suggested.style.display = 'none';
        dialog_suggested.close();
        console.log("dialog-suggested closed");
    }
}

dialog_add_btn.addEventListener('click', () => { toggleDialog(dialog_add) });
dialog_filter_btn.addEventListener('click', () => { toggleDialog(dialog_filter) });
dialog_suggested_btn.addEventListener('click', () => { toggleDialog(dialog_suggested) });


const form = dialog_add.querySelector("form[action='dialog']");
const form_submit_btn = form.querySelector("button[type='submit']");
form_submit_btn.addEventListener('click', addInputBook);

function addInputBook(e) {
    e.preventDefault();
    if (form.checkValidity()) {
        // Capture inputs 
        const inputTitle = form.querySelector('#input-title').value;
        const inputAuthor = form.querySelector('#input-author').value;
        const inputPages = form.querySelector('#input-pages').value;
        const inputRead = form.querySelector('#input-read').checked;

        // Create book
        const inputBook = new Book(inputTitle, inputAuthor, inputPages, inputRead);
        console.log(inputBook.info);

        // Add book to library
        myLibrary.addBookToLibrary(inputBook);

        // Update table element
        myLibrary.viewLibrary();
    }
    else {
        alert('FORM VALIDATION FAILED');
        console.log('FORM VALIDATION FAILED');
        // Check what failed and act accordingly

    }
}

// Show books collection inside the table:
myLibrary.viewLibrary();

