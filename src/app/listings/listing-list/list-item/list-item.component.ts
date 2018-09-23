import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() item ;

  constructor(private route: Router , private router: ActivatedRoute) { }

  ngOnInit() {
  }

  getItem(id: number) {

    this.route.navigate([id] , {relativeTo: this.router});

  }

}
