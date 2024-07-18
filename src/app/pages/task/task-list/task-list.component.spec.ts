import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { TaskService } from '../../../services/task-service.service';
import { of } from 'rxjs';
import { Task } from '../../../models/task';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let task: Task[] = [{ title: 'title', description: 'description' }];

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj("taskService", { getAllTasks: of(task) });
    await TestBed.configureTestingModule({
      imports: [TaskListComponent, HttpClientTestingModule],
      providers: [{
        provide: ActivatedRoute, useValue: {
          data: {
            id: '1'
          }
        }
      },
      { provide: TaskService, useValue: taskServiceSpy }]
    })
      .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllTasks after refresh', () => {
    component.getRefreshTaskList();
    expect(component.taskService.getAllTasks).toHaveBeenCalled();
  });
});
