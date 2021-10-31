import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Book } from '../book.model';
import { DataService } from '../data.service';
import { Item } from '../item';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Book[];
  name: string;
  itemsCart: any = [];
  itemsWishlist: any = [];
  cartCount: number = 0;
  wishlistCount: number = 0;

  key:string = 'id';
  page: number = 1;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    ) { };

  ngOnInit() {
    return this.dataService.getBooks()
    .subscribe(data => this.books = data);
  }

  Search(){
    if(this.name == ""){
      this.ngOnInit();
    }else{
      this.books = this.books.filter(res =>{
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }

  addToCart(book: Book){
    console.log(book);
    let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull == null){
      let storeData: Item[] = [];
      storeData.push(new Item(book, 1));
      localStorage.setItem('localCart', JSON.stringify(storeData));
    }else{
      var name = book.name;
      let index: number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart'));
      for(let i=0; i<this.itemsCart.length; i++){
        if(name === this.itemsCart[i].book.name){
          this.itemsCart[i].quantity += 1;
          index = i;
          break;
        }
      }
      if(index == -1){
        this.itemsCart.push(new Item(book, 1));
      }
      localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
    }
    this.getCartCount();
  }

  addToWishlist(book: Book){
    console.log(book);
    let wishlistDataNull = localStorage.getItem('localWishlist');
    if(wishlistDataNull == null){
      let storeData: Book[] = [];
      storeData.push(book);
      localStorage.setItem('localWishlist', JSON.stringify(storeData));
    }else{
      var name = book.name;
      let index: number = -1;
      this.itemsWishlist = JSON.parse(localStorage.getItem('localWishlist'));
      for(let i=0; i<this.itemsWishlist.length; i++){
        if(name === this.itemsWishlist[i].name){
          this.itemsWishlist.splice(i, 1);
          index = i;
          break;
        }
      }
      if(index == -1){
        this.itemsWishlist.push(book);
      }
      localStorage.setItem('localWishlist', JSON.stringify(this.itemsWishlist));
    }
    this.getWishlistCount();
  }

  getCartCount() {
    this.cartCount = 0;
    var totalCart = JSON.parse(localStorage.getItem('localCart'));
    for(let i=0; i < totalCart.length; i++){
      this.cartCount += totalCart[i].quantity;
    }
    this.authService.cartSubject.next(this.cartCount);
  }

  getWishlistCount() {
    this.wishlistCount = 0;
    var totalWishlist = JSON.parse(localStorage.getItem('localWishlist'));
    this.wishlistCount += totalWishlist.length;
    this.authService.wishlistSubject.next(this.wishlistCount);
  }

  isInWishlist(book: Book) {
    for(let i=0; i<this.itemsWishlist.length; i++){
      if(book.name === this.itemsWishlist[i].name){
        return true;
      }
    }
    return false;
  }

}
