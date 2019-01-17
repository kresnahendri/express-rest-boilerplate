import createLivenessHandler from '../handlers/liveness/createLivenessHandler'
import getLivenessHandler from '../handlers/liveness/getLivenessHandler'

const init = (app) => {
  app.post('/liveness', createLivenessHandler)
  app.get('/liveness', getLivenessHandler)
}

export default { init }
