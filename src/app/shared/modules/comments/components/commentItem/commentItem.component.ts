import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {IComment} from '../../types/comment.interface'
import {select, Store} from '@ngrx/store'
import {currentUserSelector} from '../../../../../auth/store/selectors'
import {combineLatest} from 'rxjs/internal/operators/combineLatest'
import {filter, map, Observable, of} from 'rxjs'
import {articleSelector} from '../../../../../article/store/selectors'
import {IArticle} from '../../../../types/article.interface'
import {ICurrentUser} from '../../../../types/currentUser.interface'

@Component({
  selector: 'app-comment-item',
  templateUrl: './commentItem.component.html',
})
export class CommentItemComponent implements OnInit {
  @Input() comment: IComment
  @Output() onRemove = new EventEmitter<number>()
  isAuthor: boolean = false

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((user: ICurrentUser) => {
        this.isAuthor = this.comment.author.username === user.username
      })
  }

  handleClick(id: number) {
    this.onRemove.emit(id)
  }
}
