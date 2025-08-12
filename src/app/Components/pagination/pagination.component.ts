import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrentPerPageComponent } from "../current-per-page/current-per-page.component";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
   styleUrl: './pagination.component.css',
   imports: [CurrentPerPageComponent]
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;

  @Output() pageChange = new EventEmitter<number>();
  @Output() currentPerPageChange = new EventEmitter<number>();

  goToPage(page: number) {
    this.pageChange.emit(page);
  }
}
