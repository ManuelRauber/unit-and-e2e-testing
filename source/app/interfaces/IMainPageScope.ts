/// <reference path="../../../typings/tsd" />
/// <reference path="../../book" />

module BookManagerApp {
    export interface IMainPageScope {
        books: Array<Book>;
        newBook: Book;
        viewModel: MainPageController
    }
}