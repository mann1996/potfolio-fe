import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  postActive: boolean = true;
  peopleActive: boolean = false;

  key: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.router.navigate(['post'], { relativeTo: this.route });
    this.postActive = true;
    this.peopleActive = false;
  }

  showPosts(event) {
    event.preventDefault();
    this.router.navigate(['post'], { relativeTo: this.route });
    this.postActive = true;
    this.peopleActive = false;
  }

  showPeople(event) {
    event.preventDefault();
    this.router.navigate(['people'], { relativeTo: this.route });
    this.postActive = false;
    this.peopleActive = true;
  }

  search() {
    this.data.setSearchKey(this.key);
  }
}
