import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../services/task-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../models/task';
import { RootingService } from '../services/rooting.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [MatListModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent implements OnInit {
  // two way binding
  title: string;
  description: string;
  task: Task;
  constructor(private readonly rootingService: RootingService, private readonly taskService: TaskService, private readonly activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.taskService.getTask(params['id']).subscribe({
          next: data => {
            this.task = data;
            this.title = data.title;
            this.description = data.description;
          }
        });
      }
    )
  }

  backToTasksList() {
    this.rootingService.navigateTo('task-list/');
  }
}
