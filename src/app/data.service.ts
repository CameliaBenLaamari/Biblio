import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'assets/database.json';

  constructor(private http: HttpClient) { }

  getBooks(){
    return this.http.get<Book[]>(this.apiUrl);
  }
}
