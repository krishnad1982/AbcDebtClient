import { Injectable, ErrorHandler, InjectorType, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '../../../node_modules/@angular/common';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class AbcErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector, private notoficationService: NotificationService) { }
  handleError(error: Error | HttpErrorResponse): void {

    const locationStrategy = this.injector.get(LocationStrategy);
    let errorContext = {
      message: error.message ? error.message : error.toString(),
      location: locationStrategy instanceof PathLocationStrategy ? locationStrategy.path() : ''
    };

    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        console.error("No internet connection");
      }
      else {
        console.error(`Api returned status code: ${error.status}`);
        console.error(`Reason: ${errorContext.message} ${errorContext.location}`);
      }
    }
    else {
      console.error(`An error occurred: ${errorContext.message}`);
    }
    this.notoficationService.error(errorContext.message);
    alert(errorContext.message);
  }
}