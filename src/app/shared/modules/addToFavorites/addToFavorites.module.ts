import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AddToFavoritesComponent} from './components/addToFavorites.component'
import {HttpClientModule} from '@angular/common/http'
import {AddToFavoritesService} from './services/addToFavorites.service'
import {EffectsModule} from '@ngrx/effects'
import {AddToFavoritesEffect} from './store/effects/addToFavorites.effect'
import {RouterModule} from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule.forFeature([AddToFavoritesEffect]),
    RouterModule,
  ],
  declarations: [AddToFavoritesComponent],
  exports: [AddToFavoritesComponent],
  providers: [AddToFavoritesService],
})
export class AddToFavoritesModule {}
