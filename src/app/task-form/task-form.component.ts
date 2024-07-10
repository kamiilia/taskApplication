import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskService } from '../task-service.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent { // formGroup

  taskForm = this.formBuilder.group({ taskTitle: '', taskDescription: '' });

  constructor(private router: Router, private taskService: TaskService, private formBuilder: FormBuilder) { }

  onSubmit() {
    let task = {title: this.taskForm.value.taskTitle!, description : this.taskForm.value.taskDescription!};
    this.taskService.postTask(task).subscribe({ next: () => { this.router.navigate(['']); } });
  }  

}
