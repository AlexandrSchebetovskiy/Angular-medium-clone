import {Component, Input, OnDestroy, OnInit} from '@angular/core'
import {filter, Observable, Subscription} from 'rxjs'
import {select, Store} from '@ngrx/store'
import {IComment} from '../../types/comment.interface'
import {
  commentsSelector,
  errorSelector,
  isLoadingSelector,
} from '../../store/selectors'
import {getCommentsActions} from '../../store/actions/getComments.actions'
import {removeCommentAction} from '../../store/actions/removeComment.action'
import {isLoggedInSelector} from '../../../../../auth/store/selectors'
import {ICommentRequest} from '../../types/commentRequest.interface'
import {addCommentAction} from '../../store/actions/addComment.action'

@Component({
  selector: 'app-article-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input('slug') slugProp: string

  isLoggedIn$: Observable<boolean>
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  commentsSub: Subscription
  comments: IComment[]

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnDestroy(): void {
    this.commentsSub.unsubscribe()
  }

  addComment(comment: ICommentRequest) {
    this.store.dispatch(addCommentAction({slug: this.slugProp, comment}))
  }

  removeComment(id: number) {
    this.store.dispatch(removeCommentAction({id: id, slug: this.slugProp}))
    this.comments = this.comments.filter((c) => c.id !== id)
  }

  private fetchData() {
    this.store.dispatch(getCommentsActions({slug: this.slugProp}))
  }

  private initializeValues() {
    this.isLoggedIn$ = this.store.pipe(
      select(isLoggedInSelector),
      filter(Boolean)
    )
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
  }

  private initializeListeners() {
    this.commentsSub = this.store
      .pipe(select(commentsSelector), filter(Boolean))
      .subscribe((comments) => {
        this.comments = comments
      })
  }
}
