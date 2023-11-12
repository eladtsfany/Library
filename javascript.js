
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
        title_td.textContent = book.title;
        author_td.textContent = book.author;
        pages_td.textContent = book.page_count;
        isRead_td.textContent = book.isRead;
        tr.appendChild(title_td);
        tr.appendChild(author_td);
        tr.appendChild(pages_td);
        tr.appendChild(isRead_td);
        library.appendChild(tr);
    })
}

viewLibrary();



