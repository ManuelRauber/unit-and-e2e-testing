/// <reference path="../../../typings/tsd" />
/// <reference path="../../bookmanager" />
/// <reference path="../../persistence" />
/// <reference path="../../book" />

module BookManagerApp {
    'use strict';
    
    /**
     * Wrapper for the book Manager
     */
    export class BookManagerService {
        private bookManager: BookManager = new BookManager(new Persistence());
        
        constructor() {
            this.bookManager.load();
        }
        
        public list(): Array<Book> {
            return this.bookManager.list();
        }
        
        public addNew(title: string, author: string, isRead: boolean): void {
            this.bookManager.newBook(title, author, isRead);
            this.bookManager.save();
        }
        
        public delete(bookId: number): boolean {
            var result = this.bookManager.delete(bookId);
            this.bookManager.save();
            return result;
        }
        
        public filter(isRead: boolean): Array<Book> {
            return this.bookManager.filter(isRead);
        }
        
        public readBook(bookId: number): void {
            this.bookManager.setReadStateOf(bookId, true);
        }
        
        public unreadBook(bookId: number): void {
            this.bookManager.setReadStateOf(bookId, false);
        }
    }
}