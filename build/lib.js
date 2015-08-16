"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Book = (function () {
    function Book() {
        _classCallCheck(this, Book);

        this._isRead = false;
    }

    _createClass(Book, [{
        key: "id",
        get: function get() {
            return this._id;
        },
        set: function set(v) {
            this._id = v;
        }
    }, {
        key: "title",
        get: function get() {
            return this._title;
        },
        set: function set(v) {
            this._title = v;
        }
    }, {
        key: "author",
        get: function get() {
            return this._author;
        },
        set: function set(v) {
            this._author = v;
        }
    }, {
        key: "isRead",
        get: function get() {
            return this._isRead;
        },
        set: function set(v) {
            this._isRead = v;
        }
    }]);

    return Book;
})();
/// <reference path="book" />
/**
 * Little class using localStorage for persistence
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Persistence = (function () {
    function Persistence() {
        _classCallCheck(this, Persistence);

        this.storageKey = 'simple-persistence';
    }

    _createClass(Persistence, [{
        key: 'save',
        value: function save(data) {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        }
    }, {
        key: 'load',
        value: function load() {
            var jsonString = localStorage.getItem(this.storageKey);
            var objects = JSON.parse(jsonString) || [];
            // Workaround for correctly deserializing the json
            var result = new Array();
            for (var i = 0; i < objects.length; i++) {
                var obj = objects[i];
                var book = new Book();
                book.author = obj._author;
                book.id = obj._id;
                book.isRead = obj._isRead;
                book.title = obj._title;
                result.push(book);
            }
            return result;
        }
    }]);

    return Persistence;
})();
/// <reference path="book" />
/// <reference path="persistence" />
/**
 * Simple class for managing books using CRUD operations and a filter
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BookManager = (function () {
    /**
     * BookManager has a dependency to Persistence
     */

    function BookManager(persistence) {
        _classCallCheck(this, BookManager);

        /**
         * An array holding all the available books
         */
        this.books = new Array();
        this.persistence = persistence;
    }

    /**
     * Returns -1 if the book is not found, otherwise will return the
     * real array index
     */

    _createClass(BookManager, [{
        key: "getArrayPositionFrom",
        value: function getArrayPositionFrom(bookId) {
            var result = -1;
            this.books.forEach(function (book, index) {
                if (book.id === bookId) {
                    result = index;
                }
            });
            return result;
        }

        /**
         * Returns the highest book id
         */
    }, {
        key: "getMaxBookId",
        value: function getMaxBookId() {
            var max = 0;
            this.books.forEach(function (book) {
                if (book.id > max) {
                    max = book.id;
                }
            });
            return max;
        }

        /**
         * Loads the books into the internal storage
         */
    }, {
        key: "load",
        value: function load() {
            this.books = this.persistence.load() || new Array();
        }

        /**
         * Saves the books to the internal storage
         */
    }, {
        key: "save",
        value: function save() {
            this.persistence.save(this.books);
        }

        /**
         * Adds a new book to the internal storage
         */
    }, {
        key: "newBook",
        value: function newBook(title, author, isRead) {
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
    }, {
        key: "delete",
        value: function _delete(bookId) {
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
    }, {
        key: "list",
        value: function list() {
            return this.books;
        }

        /**
         * Returns a list of filtered books.
         * Set isRead to true, to get a list of all read books.
         * Set isRead to false, to get a list of non-read books.
         */
    }, {
        key: "filter",
        value: function filter(isRead) {
            var result = new Array();
            result = this.books.filter(function (book) {
                return book.isRead === isRead;
            });
            return result;
        }

        /**
         * Sets the read state of a book
         */
    }, {
        key: "setReadStateOf",
        value: function setReadStateOf(bookId, readState) {
            var bookArrayIndex = this.getArrayPositionFrom(bookId);
            var book = this.books[bookArrayIndex];
            if (!book) {
                return;
            }
            book.isRead = readState;
        }
    }]);

    return BookManager;
})();
/// <reference path="../../../typings/tsd" />
/// <reference path="../../bookmanager" />
/// <reference path="../../persistence" />
/// <reference path="../../book" />
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var BookManagerApp;
(function (BookManagerApp) {
    'use strict';
    /**
     * Wrapper for the book Manager
     */

    var BookManagerService = (function () {
        function BookManagerService() {
            _classCallCheck(this, BookManagerService);

            this.bookManager = new BookManager(new Persistence());
            this.bookManager.load();
        }

        _createClass(BookManagerService, [{
            key: 'list',
            value: function list() {
                return this.bookManager.list();
            }
        }, {
            key: 'addNew',
            value: function addNew(title, author, isRead) {
                this.bookManager.newBook(title, author, isRead);
                this.bookManager.save();
            }
        }, {
            key: 'delete',
            value: function _delete(bookId) {
                var result = this.bookManager['delete'](bookId);
                this.bookManager.save();
                return result;
            }
        }, {
            key: 'filter',
            value: function filter(isRead) {
                return this.bookManager.filter(isRead);
            }
        }, {
            key: 'readBook',
            value: function readBook(bookId) {
                this.bookManager.setReadStateOf(bookId, true);
            }
        }, {
            key: 'unreadBook',
            value: function unreadBook(bookId) {
                this.bookManager.setReadStateOf(bookId, false);
            }
        }]);

        return BookManagerService;
    })();

    BookManagerApp.BookManagerService = BookManagerService;
})(BookManagerApp || (BookManagerApp = {}));
"use strict";

/// <reference path="../../../typings/tsd" />
/// <reference path="../../book" />
/// <reference path="../../../typings/tsd" />
/// <reference path="../services/BookManagerService" />
/// <reference path="../interfaces/IMainPageScope" />
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var BookManagerApp;
(function (BookManagerApp) {
    'use strict';

    var MainPageController = (function () {
        function MainPageController($scope, bookManagerService) {
            _classCallCheck(this, MainPageController);

            this.$scope = $scope;
            this.bookManagerService = bookManagerService;
            this.$scope.books = this.bookManagerService.list();
            this.$scope.viewModel = this;
        }

        _createClass(MainPageController, [{
            key: 'submitNewBook',
            value: function submitNewBook() {
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
        }, {
            key: 'deleteBook',
            value: function deleteBook(bookId) {
                this.bookManagerService['delete'](bookId);
                this.$scope.books = this.bookManagerService.list();
            }
        }]);

        return MainPageController;
    })();

    MainPageController.$inject = ['$scope', 'bookManagerService'];
    BookManagerApp.MainPageController = MainPageController;
})(BookManagerApp || (BookManagerApp = {}));
/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="services/BookManagerService" />
/// <reference path="controllers/MainPageController" />
'use strict';

var BookManagerApp;
(function (BookManagerApp) {
    'use strict';
    var bookManager = angular.module('bookManagerApp', ['ngMaterial']).service('bookManagerService', BookManagerApp.BookManagerService).controller('mainPageController', BookManagerApp.MainPageController);
})(BookManagerApp || (BookManagerApp = {}));