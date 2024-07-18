import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteNavigationConst } from '../shared/const';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }
  goToTaskList() {
    this.router.navigate([RouteNavigationConst.taskList]);
  }
  goToTaskDetail(id?: number) {
    this.router.navigate([RouteNavigationConst.detailsTask + '/' + id]);
  }
  goToCreateNewTask() {
    this.router.navigate([RouteNavigationConst.newTask]);
  }
  goToEditTask(id?: number) {
    this.router.navigate([RouteNavigationConst.editTask + '/' + id]);
  }
}
