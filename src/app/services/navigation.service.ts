import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  // values: 'overview' | 'explore' | 'best-practices' | ...
  private _view$ = new BehaviorSubject<string>('overview');
  readonly view$ = this._view$.asObservable();

  go(view: string) {
    this._view$.next(view);
  }

  current(): string {
    return this._view$.getValue();
  }
}
