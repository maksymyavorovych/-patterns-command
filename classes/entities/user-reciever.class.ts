import { Observer } from '../observer.class.js';
import { IUser } from '../../interfaces/user.js';
import { Command } from '../command.class.js';

export class UserReciever extends Observer<Array<IUser>> {
  constructor(userList: Array<IUser>) {
    super();
    this.value = userList || [];
  }

  public addUser(newUser: IUser, position?: number): void {
    const users = [...this.value];
    if (!position) {
      users.push(newUser);
    } else {
      users.splice(position, 0, newUser);
    }

    this.value = users;
  }

  public removeUser(user: IUser): number {
    const users = [...this.value];
    const index = users.findIndex((u) => u.id === user.id);
    const removedUser = users[index];
    if (index !== -1) {
      users.splice(index, 1);
      this.value = users;
    }
    return index;
  }

  public changeUserName(userId: number, newName: string): IUser | undefined {
    const users = [...this.value];
    const index = users.findIndex((u) => u.id === userId);
    const oldUser = users[index];
    if (oldUser) {
      const newUser = { ...users[index], name: newName };

      users.splice(index, 1, newUser);
      this.value = users;
    }
    return oldUser;
  }

  public changeUserColor(userId: number, newColor: string): IUser | undefined {
    const users = [...this.value];

    const index = users.findIndex((u) => u.id === userId);
    const oldUser = users[index];
    if (index !== -1) {
      const newUser = { ...users[index], color: newColor };

      users.splice(index, 1, newUser);
      this.value = users;
    }
    return oldUser || null;
  }
}

export class AddNewUserCommand extends Command {
  constructor(private receiver: UserReciever, private newUser: IUser) {
    super();
  }

  public execute() {
    this.receiver.addUser(this.newUser);
    this.message = `New user has been created id: ${this.newUser.id} (${this.newUser.name} - ${this.newUser.age})`;
  }

  public undo() {
    this.receiver.removeUser(this.newUser);
  }
}

export class RemoveUserCommand extends Command {
  private position?: number;

  constructor(private receiver: UserReciever, private user: IUser) {
    super();
  }

  public execute(): void {
    this.message = `User has been removed id: ${this.user.id}`;
    const res = this.receiver.removeUser(this.user);
  }

  public undo(): void {
    if (this.user && this.position !== -1) {
      this.receiver.addUser(this.user, this.position);
    }
  }
}

export class ChangeUserNameCommand extends Command {
  private oldName?: string;

  constructor(
    private receiver: UserReciever,
    private userId: number,
    private newName: string
  ) {
    super();
  }

  public execute(): void {
    this.oldName = this.receiver.changeUserName(
      this.userId,
      this.newName
    )?.name;
    this.message = `Name has been changed for id: ${this.userId}. (${this.oldName} => ${this.newName})`;
  }

  public undo(): void {
    this.receiver.changeUserName(this.userId, String(this.oldName));
  }
}

export class ChangeUserColorCommand extends Command {
  private oldColor?: string;

  constructor(
    private receiver: UserReciever,
    private userId: number,
    private newColor: string
  ) {
    super();
  }

  public execute(): void {
    this.oldColor = this.receiver.changeUserColor(
      this.userId,
      this.newColor
    )?.color;
    this.message = `Color has been changed for id: ${this.userId}. (${this.oldColor} => ${this.newColor})`;
  }

  public undo(): void {
    this.receiver.changeUserColor(this.userId, String(this.oldColor));
  }
}
