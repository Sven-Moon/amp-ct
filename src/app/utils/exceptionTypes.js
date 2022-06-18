
function UserNotFoundException(message) {
  this.message = message
  this.name = 'UserNotFound'
}

module.exports = { UserNotFoundException }