/// <reference path="book" />
/// <reference path="persistence" />

/**
 * Simple class for managing books using CRUD operations and a filter
 */
class BookManager {
    /**
     * An array holding all the available books
     */
    private books: Array<Book> = new Array<Book>();
    
    /**
     * There persistence layer to save and load the books array
     */
    private persistence: Persistence;
    
    /**
     * BookManager has a dependency to Persistence
     */
    constructor(persistence: Persistence) {
        this.persistence = persistence;
    }
    
    /**
     * Returns -1 if the book is not found, otherwise will return the
     * real array index
     */
    private getArrayPositionFrom(bookId: number): number {
        var result: number = -1;

        this.books.forEach((book, index) => {
            if (book.id === bookId) {
                result = index;
            }
        });

        return result;
    }
    
    /**
     * Returns the highest book id
     */
    private getMaxBookId(): number {
        var max = 0;

        this.books.forEach(book => {
            if (book.id > max) {
                max = book.id;
            }
        });

        return max;
    }
    
    /**
     * Loads the books into the internal storage
     */
    public load(): void {
        this.books = this.persistence.load() || new Array<Book>();
    }
    
    /**
     * Saves the books to the internal storage
     */
    public save(): void {
        this.persistence.save(this.books);
    }
    
    /**
     * Adds a new book to the internal storage
     */
    public newBook(title: string, author: string, isRead: boolean): void {
        var book = new Book();
        book.title = title;
        book.author = author;
        book.id = this.getMaxBookId() + 1;
        book.isRead = !!isRead;
        this.books.push(book);
    }
    
    /**
     * Deletes a book from the internal storage.
     * Returns true if the book was deleted, otherwise false
     */
    public delete(bookId: number): boolean {
        var bookArrayIndex = this.getArrayPositionFrom(bookId);
        
        // If the book is not found, return false
        if (bookArrayIndex === -1) {
            return false;
        }
        
        // remove the book from the array
        this.books.splice(bookArrayIndex, 1);

        return true;
    }
    
    /**
     * Returns a list of all books
     */
    public list(): Array<Book> {
        return this.books;
    }
    
    /**
     * Returns a list of filtered books.
     * Set isRead to true, to get a list of all read books.
     * Set isRead to false, to get a list of non-read books.
     */
    public filter(isRead: boolean): Array<Book> {
        var result: Array<Book> = new Array<Book>();
        
        result = this.books.filter(book => {
            return book.isRead === isRead;
        });

        return result;
    }
    
    /**
     * Sets the read state of a book
     */
    public setReadStateOf(bookId: number, readState: boolean): void {
        var bookArrayIndex = this.getArrayPositionFrom(bookId);
        var book = this.books[bookArrayIndex];
        
        if (!book) {
            return;
        }
        
        book.isRead = readState;
    }
}