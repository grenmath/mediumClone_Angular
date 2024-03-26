import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {Observable, map, of} from 'rxjs';
// import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
// import {AuthResponseInterface} from '../types/authResponse.interface';
import {environment} from 'src/environments/environment';
import {TotoRequestInterface} from '../types/totoRequest.interface';
import {FormulaIdValue} from '../types/formulasValues.interface';
import {TotoResponseInterface} from '../types/totoResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class TotoService {
  constructor(private http: HttpClient) {}

  //   register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
  //     const url = environment.apiUrl + '/users';
  //     console.log('url: ', url);
  //     return this.http
  //       .post<AuthResponseInterface>(url, data)
  //       .pipe(map((response: AuthResponseInterface) => response.user));
  //   }

  getToto(data: TotoRequestInterface): Observable<FormulaIdValue[]> {
    // const url = environment.apiUrl + '/users';
    // console
    const url = 'https://jsonplaceholder.typicode.com/posts?userId=1&userId=2';
    console.log('url: ', url);

    // return this.http
    //   .post<TotoResponseInterface>(url, data)
    //   .pipe(map((response: TotoResponseInterface) => response.formulasIdsValues));

    // return this.http
    //   .get<TotoResponseInterface>(url)
    //   .pipe(
    //     map((response: TotoResponseInterface) => response.formulasIdsValues)
    //   );
    console.log('data: ', data);

    return of([
      {id: '1', value: '1111111111111'},
      {id: '2', value: '22222222222222'},
      {id: '3', value: '333333333'},
      {id: '4', value: '4444'},
      {id: '5', value: '5'},
    ]);
  }
}
