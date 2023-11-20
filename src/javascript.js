
const myLibrary = [];

function Book(title, author, page_count, is_read) {
    this.title = title; // string
    this.author = author; // string
    this.page_count = page_count; // number
    this.isRead = is_read; // bool

    this.info = () => `${title} by ${author}, ${page_count} pages, ${is_read ? "already read" : "not read yet"}.`
}

// An outer function that adding a book to the library
function addBookToLibrary(book) {
    myLibrary.push(book);
}
// A book prototype function that can be used across all books to add self to the library.
Book.prototype.addBookToLibrary = function () {
    myLibrary.push(this);
}

const harry_potter = new Book('Harry Potter', 'J.K Rowling', 446, false).addBookToLibrary();
const mr_moonie = new Book("Elad's Life", 'Elad Tsfany', 114, true).addBookToLibrary();
const wizard_of_oz = new Book('The Wonderful Wizard of Oz', 'L. Frank Baum', 272, false).addBookToLibrary();
const rich_poor_dad = new Book('Rich Dad, Poor Dad', 'Robert T. Kiyosaki', 336, true).addBookToLibrary();

// // Add 15 temporary test books:
// for (let i = 1; i < 16; i++) {
//     const temp = new Book(`Temp #${i}`, 'Temp Robot', i, true).addBookToLibrary();
// }

// prototype checks
// console.log(Object.getPrototypeOf(harry_potter) === Book.prototype);
// console.log(Object.getPrototypeOf(mr_moonie) === Book.prototype);
// console.log(Object.getPrototypeOf(Book.prototype) === Object.prototype);
// console.log(mr_moonie.valueOf());
// console.log(Book.prototype);

const library = document.querySelector('.library table tbody');

// parse the current library to an html without using the .info - (each row has its own columns).
function viewLibrary() {
    // clear prev book rows
    clearTable();
    // parse in console as a table
    console.table(myLibrary);
    // parse inside the html's table
    myLibrary.forEach(book => {
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
        pages_td.textContent = book.page_count;
        isRead_td.textContent = book.isRead;
        remove_btn.textContent = '-';
        //adding classes to relevant cells
        pages_td.classList.add('centered');
        isRead_td.classList.add('centered');
        remove_btn.classList.add('remove-btn');
        remove_btn_td.className = 'last-cell centered';
        //event listeners
        remove_btn.addEventListener('click', removeBook);
        remove_btn_td.appendChild(remove_btn);
        tr.appendChild(title_td);
        tr.appendChild(author_td);
        tr.appendChild(pages_td);
        tr.appendChild(isRead_td);
        tr.appendChild(remove_btn_td);
        library.appendChild(tr);
    })
}

function clearTable() {
    while (library.hasChildNodes()) {
        library.removeChild(library.firstChild);
    }
}

function removeBook(event) {
    console.log(event.target.parentElement.parentElement.firstChild);
    const row_title = event.target.parentElement.parentElement.firstChild.textContent;
    console.log(myLibrary);
    const book_index = myLibrary.findIndex(book => (book.title === row_title));
    myLibrary.splice(book_index, 1);
    console.log(myLibrary);

    // logic : tr>td>button // parent>parent>this
    const parentRow = event.target.parentElement.parentElement;
    parentRow.parentNode.removeChild(parentRow);
}

// Handling right side dialogs:
const dialog_add = document.getElementById('dialog-add');
const dialog_add_btn = document.querySelector('button.dialog-add-btn');
const dialog_filter = document.getElementById('dialog-filter');
const dialog_filter_btn = document.querySelector('button.dialog-filter-btn');
const dialog_suggested = document.getElementById('dialog-suggested');
const dialog_suggested_btn = document.querySelector('button.dialog-suggested-btn');


// Toggle dialogs:
dialog_add_btn.addEventListener('click', () => {
    if (dialog_add.open) {
        // if open then close it.
        // dialog_add.style.display = 'none';
        // dialog_add.close();
        // console.log("Add book dialog closed");
        console.log("Add book dialog alrady opened");
    }
    // if not then close any others shown and open this
    else {
        if (dialog_filter.open) {
            dialog_filter.style.display = 'none';
            dialog_filter.close();
            console.log("Filter book dialog closed");
        }
        else {
            dialog_suggested.style.display = 'none';
            dialog_suggested.close();
            console.log("Suggested books dialog closed");
        }
        dialog_add.show();
        dialog_add.style.display = 'flex';
        console.log("Add book dialog open");
    }
});

dialog_filter_btn.addEventListener('click', () => {
    if (dialog_filter.open) {
        // if open then close it.
        // dialog_filter.close();
        // dialog_filter.style.display = 'none';
        // console.log("Filter books dialog closed");
        console.log("Filter book dialog alrady opened");
    }
    else {
        if (dialog_add.open) {
            // if not then close any others shown and open this
            // dialog_add.style.display = 'none';
            // dialog_add.close();
            // console.log("Add book dialog closed");
            console.log("Add book dialog already opened");
        }
        else {
            dialog_suggested.style.display = 'none';
            dialog_suggested.close();
            console.log("Suggested books dialog closed");
        }
        dialog_filter.show();
        dialog_filter.style.display = 'block';
        console.log("Filter books dialog open");
    }
}
);

dialog_suggested_btn.addEventListener('click', () => {
    if (dialog_suggested.open) {
        // if open then close it.
        // dialog_suggested.close();
        // dialog_suggested.style.display = 'none';
        // console.log("Suggested books dialog closed");
        console.log("Suggested books dialog already opened");
    }
    // if not then close any others shown and open this
    else {
        if (dialog_add.open) {
            dialog_add.style.display = 'none';
            dialog_add.close();
            console.log("Add book dialog closed");
        }
        else {
            dialog_filter.style.display = 'none';
            dialog_filter.close();
            console.log("Filter books dialog closed");
        }
        dialog_suggested.show();
        dialog_suggested.style.display = 'block';
        console.log("Suggested books dialog open");
    }
});

const form_submit_btn = dialog_add.querySelector("form button[type='submit']");
form_submit_btn.addEventListener('click', addInputBook);

function addInputBook(e) {
    e.preventDefault();
    //capture inputs 
    const input_title = dialog_add.querySelector('form #input-title').value;
    const input_author = dialog_add.querySelector('form #input-author').value;
    const input_pages = dialog_add.querySelector('form #input-pages').value;
    const input_read = dialog_add.querySelector('form #input-read').checked;

    //create book
    const inputBook = new Book(input_title, input_author, input_pages, input_read);
    inputBook.info();

    //add book to library
    // inputBook.addBookToLibrary();
    addBookToLibrary(inputBook);

    //show updated library
    viewLibrary();
}

viewLibrary();




