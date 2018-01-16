import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BuildListItemComponent } from './../build-list-item/build-list-item.component';
import { BuildListComponent } from './build-list.component';

describe('BuildListComponent', () => {
  let component: BuildListComponent;
  let fixture: ComponentFixture<BuildListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BuildListComponent,
        BuildListItemComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders all given items', () => {
    component.items = [{}];
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(de.length).toEqual(1);
  });
});
