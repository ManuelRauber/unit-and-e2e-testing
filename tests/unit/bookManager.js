/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../source/book.ts" />

describe('BookManager', function () {
    describe('without persistence', function () {
        it('should have an empty book list after creating', function () {
            var bookManager = new BookManager();

            expect(bookManager.list().length).toBe(0);
        });

        it('should throw an error when load is called', function () {
            var bookManager = new BookManager();
            var sut = function () {
                bookManager.load();
            };

            expect(sut).toThrow();
        });

        it('should throw an error when save is called', function () {
            var bookManager = new BookManager();
            var sut = function () {
                bookManager.save();
            };

            expect(sut).toThrow();
        });
    });
    
    describe('with persistence', function () {
        var persistence;
        
        beforeEach(function () {
            persistence = jasmine.createSpyObj('persistence', ['save', 'load']);
        });
        
        it('should not call persistence load function, book manager has been created', function () {
            var bookManager = new BookManager(persistence);
            
            expect(persistence.load).not.toHaveBeenCalled();
        });
        
        it('should not call persistence save function, book manager has been created', function () {
            var bookManager = new BookManager(persistence);
            
            expect(persistence.save).not.toHaveBeenCalled();
        });
        
        it('should call persistence load function, when load is called', function () {
            var bookManager = new BookManager(persistence);
            
            bookManager.load();
            
            expect(persistence.load).toHaveBeenCalled();
        });
        
        it('should have an empty list of book after creation', function () {
            var bookManager = new BookManager(persistence);
            
            var result = bookManager.list();
            
            expect(result.length).toBe(0);
        });
        
        it('should return an empty filter result (isRead=true) when internal list is empty', function () {
            var bookManager = new BookManager(persistence);
            
            var result = bookManager.filter(true);
            
            expect(result.length).toBe(0);
        });
        
        it('should return an empty filter result (isRead=false) when internal list is empty', function () {
            var bookManager = new BookManager(persistence);
            
            var result = bookManager.filter(false);
            
            expect(result.length).toBe(0);
        });
        
        it('can not delete a book which is not found due to an empty list', function () {
            var bookManager = new BookManager(persistence);
            
            var result = bookManager.delete(1);
            
            expect(result).toBeFalsy();
        });
        
        it('can add a new book', function () {
            var bookManager = new BookManager(persistence);
            
            var sut = function () {
                bookManager.newBook('TestTitle', 'TestAuthor');
            };
            
            expect(sut).not.toThrow();
        });
        
        it('can add new book and list it', function () {
            var bookManager = new BookManager(persistence);
            
            bookManager.newBook('TestTitle', 'TestAuthor');
            
            var list = bookManager.list();
            
            expect(list.length).toBe(1);
            
            var book = list[0];
            
            expect(book.title).toBe('TestTitle');
            expect(book.author).toBe('TestAuthor');
            expect(book.id).toBe(1);
        });
        
        it('can add new book and delete it', function () {
            var bookManager = new BookManager(persistence);
            
            bookManager.newBook('TestTitle', 'TestAuthor');
            
            var list = bookManager.list();
            var book = list[0];
            
            var result = bookManager.delete(book.id);
            expect(result).toBeTruthy();
            
            list = bookManager.list();
            expect(list.length).toBe(0);
        });
        
        it('only deletes one book', function () {
            var bookManager = new BookManager(persistence);
            
            bookManager.newBook('1', '1');
            bookManager.newBook('2', '2');
            bookManager.newBook('3', '3');
            
            var list = bookManager.list();
            
            var result = bookManager.delete(2);
            expect(result).toBeTruthy();
            
            list = bookManager.list();
            expect(list.length).toBe(2);
        });
        
        it('should return a empty list when filtering to isRead true and the list contains non-read books only', function () {
            var bookManager = new BookManager(persistence);
            
            bookManager.newBook('1', '1');
            bookManager.newBook('2', '2');
            bookManager.newBook('3', '3');
            bookManager.newBook('4', '4');
            
            var result = bookManager.filter(true);
            
            expect(result.length).toBe(0);
        });
        
        it('should return a empty list when filtering to isRead false and the list contains read books only', function () {
            var bookManager = new BookManager(persistence);
            
            bookManager.newBook('1', '1', true);
            bookManager.newBook('2', '2', true);
            bookManager.newBook('3', '3', true);
            bookManager.newBook('4', '4', true);
            
            var result = bookManager.filter(false);
            
            expect(result.length).toBe(0);
        });
        
        it('should return a list with two items when filtering to isRead false and the list contains two non-read books', function () {
            var bookManager = new BookManager(persistence);
            
            bookManager.newBook('1', '1', true);
            bookManager.newBook('2', '2', true);
            bookManager.newBook('3', '3');
            bookManager.newBook('4', '4');
            
            var result = bookManager.filter(false);
            
            expect(result.length).toBe(2);
        });
        
        it('should return a list with two items when filtering to isRead true and the list contains three read books', function () {
            var bookManager = new BookManager(persistence);
            
            bookManager.newBook('1', '1', true);
            bookManager.newBook('2', '2', true);
            bookManager.newBook('3', '3', true);
            bookManager.newBook('4', '4', false);
            
            var result = bookManager.filter(true);
            
            expect(result.length).toBe(3);
        });
        
        it('should set a read state to true after calling setReadStateOf', function () {
            var bookManager = new BookManager(persistence);
            
            bookManager.newBook('1', '1');
            
            var list = bookManager.list();
            expect(list.length).toBe(1);
            
            var book = list[0];
            expect(book.isRead).toBeFalsy();

            bookManager.setReadStateOf(book.id, true);
            
            expect(book.isRead).toBeTruthy();
        });
        
        it('should not throw then trying to set read state of a book which is not in internal storage', function () {
            var bookManager = new BookManager(persistence);
            
            var sut = function () {
                bookManager.setReadStateOf(1, false);
            }
            
            expect(sut).not.toThrow();
        });
    });
});