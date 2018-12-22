'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class PubxService {
  constructor() {
    // Initialize state to nothing
    this.state = {};
  }

  // Function to return subscriber ids to unsubscribe
  _idGenerator() {
    const idGenerator = () => {
      return Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(2, 10);
    };

    const stringId = `${idGenerator()}${idGenerator()}`;
    return stringId.slice();
  }

  // Function to initialize a state key
  _initializeStateKey(stateKey) {
    this.state[stateKey] = {
      value: undefined,
      subscribers: {}
    };
  }

  // Function to unsubscribe a subscriber
  unsubscribe_(stateKey, subscriberId) {
    // Check if the stateKey exists
    if (!this.state[stateKey]) {
      return;
    }

    delete this.state[stateKey].subscribers[subscriberId];
  }


  // Return the current state of a state key
  get(stateKey) {
    if (!this.state[stateKey]) {
      return undefined;
    }

    return this.state[stateKey].value;
  }

  // Function to subscribe to a state key
  // Returns a function to unsubscribe
  subscribe(stateKey, callback) {
    // Generate a subscriber ID
    const subscriberId = this._idGenerator();

    // Check if the stateKey exists
    if (!this.state[stateKey]) {
      this._initializeStateKey(stateKey);
    }

    this.state[stateKey].subscribers[subscriberId] = stateValue => {
      callback(stateValue);
    };

    return () => {
      this.unsubscribe_(stateKey, subscriberId);
    };
  }

  // Function top update a state value. State value is spread so only have to pass the values you want to change
  publish(stateKey, stateValue) {
    // Check if the stateKey exists
    if (!this.state[stateKey]) {
      this._initializeStateKey(stateKey);
    }

    // Set the value
    this.state[stateKey].value = {
      ...this.state[stateKey].value,
      ...stateValue
    };

    // Call our subscribers, passing back the entire new state
    Object.keys(this.state[stateKey].subscribers).forEach(subscriberKey => {
      this.state[stateKey].subscribers[subscriberKey]({
        ...this.state[stateKey].value
      });
    });
  }
}

// Return a singleton
const Pubx = new PubxService();

exports.Pubx = Pubx;
