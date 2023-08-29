import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk0NTk4ODU4LCJpYXQiOjE2OTMzMDI4NTgsImp0aSI6ImIyZGJiNjA4ZTE2YzQ0N2RiOTUwNzQ5OTNmYzU1ZmU4IiwidXNlcl9pZCI6MSwicm9sZXMiOlsiQWRtaW4iLCJNYW5hZ2VyIiwiQWdlbnQiXSwiZnVsbF9uYW1lIjoiUmFnaHZlbmRyYSBLdW1hciIsInBlcm1pc3Npb25zIjpbImFkZF91c2VyIiwiZWRpdF91c2VyIiwibGlzdHNfdXNlciIsImRlbGV0ZV91c2VyIiwidmlld191c2VyIiwiYWRkX3JvbGUiLCJlZGl0X3JvbGUiLCJsaXN0X3JvbGUiLCJkZWxldGVfcm9sZSIsInZpZXdfcm9sZSIsImFkZF9sZWFkIiwiZWRpdF9sZWFkIiwibGlzdF9sZWFkIiwiZGVsZXRlX2xlYWQiLCJ2aWV3X2xlYWQiLCJhZGRfdG9kbyIsImVkaXRfdG9kbyIsImxpc3RfdG9kbyIsImRlbGV0ZV90b2RvIiwidmlld190b2RvIiwiYXNzaWduX3RvZG8iLCJhZGRfcm9sZSIsImVkaXRfcm9sZSIsImxpc3Rfcm9sZSIsInZpZXdfcm9sZSIsImFkZF9sZWFkIiwiZWRpdF9sZWFkIiwiZGVsZXRlX2xlYWQiLCJ2aWV3X2xlYWQiLCJhZGRfdG9kbyIsImxpc3RfdG9kbyIsImRlbGV0ZV90b2RvIiwidmlld190b2RvIiwiYWRkX3VzZXIiLCJlZGl0X3VzZXIiLCJ2aWV3X3VzZXIiLCJhZGRfcm9sZSJdLCJvcmdhbml6YXRpb25faWQiOjEsInNob3dfaGlkZV9tb2R1bGUiOlsibGVhZF92b2ljZV9jYWxsIiwibGVhZF9zZW5kX3NtcyIsImxlYWRfc2VuZF93aGF0c2FwcCIsImxlYWRfc2VuZF9lbWFpbCIsImxlYWRfY3JlYXRlX25vdGUiLCJzaW5nbGVfbGVhZF90aW1lbGluZSIsImxlYWRfZGVsZXRlIiwibGVhZF9pbmZvX2ljb24iLCJ0YWtlX2FwcG9pbnRtZW50X2J1dHRvbiJdfQ.r96FJeOIqhVj3r9LVOHyvv3RBK0Ges6O96x11YXfXE8';

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });

    return next.handle(modifiedRequest);
  }
}
