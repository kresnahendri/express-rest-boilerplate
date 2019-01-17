
import mongoose from 'mongoose'
import { from, defer, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import logger from './logger'
import config from '../config'

const connect = () => {
  const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    promiseLibrary: global.Promise,
    reconnectTries: 3,
    reconnectInterval: 300,
    poolSize: 10,
    autoReconnect: true,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    keepAlive: 1,
  }

  mongoose.Promise = global.Promise
  const gracefulExit = () => {
    mongoose.connection.close(() => {
      logger.error('Mongoose default connection is disconnected through app termination')
      process.exit(0)
    })
  }

  return defer(() => from(mongoose.connect(config.env.MONGO_URL, mongooseOptions))).pipe(
    tap(() => process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit)),
    catchError((error) => of(error).pipe(
      tap(() => logger.error(`Unable to reconnect to mongodb\n${JSON.stringify(error)}`)),
    )),
  ).subscribe()
}

export default { connect }
