import { from } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

const createLiveness = (data) => {
  const createLivenessPromise = () => new Promise((resolve) => resolve(data))

  return from(createLivenessPromise()).pipe(
    map((result) => result),
    catchError((error) => error),
  )
}

const getLiveness = (message) => {
  const getLivenessPromise = () => new Promise((resolve) => resolve('You are live!'))

  return from(getLivenessPromise()).pipe(
    map((result) => {
      return { result, message }
    }),
    catchError((error) => error),
  )
}

export default {
  createLiveness,
  getLiveness,
}
