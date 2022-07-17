export class Observer {
    constructor(value) {
        this.actions = [];
        if (value) {
            this._value = value;
        }
    }
    set value(value) {
        this._value = value;
        this.broadcast();
    }
    get value() {
        return this._value;
    }
    subscribe(subcription, getCurrent) {
        this.actions.push(subcription);
        if (getCurrent) {
            subcription(this._value);
        }
        return subcription;
    }
    unsubscribe(subcription) {
        this.actions = this.actions.filter((sub) => sub !== subcription);
    }
    broadcast() {
        this.actions.forEach((subscription) => subscription(this._value));
    }
}
