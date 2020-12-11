import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { ToastrService } from 'ngx-toastr';
import { ProductAddComponent } from './../product-add/product-add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products = []

  constructor(private toastr: ToastrService,
              private service: ProductService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts() {
    this.service
      .getProducts()
      .subscribe(response => {
        if(response['status'] == 'success') {
          this.products = response['data']
        }
        else {
          this.toastr.error(response['error'])
        }
      })
  }

  onAdd() {
    const modalRef = this.modalService.open(ProductAddComponent, {size: 'lg'})
    modalRef.result.finally(() => {
      this.loadProducts()
    })
  }

  onEdit(product) {
    const modalRef = this.modalService.open(ProductEditComponent)
    const component = modalRef.componentInstance as ProductEditComponent

    component.id = product.id
    component.title = product.title
    component.description = product.description
    component.price = product.price
    component.category = product.category
    component.brand = product.brand

    modalRef.result.finally(() => {
      this.loadProducts()
    })
  }


  onDelete(product) {
    this.service
      .deleteProduct(product['id'])
      .subscribe(response => {
        if(response['status'] == 'success') {
          this.loadProducts()
        }
        else {
          this.toastr.error(response['error'])
        }
      })
  }

}