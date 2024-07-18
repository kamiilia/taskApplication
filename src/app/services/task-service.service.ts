import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { taskApiUrl } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskPath = taskApiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.taskPath).pipe(catchError(this.erroHandler));
  }

  getTask(id: string): Observable<Task> {
    return this.httpClient.get<Task>(this.taskPath + `${id}`).pipe(catchError(this.erroHandler));
  }

  postTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.taskPath, task).pipe(catchError(this.erroHandler));
  }

  updateTask(task: Task): Observable<any> {
    return this.httpClient.put<Task>(this.taskPath + `${task.id}`, task).pipe(catchError(this.erroHandler));
  }

  deleteTask(id: number): Observable<any> {
    return this.httpClient.delete<Task>(this.taskPath + `${id}`).pipe(catchError(this.erroHandler));
  }

  private erroHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
