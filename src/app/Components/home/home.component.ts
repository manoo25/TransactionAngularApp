import { Component } from '@angular/core';
import { TableComponent } from "../table/table.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-home',
  imports: [TableComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
