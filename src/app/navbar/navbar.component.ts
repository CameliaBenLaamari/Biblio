import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public cartCount: number = 0;
  public wishlistCount: number = 0;

  constructor(private authService: AuthService) { 
    this.authService.cartSubject.subscribe((data) => {
      this.cartCount = data;
    });
    this.authService.wishlistSubject.subscribe((data) => {
      this.wishlistCount = data;
    })
  }

  ngOnInit(): void {
    this.getCartCount();
    this.getWishlistCount();
  }

  getCartCount() {
    this.cartCount = 0;
    if(localStorage.getItem('localCart') != null){
      var totalCart = JSON.parse(localStorage.getItem('localCart'));
      for(let i=0; i < totalCart.length; i++){
        this.cartCount += totalCart[i].quantity;
      }
    }
  }

  getWishlistCount() {
    this.wishlistCount = 0;
    if(localStorage.getItem('localWishlist') != null){
      var totalWishlist = JSON.parse(localStorage.getItem('localWishlist'));
      this.wishlistCount += totalWishlist.length;
    }
  }

}
