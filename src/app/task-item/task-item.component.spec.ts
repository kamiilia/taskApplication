import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemComponent } from './task-item.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let httpTestingController: HttpTestingController;
  let activatedRoute: ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent, HttpClientTestingModule, NoopAnimationsModule],

      providers: [{
        provide: ActivatedRoute, useValue:
        {

          params: of({ id: '1' })

        }
      },],
    })
      .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
