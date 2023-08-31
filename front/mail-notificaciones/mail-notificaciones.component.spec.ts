import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailNotificacionesComponent } from './mail-notificaciones.component';

describe('MailNotificacionesComponent', () => {
  let component: MailNotificacionesComponent;
  let fixture: ComponentFixture<MailNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailNotificacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
