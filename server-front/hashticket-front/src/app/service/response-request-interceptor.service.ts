import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ResponseRequestInterceptorService implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.status == 403) {
        this._authService.logout();
        this._snackBar.open('Error de autenticación o vencimiento del token. Realice login de nuevo o estas intentando acceder a un recurso no permitido', 'Cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 20000,
          panelClass: ['red-snackbar'],
        }).afterDismissed().subscribe(item => this.router.navigateByUrl("/signin"));
        
      }else if(error.status == 401){
        this._snackBar.open('Error de autenticación, valida tu usuario o contraseña', 'Cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 20000,
          panelClass: ['red-snackbar'],
        }).afterDismissed().subscribe(item => this.router.navigateByUrl("/signin"));
      }else if(error.status == 500 ){
        this._snackBar.open(`Error: ${error.error?.message}`, 'Cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 20000,
          panelClass: ['red-snackbar'],
        });
      }
      return throwError(errorMsg);
    }));
  }
}
