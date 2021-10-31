import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { Item } from '../item';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: Item[] = [];
  total: number = 0;
  cartCount: number = 0;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadCart();
    this.getTotal();
    this.getCartCount();
  }

  loadCart(){
    if(localStorage.getItem('localCart')){
      this.items = JSON.parse(localStorage.getItem('localCart'));
    }
  }

  increase(item: Item) {
    for(let i=0; i<this.items.length; i++){
      if(this.items[i].book.name == item.book.name){
        this.items[i].quantity = item.quantity + 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.items));
    this.getTotal();
    this.getCartCount();
  }

  decrease(item: Item) {
    for(let i=0; i<this.items.length; i++){
      if(this.items[i].book.name == item.book.name && item.quantity > 1){
        this.items[i].quantity = item.quantity - 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.items));
    this.getTotal();
    this.getCartCount();
  }

  getPrice(item: Item) {
    return Math.round(item.book.price*item.quantity*100) / 100;
  }

  getTotal() {
    if(localStorage.getItem('localCart')){
      this.items = JSON.parse(localStorage.getItem('localCart'));
      this.total = this.items.reduce(function(acc, val){
        return acc + (val.book.price*val.quantity);
      }, 0)
    }
    this.total = Math.round(this.total*100) / 100;
  }

  removeAll(): void {
    localStorage.removeItem('localCart');
    this.items = [];
    this.total = 0;
    this.cartCount = 0;
    this.authService.cartSubject.next(this.cartCount);
  }

  delete(item: Item) {
    if(localStorage.getItem('localCart')){
      this.items = JSON.parse(localStorage.getItem('localCart'));
      for(let i=0; i<this.items.length; i++){
        if(this.items[i].book.name === item.book.name){
          this.items.splice(i, 1);
          localStorage.setItem('localCart', JSON.stringify(this.items));
          this.getTotal();
          this.getCartCount();
        }
      }
    }
  }

  getCartCount() {
    this.cartCount = 0;
    var totalCart = JSON.parse(localStorage.getItem('localCart'));
    for(let i=0; i < totalCart.length; i++){
      this.cartCount += totalCart[i].quantity;
    }
    this.authService.cartSubject.next(this.cartCount);
  }

}
