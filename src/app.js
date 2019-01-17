import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'
import routes from './routes'
import logger from './helpers/logger'
import mongodb from './helpers/mongodb'

class App {
  app = express()

  init() {
    this.applyMidleware()
    this.applyRoutes()
    this.applyNextMidleware()
    this.listen()
  }

  applyMidleware() {
    mongodb.connect()
    this.app.use(cors())
    this.app.use(morgan('dev'))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
  }

  applyNextMidleware() {
    this.app.use(() => logger.info('It is NextFunction'))
  }

  applyRoutes() {
    routes.init(this.app)
  }

  listen() {
    this.app.listen(config.env.PORT, (error) => {
      if (error) return logger.error(error)
      return logger.info(`This server is running on port ${config.env.PORT}`)
    })
  }
}

const app = new App()
app.init()
