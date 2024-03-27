import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
// import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {Observable, map} from 'rxjs';
// import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
// import {AuthResponseInterface} from '../types/authResponse.interface';
import {FormulaIdValue} from '../types/formulasValues.interface';
import {TotoRequestInterface} from '../types/totoRequest.interface';

@Injectable({providedIn: 'root'})
export class TotoService {
  constructor(private http: HttpClient) {}

  // WARN => onDestroy lifecycle hooks only exist on services when they are not
  // used as singletons (provided in root), but only when they are provided in
  // components and are thereby linked to the components lifecycle
  // private destroy$ = new Subject<boolean>();

  getToto(data: TotoRequestInterface): Observable<FormulaIdValue[]> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    console.log('url: ', url);

    // return this.http
    //   .post<TotoResponseInterface>(url, data)
    //   .pipe(map((response: TotoResponseInterface) => response.formulasIdsValues));

    /// mock fake call
    // return timer(3000).pipe(
    return this.http.get<any>(url).pipe(
      // takeUntil(this.destroy$),
      map((response) => {
        console.log('response: ', response);
        return [
          {id: '1', value: '1111111111111'},
          {id: '2', value: '22222222222222'},
          {id: '3', value: '333333333'},
          {id: '4', value: '4444'},
          {id: '5', value: '5'},
        ];
      })
    );

    // console.log('data: ', data);
    // return of([
    //   {id: '1', value: '1111111111111'},
    //   {id: '2', value: '22222222222222'},
    //   {id: '3', value: '333333333'},
    //   {id: '4', value: '4444'},
    //   {id: '5', value: '5'},
    // ]).pipe(delay(3000));
  }

  // cancelCalls() {
  //   this.destroy$.next(true);
  //   this.destroy$.complete();
  // }
}
