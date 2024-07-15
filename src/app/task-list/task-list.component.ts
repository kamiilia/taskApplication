import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task-service.service';
import { Task } from '../models/task';
import { NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, MatListModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

  tasks: Task[];

  constructor(private router: Router, private taskService: TaskService) { }

  ngOnInit(): void {
    this.getRefreshTaskList();
  }

  getRefreshTaskList() {
    this.taskService.getAllTasks().subscribe({ next: data => {
        this.tasks = data;}
    });
  }

  removeTask(task: Task) {
    this.taskService.deleteTask(task.id!).subscribe({ next: () => {
        this.getRefreshTaskList();}
    });
  }

  editTask(task: Task) {
    this.router.navigate(['edit-task/' + task.id]);
  }

  addNewTask() {
    this.router.navigate(['new-task'])
  }
}
