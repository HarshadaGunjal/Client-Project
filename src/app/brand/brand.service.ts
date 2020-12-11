import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private url = 'http://localhost:4002/brand'

  constructor(private http: HttpClient) { }

  getBrands() {
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    return this.http.get(this.url, httpOptions)
  }

  addBrand(title: string, description: string) {
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

  editBrand(id: number, title: string, description: string) {
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

  deleteBrand(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }
    return this.http.delete(this.url + "/" + id, httpOptions)
  }

}