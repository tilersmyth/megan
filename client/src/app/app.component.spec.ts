import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Apollo } from 'apollo-angular';
import { RouterTestingModule } from '@angular/router/testing';
/**
 * Load the implementations that should be tested
 */
import { AppComponent } from './app.component';
import { AppState } from './app.service';
import { AuthService, JwtService } from './auth';

describe(`App`, () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  /**
   * async beforeEach
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ AppComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [Apollo, AppState, AuthService, JwtService]
    })
    /**
     * Compile template and css
     */
    .compileComponents();
  }));

  /**
   * Synchronous beforeEach
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp    = fixture.componentInstance;

    /**
     * Trigger initial data binding
     */
    fixture.detectChanges();
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it(`should be @TipeIO`, () => {
    expect(comp.twitter).toEqual('https://twitter.com/gdi2290');
    expect(comp.tipe).toEqual('assets/img/tipe.png');
    expect(comp.name).toEqual('Angular Starter');
  });

  it('should log ngOnInit', () => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    comp.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  });

});
