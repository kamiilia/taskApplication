import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../task-service.service';
import { Subscription } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [MatListModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  private routeSubscription: Subscription;
  // two way binding
  title: string;
  description: string;
  task: Task;

  constructor(private router: Router, private taskService: TaskService, private activatedRoute: ActivatedRoute) {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.taskService.getTask(params['id']).subscribe({
        next: data => {
          this.task = data;
          this.title = data.title;
          this.description = data.description;
        }
      });;
    });
  }

  backToTasksList() {
    if (this.task.title !== this.title || this.task.description !== this.description) {
      this.task.title = this.title;
      this.task.description = this.description;
      this.taskService.updateTask(this.task).subscribe({
        next: () => {
          this.router.navigate(['']);
        }
      });
    } else {
      console.log('aucune modif , pas besoin de faire l\'appel api');
      this.router.navigate(['']);
    }
  }
}
