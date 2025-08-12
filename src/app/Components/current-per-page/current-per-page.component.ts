import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-current-per-page',
  imports: [],
  templateUrl: './current-per-page.component.html',
  styleUrl: './current-per-page.component.css'
})
export class CurrentPerPageComponent {

  @Output() currentPerPageChange = new EventEmitter<number>();

  ChangeCurrent(count:any){
     const CountValue = Number(count);
    this.currentPerPageChange.emit(CountValue);
  }
}
