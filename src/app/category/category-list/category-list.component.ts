import { Component, OnInit, ComponentFactory } from '@angular/core';
import { CategoryService } from './../category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories = []

  constructor( private toastr: ToastrService,
               private service: CategoryService,
               private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories() {
    this.service
      .getCategories()
      .subscribe(response => {
        if(response['status'] == 'success') {
          this.categories = response['data']
        }
        else {
          this.toastr.error(response['error'])
        }
      })
  }

  onAdd() {
    const modalRef = this.modalService.open(CategoryAddComponent)
    modalRef.result.finally(() => {
      this.loadCategories()
    })
  }

  onEdit(category) {
    const modalRef = this.modalService.open(CategoryEditComponent)
    const comopnent = modalRef.componentInstance as CategoryEditComponent

    comopnent.title = category.title
    comopnent.description = category.description
    comopnent.id = category.id

    modalRef.result.finally(() => {
      this.loadCategories()
    })
  }

  onDelete(category) {
    this.service
      .deleteCategoty(category['id'])
      .subscribe(response => {
        if(response['status'] == 'success') {
          this.loadCategories()
        }
        else {
          this.toastr.error(response['error'])
        }
      })
  }

}