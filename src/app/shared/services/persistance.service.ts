import {Injectable} from '@angular/core'

@Injectable()
export class PersistanceService {
  set(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Error saving to localStorage', e)
    }
  }
  get(key: string): any {
    try {
      const json = localStorage.getItem(key)
      if (!json) return null
      return JSON.parse(json)
    } catch (e) {
      console.error('Error getting data from localStorage')
      return null
    }
  }
}
