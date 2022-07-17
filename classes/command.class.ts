export interface ICommand {
  execute(...arg: any): void;
  undo(): void;
  message?: string;
}

export class Command implements ICommand {
  public message = 'Changes undefined';
  public execute(...arg: any): void {
    console.warn('Execute commans is not implemented yet');
  }
  public undo(): void {
    console.warn('Undo commans is not implemented yet');
  }
}

export interface IInvoker {
  execute(...args: any): void;
  undo(): void;
}

export class Invoker implements IInvoker {
  private commands: Array<Command> = [];
  private history: Array<string> = [];

  public execute(command: Command): void {
    command.execute();
    const text: string = `${new Date().toLocaleString()} - ${command.message}`;
    this.history.push(text);
    this.commands.push(command);
  }

  public undo(): void {
    const command = this.commands.pop();
    this.history.pop();
    command?.undo();
  }

  public get isFirst(): boolean {
    return this.commands.length === 0;
  }

  public getHistory(): Array<string> {
    return this.history;
  }
}
