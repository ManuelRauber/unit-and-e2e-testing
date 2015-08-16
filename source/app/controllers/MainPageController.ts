/// <reference path="../../../typings/tsd" />
/// <reference path="../services/BookManagerService" />
/// <reference path="../interfaces/IMainPageScope" />

module BookManagerApp {
    'use strict';

    export class MainPageController {
        public static $inject = [
            '$scope',
            'bookManagerService'
        ];

        constructor(
            private $scope: IMainPageScope,
            private bookManagerService: BookManagerService
            ) {
            this.$scope.books = this.bookManagerService.list();
            
            this.$scope.viewModel = this;
        }

        public submitNewBook(): void {
            if (!this.$scope.newBook || !this.$scope.newBook.author || !this.$scope.newBook.title) {
                return;
            }
            
            var book = this.$scope.newBook;
            this.bookManagerService.addNew(book.title, book.author, book.isRead);
            
            this.$scope.books = this.bookManagerService.list();
            
            this.$scope.newBook.author = '';
            this.$scope.newBook.title = '';
            this.$scope.newBook.isRead = false;
        }       
        
        public deleteBook(bookId: number) {
            this.bookManagerService.delete(bookId);
            this.$scope.books = this.bookManagerService.list();
        }
    }
}