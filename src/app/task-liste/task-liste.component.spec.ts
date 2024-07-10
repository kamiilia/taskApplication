import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListeComponent } from './task-liste.component';

describe('TaskListeComponent', () => {
  let component: TaskListeComponent;
  let fixture: ComponentFixture<TaskListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
