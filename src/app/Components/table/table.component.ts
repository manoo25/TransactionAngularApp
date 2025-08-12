import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Itransactions } from '../../interfaces/itransactions';
import { PaginationComponent } from '../pagination/pagination.component';
import { EmptyTransactionsComponent } from '../empty-transactions/empty-transactions.component';
import { TransactionsService } from '../../Services/transactions.service';
import { LoadingComponent } from '../loading/loading.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [PaginationComponent, EmptyTransactionsComponent, LoadingComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
  public transactionsService = inject(TransactionsService);
  TransactionData: Itransactions[] = [];
  SubTransaction: Subscription = new Subscription();
  isLoading: boolean = true;
  currentPage = 1;
  rowsPerPage = 10;
  totalPages = 1;
  transactions: Itransactions[] = this.getPageData();

  ngOnInit(): void {
    this.transactionsService.getAllTransaction();
    this.getTransactionsData();
  }
  ngOnDestroy(): void {
    this.SubTransaction.unsubscribe();
  }

  getTransactionsData(): void {
    this.TransactionData = [];
    this.SubTransaction =
      this.transactionsService.transactionDataService.subscribe({
        next: (data) => {
          this.currentPage = 1;
          this.TransactionData = data;
          this.transactions = this.getPageData();
          this.totalPages = Math.ceil(
            this.TransactionData.length / this.rowsPerPage
          );
          //طبعا دا كدا غلط بس انا اديتها وقت عشان اظهراللودينج مش اكتر عشان البيانات مش بتاخد مقت على متيجى
          setTimeout(() => {
            this.isLoading = false;
          }, 1500);
          //  دا الصح تتحط علطول
          //  this.isLoading=false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }

  getPageData(): Itransactions[] {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    return this.TransactionData.slice(
      startIndex,
      startIndex + this.rowsPerPage
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.transactions = this.getPageData();
  }
  ChangeCurrentPerPage(count: number) {
    this.rowsPerPage = count;
    this.currentPage = 1;
    this.transactions = this.getPageData();
    this.totalPages = Math.ceil(this.TransactionData.length / this.rowsPerPage);
  }

  sortHeighAmount() {
    this.transactionsService.lowAmount = false;
    this.transactionsService.heighAmount =
      !this.transactionsService.heighAmount;
    this.transactionsService.sortingFun();
  }
  sortLowAmount() {
    this.transactionsService.heighAmount = false;
    this.transactionsService.lowAmount = !this.transactionsService.lowAmount;
    this.transactionsService.sortingFun();
  }

  sortNewDate() {
    this.transactionsService.oldDate = false;
    this.transactionsService.newDate = !this.transactionsService.newDate;
    this.transactionsService.sortingFun();
  }
  sortOldDate() {
    this.transactionsService.newDate = false;
    this.transactionsService.oldDate = !this.transactionsService.oldDate;
    this.transactionsService.sortingFun();
  }
}
