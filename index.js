var config
var jQuery = require('jquery')

var _months = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'
]

function common (messageType, msg) {
  var date = new Date()
  var message =
  messageType + ' ' +
  _months[date.getMonth()] + ' ' +
  date.getDate() + ' ' +
  pad(date.getHours()) + ':' +
  pad(date.getMinutes()) + ':' +
  pad(date.getSeconds())
  window.console && console.log(message, msg)
  addClientAlertLogging(message)
}

function pad (value) {
  var text = value + ''
  var padding = '00'
  return padding.substring(0, padding.length - text.length) + text
}

/**
 * Add:
 *  - config.clientLogging.mobileAlertLogging = true
 *
 * By letting jQuery look for an empty div with id '#hidden-on-mobile'
 * which is hidden on mobile devices we can decide to show an alert with
 * the logged message.
 *
 * Ex:
 *
 *  HTML:
 *  <span id="hidden-on-mobile"></span>
 *
 *  CSS:
 *  @media only screen and (max-width: 480px) {
 *     #hidden-on-mobile {
 *       display: none
 *       height: 0
 *       width: 0
 *     }
 *   }
 *
 *
 * @param message
 */

function addClientAlertLogging (message) {
  if (config.clientLogging && config.clientLogging.mobileAlertLogging) {
    if (jQuery('#hidden-on-mobile') && jQuery('#hidden-on-mobile').css('display') === 'none') {
      alert(message)
    }
  }
}

module.exports = {
  setConfig: function (_config) {
    config = _config
  },
  debug: function (message) {
    if (config.clientLogging && config.clientLogging.level === 'debug') {
      common('DEBUG', message)
    }
  },
  error: function (message) {
    common('ERROR', message)
  }
}
