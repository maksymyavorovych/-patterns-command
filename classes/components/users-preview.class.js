import { RemoveUserCommand, } from '../entities/user-reciever.class.js';
export class UsersPreviewComponent {
    constructor(containerId, userReceiver, userInvoker) {
        this.userReceiver = userReceiver;
        this.userInvoker = userInvoker;
        this.userList = [];
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
            this.userList = [...data];
            this.display();
        }, true);
    }
    display() {
        const headerTemplate = `
          <h3>Users preview</h3>
    `;
        const usersTemplate = headerTemplate +
            '<div>' +
            this.userList
                .map((user, index) => {
                return `
          <span style="font-weight: bold; display: inline-block; width: 300px;"> ${index + 1}. ${user.name} - ${user.age} years. </span> 
          <button class="delete-user-btn" user-id="${user.id}">Delete user</button> 
          </br>
          `;
            })
                .join('') +
            '</div>';
        this.conteinerElement.innerHTML = usersTemplate;
        document.querySelectorAll('.delete-user-btn').forEach((btn) => {
            btn.addEventListener('click', (el) => {
                const id = el.target.getAttribute('user-id');
                this.deleteUser(Number(id));
            });
        });
    }
    deleteUser(id) {
        const deletedUser = this.userList.find((u) => u.id === id);
        this.userInvoker.execute(new RemoveUserCommand(this.userReceiver, deletedUser));
    }
}
