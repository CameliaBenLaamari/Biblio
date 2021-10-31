import { Book } from "./book.model";

export class Item {
    book: Book;
    quantity: number;

    constructor(book: Book, quantity: number) {
        this.book = book;
        this.quantity = quantity;
    }
}