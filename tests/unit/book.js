/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../source/book.ts" />

describe('Book', function () { 
    it('should have falsy properties after creating', function () {
        var book = new Book();
        
        expect(book.title).toBeFalsy();
        expect(book.author).toBeFalsy();
        expect(book.id).toBeFalsy();
    });  
    
    it('should get the properties as they have been set', function () {
        var book = new Book();
        
        // We test this, since it is a TS property
        book.author = 'TestAuthor';
        book.title = 'TestTitle';
        book.id = 1;
        
        expect(book.author).toBe('TestAuthor');
        expect(book.title).toBe('TestTitle');
        expect(book.id).toBe(1);
    });
});