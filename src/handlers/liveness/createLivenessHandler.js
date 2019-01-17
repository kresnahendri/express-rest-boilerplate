import { of } from 'rxjs'
import {
  map, switchMap, catchError, mapTo,
} from 'rxjs/operators'
import resJsend from '../../helpers/resJsend'
import livenessService from '../../services/livenessService'

const createLivenessHandler = (req, res, next) => {
  return of(req.body).pipe(
    map((bodyRequest) => ({ body_request: bodyRequest })),
    switchMap((payload) => livenessService.createLiveness(payload)),
    map((data) => resJsend.success(res, data, 201)),
    mapTo(next()),
    catchError((error) => of(resJsend.error(res, error.message, 504))),
  ).subscribe()
}

export default createLivenessHandler
