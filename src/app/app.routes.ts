import { Routes } from '@angular/router';
import { TaskListeComponent } from './task-liste/task-liste.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskItemComponent } from './task-item/task-item.component';

export const routes: Routes = [
    {path: "", redirectTo: 'task-list', pathMatch: 'full' },
    {path:"task-list", component: TaskListeComponent},
    {path:"new-task", component:TaskFormComponent},
    {path:"edit-task/:id", component:TaskItemComponent}
];