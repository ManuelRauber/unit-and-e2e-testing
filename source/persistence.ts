/// <reference path="book" />

/**
 * Little class using localStorage for persistence
 */
class Persistence {
    private storageKey: string = 'simple-persistence';
    
    public save(data: Array<Book>): void {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
    
    public load(): Array<Book> {
        var jsonString = localStorage.getItem(this.storageKey);
        var objects = JSON.parse(jsonString) || [];
        
        // Workaround for correctly deserializing the json
        var result = new Array<Book>();
        
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
}