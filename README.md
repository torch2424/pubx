# pubx
Really simple pub/sub state management 📋


A State management sytem based around passing events through pub/sub. Meant to be easy, and lightweight.

State will be a JSON object, where the state object keys are an json object. e.g publish('myKey', newKeyState) => this.state.myKey = newKeyState

state objects will have two properties:

value: The current value of the state

subscribers: Json object keyed by random subscriber Ids, that are equal to the callbacks assigned to them

