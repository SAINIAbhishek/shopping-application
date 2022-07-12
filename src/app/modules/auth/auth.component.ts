import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../models/state';
import * as AuthActions from './store/auth.actions';
import {AlertComponent} from '../alert/alert.component';
import {PlaceholderDirective} from '../../directives/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit, OnDestroy {

  private _isLoginMode = true;

  private _isLoading = false;

  private _closeSub: Subscription;

  private _storeSub: Subscription;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(private _store: Store<AppState>,
              private _componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this._storeSub = this._store.select('auth').subscribe(authState => {
      this._isLoading = authState.loading;
      if (!!authState.authError) {
        this._showErrorAlert(authState.authError);
      }
    });
  }

  private _showErrorAlert(message: string) {
    const alertCmpFactory = this._componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this._closeSub = componentRef.instance.close.subscribe(() => {
      this._closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  public onSwitchMode() {
    this._isLoginMode = !this._isLoginMode;
  }

  public onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    this._isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    if (this._isLoginMode) {
      this._store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      this._store.dispatch(
        new AuthActions.SignupStart({ email: email, password: password })
      );
    }

    form.reset();
  }

  get isLoginMode(): boolean {
    return this._isLoginMode;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  ngOnDestroy() {
    if (this._closeSub) {
      this._closeSub.unsubscribe();
    }
    if (this._storeSub) {
      this._storeSub.unsubscribe();
    }
  }

}
