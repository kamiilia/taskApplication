import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task/task-list/task-list.component';
import { TaskFormComponent } from './pages/task/task-form/task-form.component';
import { TaskItemComponent } from './pages/task/task-item/task-item.component';

export const routes: Routes = [
    {path: "", redirectTo: 'task-list', pathMatch: 'full' },
    {path:"task-list", component: TaskListComponent},
    {path:"new-task", component:TaskFormComponent},
    {path:"edit-task/:id", component:TaskFormComponent},
    {path:"details-task/:id", component:TaskItemComponent},
];