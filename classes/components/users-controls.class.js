export class UsersControlsComponent {
    constructor(containerId, userReceiver, userInvoker) {
        this.userReceiver = userReceiver;
        this.userInvoker = userInvoker;
        this.containerId = containerId;
        this.init();
    }
    init() {
        this.conteinerElement = document.getElementById(this.containerId);
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
    display() {
        var _a;
        const usersTemplate = `
      <div style="margin: 10px">
          <button id="undo-btn" style="margin-right: 10px" ${this.userInvoker.isFirst ? 'disabled' : ''}>Undo</button> 
      </div>`;
        this.conteinerElement.innerHTML = usersTemplate;
        (_a = document.getElementById('undo-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.userInvoker.undo();
        });
    }
}
