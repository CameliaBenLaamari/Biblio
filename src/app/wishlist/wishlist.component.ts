import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist: Book[] = [];
  wishlistCount: number = 0;
  page: number = 1;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadWishlist();
    this.getWishlistCount();
  }

  loadWishlist(){
    if(localStorage.getItem('localWishlist')){
      this.wishlist = JSON.parse(localStorage.getItem('localWishlist'));
    }
  }

  removeAll(): void {
    localStorage.removeItem('localWishlist');
    this.wishlist = [];
    this.wishlistCount = 0;
    this.authService.wishlistSubject.next(this.wishlistCount);
  }

  getWishlistCount() {
    this.wishlistCount = 0;
    var totalWishlist = JSON.parse(localStorage.getItem('localWishlist'));
    this.wishlistCount += totalWishlist.length;
    this.authService.wishlistSubject.next(this.wishlistCount);
  }

  isInWishlist(book: Book) {
    for(let i=0; i<this.wishlist.length; i++){
      if(book.name === this.wishlist[i].name){
        return true;
      }
    }
    return false;
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
      this.wishlist = JSON.parse(localStorage.getItem('localWishlist'));
      for(let i=0; i<this.wishlist.length; i++){
        if(name === this.wishlist[i].name){
          this.wishlist.splice(i, 1);
          index = i;
          break;
        }
      }
      if(index == -1){
        this.wishlist.push(book);
      }
      localStorage.setItem('localWishlist', JSON.stringify(this.wishlist));
    }
    this.getWishlistCount();
  }

}
