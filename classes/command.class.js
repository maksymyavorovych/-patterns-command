export class Command {
    constructor() {
        this.message = 'Changes undefined';
    }
    execute(...arg) {
        console.warn('Execute commans is not implemented yet');
    }
    undo() {
        console.warn('Undo commans is not implemented yet');
    }
}
export class Invoker {
    constructor() {
        this.commands = [];
        this.history = [];
    }
    execute(command) {
        command.execute();
        const text = `${new Date().toLocaleString()} - ${command.message}`;
        this.history.push(text);
        this.commands.push(command);
    }
    undo() {
        const command = this.commands.pop();
        this.history.pop();
        command === null || command === void 0 ? void 0 : command.undo();
    }
    get isFirst() {
        return this.commands.length === 0;
    }
    getHistory() {
        return this.history;
    }
}
