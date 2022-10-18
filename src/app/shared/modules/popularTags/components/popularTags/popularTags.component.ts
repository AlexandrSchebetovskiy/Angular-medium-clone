import {Component, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {
  errorSelector,
  isLoadingSelector,
  tagsSelector,
} from '../../store/selectors'
import {getTagAction} from '../../store/actions/getTags.action'
import {PopularTagType} from '../../../../types/popularTag.type'

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popularTags.component.html',
  styleUrls: ['popularTags.component.scss'],
})
export class PopularTagsComponent implements OnInit {
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  tags$: Observable<PopularTagType[] | null>
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  private fetchData() {
    this.store.dispatch(getTagAction())
  }

  private initializeValues() {
    this.error$ = this.store.pipe(select(errorSelector))
    this.tags$ = this.store.pipe(select(tagsSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
  }
}
