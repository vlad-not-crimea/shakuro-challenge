import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule, TestRequest, HttpTestingController } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

import { CellProvidersListComponent } from './cell-providers-list.component';
import { PageLoaderModule } from '@ui/page-loader/page-loader.module';
import { CellProviderComponent } from './cell-provider/cell-provider.component';
import { By } from '@angular/platform-browser';
import { PageLoaderComponent } from '@ui/page-loader/page-loader.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

const providers = [
  { id: 1, name: 'mtc' },
  { id: 2, name: 'beeline' },
  { id: 3, name: 'megaphone' },
  { id: 4, name: 'vodafone' },
  { id: 5, name: 'AT&T' }
]

@Component({selector: 'app-dummy', template: ''})
export class DummyComponent {

}

describe('CellProvidersListComponent', () => {
  let component: CellProvidersListComponent;
  let fixture: ComponentFixture<CellProvidersListComponent>;
  let httpTestingController: HttpTestingController;
  let providersLoadReq: TestRequest;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        PageLoaderModule,
        RouterModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {path: ':providerId', component: DummyComponent}
        ])
      ],
      declarations: [ CellProvidersListComponent, CellProviderComponent, DummyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(CellProvidersListComponent);
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

  it('should show loader while loading providers', fakeAsync(() => {
    expect(fixture.debugElement.query(By.directive(PageLoaderComponent))).toBeTruthy();
  }));

  it('should show providers list when providers loaded', fakeAsync(() => {
    providersLoadReq.flush(providers);
    flush();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(CellProviderComponent))).toBeTruthy();
  }));

  it('should navigate to recharge form on provider click', fakeAsync(async () => {
    let location = TestBed.get(Location);
    providersLoadReq.flush(providers);
    flush();
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('app-cell-provider').click();
    await fixture.whenStable();
    expect(location.path()).toEqual('/1');
  }))

});
