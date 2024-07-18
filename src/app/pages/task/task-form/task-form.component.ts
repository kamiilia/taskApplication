import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskService } from '../../../services/task-service.service';
import { FormBuilder } from '@angular/forms';
import { Task } from '../../../models/task';
import { RoutingService } from '../../../services/routing.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../../shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit { // formGroup
  actualUrl: string;
  taskTitleForm: string;
  taskDescriptionForm: string;
  task: Task;
  taskForm: FormGroup = new FormGroup({
    taskTitleForm: new FormControl(''),
    taskDescriptionForm: new FormControl(''),
  });
  constructor(private router: Router, private readonly taskService: TaskService, private formBuilder: FormBuilder, private readonly activatedRoute: ActivatedRoute,
    private readonly routingService: RoutingService, private snackBar: MatSnackBar, private dialogPopUp: MatDialog) {
    this.taskForm = this.formBuilder.group({ taskTitleForm: ['', Validators.required], taskDescriptionForm: ['', Validators.required] });
  }

  ngOnInit(): void {
    this.actualUrl = this.router.url;
    if (this.actualUrl.includes('edit-task')) {
      this.activatedRoute.params.subscribe(
        params => {
          this.taskService.getTask(params['id']).subscribe({
            next: data => {
              this.task = data;
              this.taskTitleForm = data.title;
              this.taskDescriptionForm = data.description;
            }
          });
        }
      )
    }
  }

  onSubmit() {
    const task = { title: this.taskForm.controls['taskTitleForm'].value, description: this.taskForm.controls['taskDescriptionForm'].value }
    if (this.taskForm.valid) {
      this.taskService.postTask(task).subscribe({
        next: () => {
          this.snackBar.open("task created successfully", "", {
            duration: 2000,
          });
          this.routingService.goToTaskList();
        }
      });
    } else {
      this.dialogPopUp.open(AlertDialogComponent, {
        data: {
          message: 'Task title and task description are required',
          buttonback: 'OK'
        }
      });
    }
  }

  updateTasksList() {
    if (this.taskTitleForm.length > 0 && this.taskDescriptionForm.length > 0) {
      if (this.task.title !== this.taskTitleForm || this.task.description !== this.taskDescriptionForm) {
        this.task.title = this.taskTitleForm;
        this.task.description = this.taskDescriptionForm;
        this.taskService.updateTask(this.task).subscribe({
          next: () => {
            this.snackBar.open("task updated successfully", "", {
              duration: 2000,
            });
          }
        });
      } else {
        this.snackBar.open("no changes noticed", "", {
          duration: 2000,
        });
      }
      this.backToTasksList();
    }
    else {
      this.dialogPopUp.open(AlertDialogComponent, {
        data: {
          message: 'Task title and Task description are required',
          buttonback: 'OK'
        }
      });
    }
  }
  backToTasksList() {
    this.routingService.goToTaskList();
  }

}
