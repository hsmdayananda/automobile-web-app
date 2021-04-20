import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobileCollectionComponent } from './automobile-collection.component';

describe('AutomobileCollectionComponent', () => {
  let component: AutomobileCollectionComponent;
  let fixture: ComponentFixture<AutomobileCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomobileCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomobileCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
