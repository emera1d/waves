let Locale = {
  getLocale() {
    let params = new URL(location.href).searchParams;
    let locale = params.get('locale');

    locale = locale || navigator.languages[0];

    return locale;
  }
}

let UtilsDate = {
  toLocalString: function(timestamp) {
    let locale = Locale.getLocale();
    let localString = new Date(timestamp).toLocaleString(locale, {
      year: 'numeric',
      month: 'short', // "numeric", "2-digit", "narrow", "short" и "long".
      day: '2-digit' // "numeric" и "2-digit".
    });

    return localString;
  },

  getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
}

let UtilsPhone = {
  format: function(phone) {
    return phone.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5')
  }
}

class Events {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if(!this.events.hasOwnProperty(eventName)) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }

  un(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter(function(fn) {
      return fn != callback;
    });
  }

  fire(eventName, ...args) {
    if(this.events[eventName]) {
      this.events[eventName].forEach(function(callback) {
        callback.apply(null, ...args);
      });
    }
  }
}

export {
  Locale as Locale,
  UtilsDate as UtilsDate,
  UtilsPhone as UtilsPhone,
  Events as Events
}
