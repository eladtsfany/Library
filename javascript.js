
const myLibrary = [];

function Book(title, author, page_count, is_read) {
    this.title = title; // string
    this.author = author; // string
    this.page_count = page_count; // number
    this.isRead = is_read; // bool

    this.info = () => `${title} by ${author}, ${page_count} pages, ${is_read ? "already read" : "not read yet"}.`
}

Book.prototype.sayHello = () => "Hello world!"

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
// Add 35 temporary test books:
for (let i = 1; i < 36; i++) {
    const temp = new Book(`Temp #${i}`, 'Temp Robot', i, true).addBookToLibrary();
}

// prototype checks
// console.log(Object.getPrototypeOf(harry_potter) === Book.prototype);
// console.log(Object.getPrototypeOf(mr_moonie) === Book.prototype);
// console.log(Object.getPrototypeOf(Book.prototype) === Object.prototype);
// console.log(mr_moonie.valueOf());
// console.log(Book.prototype);

const library = document.querySelector('.library table tbody');

// parse the current library to an html without using the .info - (each row has its own columns).
function viewLibrary() {
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
        remove_btn_td.className = 'last-cell centered '
        //event listeners
        remove_btn.addEventListener('click', removeRow);
        remove_btn_td.appendChild(remove_btn);
        tr.appendChild(title_td);
        tr.appendChild(author_td);
        tr.appendChild(pages_td);
        tr.appendChild(isRead_td);
        tr.appendChild(remove_btn_td);
        library.appendChild(tr);
    })
}

function removeRow(event) {
    // tr>td>button // parent>parent>this
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
    // if open then close it.
    if (dialog_add.open) {
        dialog_add.close();
        console.log("Add book dialog closed");
    }
    // if not then close any others shown and open this
    else {
        if (dialog_filter.open || dialog_suggested.open) {
            dialog_filter.open ? dialog_filter.close() : dialog_suggested.close();
            console.log("Closed current open dialog");
        }
        dialog_add.show();
        console.log("Add book dialog open");
    }
});

dialog_filter_btn.addEventListener('click', () => {
    // if open then close it.
    if (dialog_filter.open) {
        dialog_filter.close();
        console.log("Filter books dialog closed");
    }
    // if not then close any others shown and open this
    else {
        if (dialog_add.open || dialog_suggested.open) {
            dialog_add.open ? dialog_add.close() : dialog_suggested.close();
            console.log("Closed current open dialog");
        }
        dialog_filter.show();
        console.log("Filter books dialog open");
    }

});

dialog_suggested_btn.addEventListener('click', () => {
    // if open then close it.
    if (dialog_suggested.open) {
        dialog_suggested.close();
        console.log("Suggested books dialog closed");
    }
    // if not then close any others shown and open this
    else {
        if (dialog_filter.open || dialog_add.open) {
            dialog_add.open ? dialog_add.close() : dialog_filter.close();
            console.log("Closed current open dialog");
        }
        dialog_suggested.show();
        console.log("Suggested books dialog open");
    }
});


viewLibrary();



