import { Component, inject } from '@angular/core';
import { CurrentPerPageComponent } from "../current-per-page/current-per-page.component";
import { TransactionsService } from '../../Services/transactions.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
public transactionsService=inject(TransactionsService)
}
