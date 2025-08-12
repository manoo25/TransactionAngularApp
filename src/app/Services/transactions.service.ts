import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Itransactions } from '../interfaces/itransactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly transactionsUrl = 'assets/transaction.json';
  AllTransactions: Itransactions[] = [];
  TransactionsType: string[] = [];
  transactionDataService: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.httpClient.get<any>(this.transactionsUrl);
  }
  getAllTransaction() {
    this.getTransactions().subscribe({
      next: (data) => {
        this.transactionDataService.next(data);
        this.AllTransactions = data;
        this.TransactionsType = this.AllTransactions.map((x) => x.type).filter(
          (item, index, arr) => arr.indexOf(item) === index
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterTransaction(search: string, type?: string) {
    const searchUpper = search.toUpperCase();
    const typeUpper = type ? type.toUpperCase() : '';

    const filteredData = this.AllTransactions.filter(
      (x) =>
        (x.accountName.toUpperCase().includes(searchUpper) ||
          x.accountId.toUpperCase().includes(searchUpper)) &&
        (typeUpper === '' || x.type.toUpperCase().includes(typeUpper))
    );

    this.transactionDataService.next(filteredData);
  }

  heighAmount: boolean = false;
  lowAmount: boolean = false;
  newDate: boolean = false;
  oldDate: boolean = false;

  sortingFun() {
    let sortedData = [...this.AllTransactions];

    sortedData.sort((a, b) => {
      const dateCompare = this.newDate
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : this.oldDate
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : 0;

      if (dateCompare !== 0) return dateCompare;

      const amountCompare = this.heighAmount
        ? b.amount - a.amount
        : this.lowAmount
        ? a.amount - b.amount
        : 0;

      return amountCompare;
    });

    this.transactionDataService.next(sortedData);
  }

}
