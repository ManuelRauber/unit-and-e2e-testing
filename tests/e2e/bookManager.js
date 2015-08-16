/// <reference path="../../typings/tsd.d.ts" />

describe('Book Manager App front page', function () {
    beforeEach(function () {
        browser.get('http://localhost:8080/source/app');
        browser.executeScript('window.localStorage.clear();');
        browser.refresh();
    });

    it('should have an empty book list', function () {
        var list = element.all(by.repeater('book in books'));
        expect(list.count()).toBe(0);
    });

    it('should not add an empty item to the book list', function () {
        element(by.css('button[type = "submit"]')).click()
            .then(function () {
                var list = element.all(by.repeater('book in books'));
                expect(list.count()).toBe(0);
            });
    });

    it('should not add an item with empty author to the book list', function () {
        element(by.model('newBook.title')).sendKeys('Test Title');
        element(by.css('button[type = "submit"]')).click()
            .then(function () {
                var list = element.all(by.repeater('book in books'));
                expect(list.count()).toBe(0);
            });
    });

    it('should not add an item with empty title to the book list', function () {
        element(by.model('newBook.author')).sendKeys('Test Author');
        element(by.css('button[type = "submit"]')).click()
            .then(function () {
                var list = element.all(by.repeater('book in books'));
                expect(list.count()).toBe(0);
            });
    });

    it('should add a valid item to the book list', function () {
        element(by.model('newBook.author')).sendKeys('Test Author');
        element(by.model('newBook.title')).sendKeys('Test Title');
        element(by.css('button[type = "submit"]')).click()
            .then(function () {
                var list = element.all(by.repeater('book in books'));
                expect(list.count()).toBe(1);
            });
    });
});