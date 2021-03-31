import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  openNewProject(): void {
    console.log("Open Project !");
  }
}
