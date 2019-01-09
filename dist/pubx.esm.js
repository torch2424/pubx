function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

class PubxService {
  constructor() {
    // Initialize state to nothing
    this.state = {};
  } // Function to return subscriber ids to unsubscribe


  _idGenerator() {
    const idGenerator = () => {
      return Math.random().toString(36).replace(/[^a-z]+/g, "").substr(2, 10);
    };

    const stringId = `${idGenerator()}${idGenerator()}`;
    return stringId.slice();
  } // Function to initialize a state key


  _initializeStateKey(stateKey) {
    this.state[stateKey] = {
      value: undefined,
      subscribers: {}
    };
  } // Function to unsubscribe a subscriber


  unsubscribe_(stateKey, subscriberId) {
    // Check if the stateKey exists
    if (!this.state[stateKey]) {
      return;
    }

    delete this.state[stateKey].subscribers[subscriberId];
  } // Return the current state of a state key


  get(stateKey) {
    if (!this.state[stateKey]) {
      return undefined;
    }

    return this.state[stateKey].value;
  } // Function to subscribe to a state key
  // Returns a function to unsubscribe


  subscribe(stateKey, callback) {
    // Generate a subscriber ID
    const subscriberId = this._idGenerator(); // Check if the stateKey exists


    if (!this.state[stateKey]) {
      this._initializeStateKey(stateKey);
    }

    this.state[stateKey].subscribers[subscriberId] = stateValue => {
      callback(stateValue);
    };

    return () => {
      this.unsubscribe_(stateKey, subscriberId);
    };
  } // Function top update a state value. State value is spread so only have to pass the values you want to change


  publish(stateKey, stateValue) {
    // Check if the stateKey exists
    if (!this.state[stateKey]) {
      this._initializeStateKey(stateKey);
    } // Set the value


    this.state[stateKey].value = _objectSpread({}, this.state[stateKey].value, stateValue); // Call our subscribers, passing back the entire new state

    Object.keys(this.state[stateKey].subscribers).forEach(subscriberKey => {
      this.state[stateKey].subscribers[subscriberKey](_objectSpread({}, this.state[stateKey].value));
    });
  }

} // Return a singleton


const Pubx = new PubxService();

export { Pubx };
