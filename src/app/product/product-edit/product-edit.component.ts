import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { BrandService } from './../../brand/brand.service';
import { CategoryService } from 'src/app/category/category.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  title = ''
  description = ''
  price = ''
  category = 1
  brand = 1
  id = 0

  categories = []
  brands = []

  constructor(private productService: ProductService,
              private toastr: ToastrService,
              private modal: NgbActiveModal,
              private categoryService: CategoryService,
              private brandService: BrandService) { }

  ngOnInit(): void {
    this.loadBrands()
    this.loadCategories()
  }

  loadBrands() {
    this.brandService
      .getBrands()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.brands = response['data']
        } else {
          this.toastr.error(response['error'])
        }
      })
  }

  loadCategories() {
    this.categoryService
      .getCategories()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.categories = response['data']
        } else {
          this.toastr.error(response['error'])
        }
      })
  }

  onUpdate() {
    if(this.title.length == 0) {
      this.toastr.warning('please enter title')
    }
    else if (this.description.length == 0) {
      this.toastr.warning('please enter description')
    }
    else if (this.price.length == 0) {
      this.toastr.warning('please enter price')
    } 
    else {
      this.productService
        .editProduct(this.id, this.title, this.description, this.price, this.category, this.brand)
        .subscribe(response => {
          //if (response['status'] == 'success') {
            this.modal.dismiss('ok')
          //} //else {
          //  this.toastr.error(response['error'])
          //}
        })
    }
  }

  onCancel() {
    this.modal.dismiss('cancel')
  }

}
