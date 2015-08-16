/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../source/persistence.ts" />

describe('Persistence', function () {
    describe('save function should', function () {
        it('should save an empty object to local storage', function () {
            var persistence = new Persistence();
            var sut = function () {
                persistence.save({});
            }

            expect(sut).not.toThrow();
        });

        it('should save an object with a property as a json string to local storage', function () {
            var persistence = new Persistence();

            persistence.save({
                testProperty: 'hello'
            });

            var item = localStorage.getItem('simple-persistence');

            // Just some basic JSON definition
            expect(item).toBeDefined();
            expect(item).toContain('testProperty');
            expect(item).toContain('hello');
            expect(item).toContain('{');
            expect(item).toContain('}');
        });

        it('should save an object with a property as a json string to local storage, which can be converted back to json', function () {
            var persistence = new Persistence();

            persistence.save({
                testProperty: 'hello'
            });

            var item = JSON.parse(localStorage.getItem('simple-persistence'));

            expect(item).toBeDefined();
            expect(item.testProperty).toBeDefined();
            expect(item.testProperty).toBe('hello');
        });
    });

    it('should load an object from local storage', function () {
        var persistence = new Persistence();

        localStorage.setItem('simple-persistence', JSON.stringify([{
            _title: 'hello'
        }]));

        var items = persistence.load();
        var item = items[0];

        expect(item).toBeDefined();
        expect(item.title).toBeDefined();
        expect(item.title).toBe('hello');
    });
});