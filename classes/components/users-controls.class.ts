import { UserReciever } from '../entities/user-reciever.class.js';
import { Invoker } from '../command.class.js';

export class UsersControlsComponent {
  private containerId: string;
  private conteinerElement!: HTMLElement;

  constructor(
    containerId: string,
    private userReceiver: UserReciever,
    private userInvoker: Invoker
  ) {
    this.containerId = containerId;
    this.init();
  }

  private init() {
    this.conteinerElement = document.getElementById(
      this.containerId
    ) as HTMLElement;

    if (!this.conteinerElement) {
      console.warn('Wrong init element ID', this.containerId);
      return;
    }

    this.userReceiver.subscribe((data) => {
      setTimeout(() => {
        this.display();
        console.log(this.userInvoker.isFirst, this.userInvoker);
      }, 0);
    }, true);
  }

  private display() {
    const usersTemplate = `
      <div style="margin: 10px">
          <button id="undo-btn" style="margin-right: 10px" ${
            this.userInvoker.isFirst ? 'disabled' : ''
          }>Undo</button> 
      </div>`;

    this.conteinerElement.innerHTML = usersTemplate;

    document.getElementById('undo-btn')?.addEventListener('click', () => {
      this.userInvoker.undo();
    });
  }
}
