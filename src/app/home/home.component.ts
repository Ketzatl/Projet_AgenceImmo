import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  properties = [
    {
      title: 'Ma Super Maison',
      category: 'Maison',
      sold: true
    },
    {
      title: 'Mon Super Petit Appartement',
      category: 'Appartement',
      sold: false
    },
    {
      title: 'Ma Super Belle Villa',
      category: 'Maison',
      sold: true
    }

  ];

  constructor() { }

  ngOnInit(): void {
  }

  getSoldValue(index) {
    if (this.properties[index].sold) {
      return 'red';
    } else {
      return 'green';
    }
  }


}
