import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TaskStepService {
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) {}
}
