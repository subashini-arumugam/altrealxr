import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideLeaf } from './slide-leaf';

describe('SlideLeaf', () => {
  let component: SlideLeaf;
  let fixture: ComponentFixture<SlideLeaf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideLeaf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideLeaf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
