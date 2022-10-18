import {IArticle} from '../../../types/article.interface'

export interface IFeedResponse {
  articles: IArticle[]
  articlesCount: number
}
