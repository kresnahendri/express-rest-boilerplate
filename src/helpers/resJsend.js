const success = (res, payload, httpStatus = 200) => {
  res.setHeader('Content-Type', 'application/json')
  return res.status(httpStatus)
    .send({
      status: 'success',
      data: payload,
    })
}

const error = (res, message, httpStatus = 500) => {
  res.setHeader('Content-Type', 'application/json')
  return res.status(httpStatus)
    .send({
      status: 'error',
      message,
    })
}

export default { success, error }
