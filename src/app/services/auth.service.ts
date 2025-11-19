import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _show$ = new BehaviorSubject<boolean>(false);
  readonly show$ = this._show$.asObservable();

  open() { this._show$.next(true); }
  close() { this._show$.next(false); }
  toggle() { this._show$.next(!this._show$.getValue()); }
}
