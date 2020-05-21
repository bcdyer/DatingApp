import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { PaginatedResult, Pagination } from '../_models/Pagination';
import { TypeaheadOptions } from 'ngx-bootstrap';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(private authService: AuthService , private userService: UserService,
              private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
       this.users = data['users'].result;
       this.pagination = data['users'].pagination;

    });
    this.likesParam = 'Likers';
  }


  loadUsers() {
    this.userService
    .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage,  null, this.likesParam)
    .subscribe(
      (res: PaginatedResult<User[]>) => {
      this.users =  res.result;
      this.pagination = res.pagination;
    }, error => {
      this .alertify.error(error);
    });
}


pageChanged(event: any): void {
  this.pagination.currentPage = event.page;
  this.loadUsers();
  console.log(this.pagination.currentPage);

}
}
