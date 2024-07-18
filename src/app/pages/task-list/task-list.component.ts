import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service.service';
import { Task } from '../../models/task';
import { NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RoutingService } from '../../services/routing.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, MatListModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

  tasks: Task[];
  title = 'Title';
  description = 'Description';
  constructor(public readonly routingService: RoutingService, public readonly taskService: TaskService, private dialogPopUp: MatDialog) { }

  ngOnInit(): void {
    this.getRefreshTaskList();
  }

  getRefreshTaskList() {
    this.taskService.getAllTasks().subscribe({
      next: data => {
        this.tasks = data;
      }
    });
  }
  editTask(task: Task) {
    this.routingService.goToEditTask(task.id);
  }
  createNewTask() {
    this.routingService.goToCreateNewTask();
  }
  taskDetails(task: Task) {
    this.routingService.goToTaskDetail(task.id);
  }
  removeTask(task: Task) {
    this.dialogPopUp.open(AlertDialogComponent, {
      data: {
        message: 'Are you sure about deleting this task',
        buttonback: 'No',
        buttonDelete: 'Yes delete',
      }
    }).afterClosed()
      .subscribe((confirmDeletingTask: Boolean) => {
        if (confirmDeletingTask) {
          this.taskService.deleteTask(task.id!).subscribe({
            next: () => {
              this.getRefreshTaskList();
            }
          });
        }
      });
  }
}
