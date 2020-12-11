import { Component, OnInit } from '@angular/core';
import { BrandService } from './../brand.service';
import { ToastrService } from 'ngx-toastr';
import { BrandEditComponent } from './../brand-edit/brand-edit.component';
import { BrandAddComponent } from './../brand-add/brand-add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands = []

  constructor(
    private toastr: ToastrService,
    private service: BrandService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadBrands()
  }

  loadBrands() {
    this.service
      .getBrands()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.brands = response['data']
        } else {
          this.toastr.error(response['error'])
        }
      })
  }

  onAdd() {
    const modalRef = this.modalService.open(BrandAddComponent)
    modalRef.result.finally(() => {
      this.loadBrands()
    })
  }

  onEdit(brand) {
    const modalRef = this.modalService.open(BrandEditComponent)
    const component = modalRef.componentInstance as BrandEditComponent

    component.title = brand.title
    component.description = brand.description
    component.id = brand.id

    modalRef.result.finally(() => {
      this.loadBrands()
    })
  }

  onDelete(brand) {
    this.service
      .deleteBrand(brand['id'])
      .subscribe(response => {
        if(response['status'] == 'success') {
          this.loadBrands()
        }
        else {
          this.toastr.error(response['error'])
        }
      })
  }

}