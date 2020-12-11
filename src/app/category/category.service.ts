import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = 'http://localhost:4002/category'

  constructor(private http: HttpClient) {}

  getCategories() {
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }
    return this.http.get(this.url, httpOptions)
  }

  addCategory(title: string, description: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    const body = {
      title: title,
      description: description
    }
    return this.http.post(this.url, body, httpOptions)
  }

  editCategory(id: number,title: string, description: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    const body = {
      title: title,
      description: description
    }
    return this.http.put(this.url + "/" + id, body, httpOptions)
  }

  deleteCategoty(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }
    return this.http.delete(this.url + "/" + id, httpOptions)
  }
}