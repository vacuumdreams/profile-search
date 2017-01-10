export const tryThrow: (fn: Function, err) => any = (fn, ErrorConstructor) {
  try {
    return fn()
  } catch (e) {
    throw new ErrorConstructor()
  }
}

export const successHandler = res => data => res.send(200, data)

export const errorHandler = res => err => res.send(err.code || 500, err.msg || 'Something went wrong. Please try later')
