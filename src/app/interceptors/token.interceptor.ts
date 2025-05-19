import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  console.log(token)
  const newReq = req.clone({
    setHeaders:{
      'AuthorAuthorization': `Bearer ${token}`
    }
  });
  return next(newReq);
};
