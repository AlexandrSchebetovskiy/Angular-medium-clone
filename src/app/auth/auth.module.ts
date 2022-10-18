import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule, Routes} from '@angular/router'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {RegisterComponent} from './components/register/register.component'
import {StoreModule} from '@ngrx/store'
import {reducer} from './store/reducers'
import {AuthService} from './services/authService'
import {EffectsModule} from '@ngrx/effects'
import {RegisterEffect} from './store/effects/register.effect'
import {BackendErrorMessagesModule} from '../shared/modules/backendErrorMessages/backendErrorMessages.module'
import {PersistanceService} from '../shared/services/persistance.service'
import {LoginComponent} from './components/login/login.component'
import {LoginEffect} from './store/effects/login.effect'
import {GetCurrentUserEffect} from './store/effects/getCurrentUser.effect'
import {UpdateCurrentUserEffect} from './store/effects/updateCurrentUser.effect'
import {LogoutEffect} from './store/effects/logout.effect'

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BackendErrorMessagesModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffect,
      UpdateCurrentUserEffect,
      LogoutEffect,
    ]),
  ],
  exports: [RouterModule],
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, PersistanceService],
})
export class AuthModule {}
