import { Observer } from '../observer.class.js';
import { Command } from '../command.class.js';
export class UserReciever extends Observer {
    constructor(userList) {
        super();
        this.value = userList || [];
    }
    addUser(newUser, position) {
        const users = [...this.value];
        if (!position) {
            users.push(newUser);
        }
        else {
            users.splice(position, 0, newUser);
        }
        this.value = users;
    }
    removeUser(user) {
        const users = [...this.value];
        const index = users.findIndex((u) => u.id === user.id);
        const removedUser = users[index];
        if (index !== -1) {
            users.splice(index, 1);
            this.value = users;
        }
        return index;
    }
    changeUserName(userId, newName) {
        const users = [...this.value];
        const index = users.findIndex((u) => u.id === userId);
        const oldUser = users[index];
        if (oldUser) {
            const newUser = Object.assign(Object.assign({}, users[index]), { name: newName });
            users.splice(index, 1, newUser);
            this.value = users;
        }
        return oldUser;
    }
    changeUserColor(userId, newColor) {
        const users = [...this.value];
        const index = users.findIndex((u) => u.id === userId);
        const oldUser = users[index];
        if (index !== -1) {
            const newUser = Object.assign(Object.assign({}, users[index]), { color: newColor });
            users.splice(index, 1, newUser);
            this.value = users;
        }
        return oldUser || null;
    }
}
export class AddNewUserCommand extends Command {
    constructor(receiver, newUser) {
        super();
        this.receiver = receiver;
        this.newUser = newUser;
    }
    execute() {
        this.receiver.addUser(this.newUser);
        this.message = `New user has been created id: ${this.newUser.id} (${this.newUser.name} - ${this.newUser.age})`;
    }
    undo() {
        this.receiver.removeUser(this.newUser);
    }
}
export class RemoveUserCommand extends Command {
    constructor(receiver, user) {
        super();
        this.receiver = receiver;
        this.user = user;
    }
    execute() {
        this.message = `User has been removed id: ${this.user.id}`;
        const res = this.receiver.removeUser(this.user);
    }
    undo() {
        if (this.user && this.position !== -1) {
            this.receiver.addUser(this.user, this.position);
        }
    }
}
export class ChangeUserNameCommand extends Command {
    constructor(receiver, userId, newName) {
        super();
        this.receiver = receiver;
        this.userId = userId;
        this.newName = newName;
    }
    execute() {
        var _a;
        this.oldName = (_a = this.receiver.changeUserName(this.userId, this.newName)) === null || _a === void 0 ? void 0 : _a.name;
        this.message = `Name has been changed for id: ${this.userId}. (${this.oldName} => ${this.newName})`;
    }
    undo() {
        this.receiver.changeUserName(this.userId, String(this.oldName));
    }
}
export class ChangeUserColorCommand extends Command {
    constructor(receiver, userId, newColor) {
        super();
        this.receiver = receiver;
        this.userId = userId;
        this.newColor = newColor;
    }
    execute() {
        var _a;
        this.oldColor = (_a = this.receiver.changeUserColor(this.userId, this.newColor)) === null || _a === void 0 ? void 0 : _a.color;
        this.message = `Color has been changed for id: ${this.userId}. (${this.oldColor} => ${this.newColor})`;
    }
    undo() {
        this.receiver.changeUserColor(this.userId, String(this.oldColor));
    }
}
