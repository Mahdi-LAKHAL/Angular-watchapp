
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Montre } from '../models/montre';


@Injectable({
  providedIn: 'root'
})
export class MontreService {

  constructor(private http: HttpClient) { }
  private montreUrl = 'api/montres';

  // Log function for Console
  private log(log: string) {
    console.info(log);
  }

  // Handle Error
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log('${operation} failed: ${error.message}');
      return of(result as T);
    };
  }

  //Return all montres
  getMontres(): Observable<Montre[]> {
    return this.http.get<Montre[]>(this.montreUrl).pipe(
      tap(_ => this.log('fetched montre')),
      catchError(this.handleError('get Montres', []))
    );
  }
  
  // Add Montre
  addMontre(montre: Montre): Observable<Montre> {
    const url = `${this.montreUrl}`; 
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    };
    return this.http.post<Montre>(url, montre, httpOptions).pipe(
      tap(_ => this.log(`ajouter montre id= ${montre.id}`)),
      catchError((this.handleError<any>('ajouter montre')))
    );
  }

// Display Montre by Id : Get watch by Id 
// montreUrl = 'api/montres/:id'
displayMontre(id: number): Observable<Montre> {
  const url = `${this.montreUrl}/${id}`;
  const httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' })
  };
  return this.http.get<Montre>(url, httpOptions).pipe(
    tap(_ => this.log(`display montre id= ${id}`)),
    catchError((this.handleError<any>('display montre')))
  );
}

 // Delete Montre
 // montreUrl = 'api/montres/:id'
deleteMontre(montre: Montre): Observable<Montre> {
  const url = `${this.montreUrl}/${montre.id}`;
  const httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' })
  };
  return this.http.delete<Montre>(url, httpOptions).pipe(
    tap(_ => this.log(`delete montre id= ${montre.id}`)),
    catchError((this.handleError<any>('Delete montre')))
  );
}

// Edit Watch:
updateMontre(montre: Montre): Observable<Montre> {
  const httpOptions = {
    headers: new HttpHeaders({ 'content-Type': 'application/json'})
  };

  return this.http.put(this.montreUrl, montre, httpOptions).pipe(
    tap(_ => this.log(`updated montre id=${montre.id}`)),
    catchError(this.handleError<any>('updated montre'))
  );
}
 

// Search Watchs:
  searchMontre(term: string): Observable <Montre[]> {
    if (!term.trim()){
     return of([]);
   }
   return this.http.get<Montre[]>(`${this.montreUrl}/?marque=${term}`).pipe(
   tap(_ => this.log(`found montres matching "${term}"`)),
   catchError(this.handleError<Montre []>('search montres', []))
   ); 
  }


}
