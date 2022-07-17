interface IObserver<T> {
  value: T;
  subscribe(subcription: (value: T) => void): (value: T) => void;
  unsubscribe(subcription: (value: T) => void): void;
}

export class Observer<T> implements IObserver<T>{
  private actions: Array<(value: T) => void> = [];
  private _value!: T;

  constructor(value?: T) {
    if (value) {
      this._value = value;
    }
  }

  public set value(value: T) {
    this._value = value;
    this.broadcast();
  }

  public get value(): T {
    return this._value;
  }

  public subscribe(
    subcription: (value: T) => void,
    getCurrent?: boolean
  ): (value: T) => void {
    this.actions.push(subcription);
    if (getCurrent) {
      subcription(this._value);
    }
    return subcription;
  }

  public unsubscribe(subcription: (data: T) => void) {
    this.actions = this.actions.filter((sub) => sub !== subcription);
  }

  private broadcast() {
    this.actions.forEach((subscription) => subscription(this._value));
  }
}
