import { Injectable } from '@angular/core';
import { Task } from './models/task';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('http://localhost:3000/tasks').pipe(catchError(this.erroHandler));
  }

  getTask(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`http://localhost:3000/tasks/${id}`).pipe(catchError(this.erroHandler));
  }

  postTask(task : Task): Observable<Task> {
    return this.httpClient.post<Task>('http://localhost:3000/tasks', task).pipe(catchError(this.erroHandler));
  }

  updateTask(task: Task): Observable<any> {
    return this.httpClient.put<Task>(`http://localhost:3000/tasks/${task.id}`, task).pipe(catchError(this.erroHandler));
  }

  deleteTask(id: number): Observable<any> {
    return this.httpClient.delete<Task>(`http://localhost:3000/tasks/${id}`).pipe(catchError(this.erroHandler));
  }

  erroHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }

}
