import { async, ComponentFixture, TestBed, fakeAsync, tick, flushMicrotasks, flush, discardPeriodicTasks } from '@angular/core/testing';

import { RechargeFormComponent } from './recharge-form.component';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageLoaderModule } from '@ui/page-loader/page-loader.module';
import { ButtonModule } from '@ui/button';
import { FormControlModule } from '@ui/form-control';
import { TelInputModule } from '@ui/tel-input';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const mockActivatedRoute = {
  paramMap: new BehaviorSubject(convertToParamMap({providerId: 1}))
}

const providers = [
  { id: 1, name: 'mtc' },
  { id: 2, name: 'beeline' },
  { id: 3, name: 'megaphone' },
  { id: 4, name: 'vodafone' },
  { id: 5, name: 'AT&T' }
]

describe('RechargeFormComponent', () => {
  let component: RechargeFormComponent;
  let fixture: ComponentFixture<RechargeFormComponent>;
  let httpTestingController: HttpTestingController;
  let providersLoadReq: TestRequest;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        PageLoaderModule,
        ButtonModule,
        FormControlModule,
        TelInputModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        NoopAnimationsModule
      ],
      declarations: [RechargeFormComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(RechargeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    providersLoadReq = httpTestingController.expectOne('/api/v1/cell-provider');
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be binded property provider on model and url prop :providerId', () => {
    const navigateSpy = spyOn(router, 'navigate');
    providersLoadReq.flush(providers);
    expect(component.model.provider).toBe(1);
    mockActivatedRoute.paramMap.next(convertToParamMap({providerId: 10}));
    expect(component.model.provider).toBe(null);
    expect(navigateSpy).toHaveBeenCalledWith(['..', 'unknown']);
  });

  it('should change providerId param in url when changing provider property in model', () => {
    const navigateSpy = spyOn(router, 'navigate');
    providersLoadReq.flush(providers);
    component.onProviderChanged(2);
    expect(navigateSpy).toHaveBeenCalledWith(['..', 2]);
  });

  it('should not submit to backend if form invalid', fakeAsync(() => {
    spyOn(router, 'navigate');
    providersLoadReq.flush(providers);
    fixture.detectChanges();
    flush();
    fixture.debugElement.nativeElement.querySelector('button').click();
    discardPeriodicTasks();
  }))

  // it('should submit to backend if form valid and show toastr on error response', fakeAsync(async () => {
  //   spyOn(router, 'navigate');
  //   let tostrErrorSpy = spyOn(TestBed.get(ToastrService), 'error').and.callThrough();
  //   providersLoadReq.flush(providers);
  //   component.model.amount = 100;
  //   component.model.phone = '+79788043226';
  //   fixture.detectChanges();
  //   fixture.debugElement.nativeElement.querySelector('button').click();
  //   expect(component.isSaving).toBe(true);
  //   httpTestingController.expectOne('/api/v1/recharge').flush('error',{ status: 500, statusText: 'internal error'});
  //   flush();
  //   expect(component.isSaving).toBe(false);
  //   expect(tostrErrorSpy).toHaveBeenCalled();
  // }));

  // it('should submit to backend if form valid and redirect to providers list on success response', fakeAsync(async () => {
  //   let routerSpy = spyOn(router, 'navigate');
  //   let tostrSuccessSpy = spyOn(TestBed.get(ToastrService), 'success').and.callThrough();
  //   providersLoadReq.flush(providers);
  //   component.model.amount = 100;
  //   component.model.phone = '+79788043226';
  //   fixture.detectChanges();
  //   fixture.debugElement.nativeElement.querySelector('button').click();
  //   expect(component.isSaving).toBe(true);
  //   httpTestingController.expectOne('/api/v1/recharge').flush(component.model);
  //   flush();
  //   expect(component.isSaving).toBe(false);
  //   expect(tostrSuccessSpy).toHaveBeenCalled();
  //   expect(routerSpy).toHaveBeenCalledWith(['..']);
  // }));
});


