import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRecettesComponent } from './gestion-recettes.component';

describe('GestionRecettesComponent', () => {
  let component: GestionRecettesComponent;
  let fixture: ComponentFixture<GestionRecettesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionRecettesComponent]
    });
    fixture = TestBed.createComponent(GestionRecettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
