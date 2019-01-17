import { of } from 'rxjs'
import {
  map, switchMap, catchError, mapTo,
} from 'rxjs/operators'
import resJsend from '../../helpers/resJsend'
import livenessService from '../../services/livenessService'

const getLivenessHandler = (req, res, next) => {
  return of(req.query).pipe(
    map((query) => query.message || 'Empty message'),
    switchMap((message) => livenessService.getLiveness(message)),
    map((data) => resJsend.success(res, data, 200)),
    mapTo(next()),
    catchError((error) => of(resJsend.error(res, error.message, 505))),
  ).subscribe()
}

export default getLivenessHandler
