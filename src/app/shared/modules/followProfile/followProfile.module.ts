import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FollowProfileComponent} from './components/followProfile.component'
import {HttpClientModule} from '@angular/common/http'
import {FollowProfileService} from './services/followProfile..service'
import {RouterModule} from '@angular/router'
import {EffectsModule} from '@ngrx/effects'
import {FollowProfileEffect} from './store/effects/addToFavorites.effect'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    EffectsModule.forFeature([FollowProfileEffect]),
  ],
  declarations: [FollowProfileComponent],
  exports: [FollowProfileComponent],
  providers: [FollowProfileService],
})
export class FollowProfileModule {}
