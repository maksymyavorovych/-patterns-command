import { Names, Colors } from '../../data/data.js';
import { AddNewUserCommand, RemoveUserCommand, ChangeUserColorCommand, ChangeUserNameCommand, } from '../entities/user-reciever.class.js';
export class UsersListComponent {
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
            setTimeout(() => {
                this.userList = [...data];
                this.display();
            }, 0);
        }, true);
    }
    display() {
        const headerTemplate = `
          <h2>Users - common</h2>
          <div>
            <button id="add-user">Add user</button>
          </div>
          <div class="user-row user-header-row">
            <div class="user-id"> ID </div>
            <div class="user-name"> Name </div>
            <div class="user-age"> Age </div>
            <div class="user-actions"> Actions </div>
          </div>
    `;
        const usersTemplate = headerTemplate +
            '<div style="min-height: 200px">' +
            this.userList
                .map((user) => {
                return `

          <div class="user-row" user-id="${user.id}">
            <div class="user-id"> ${user.id}</div>
            <div class="user-name" style="color:${user.color}">${user.name} </div>
            <div class="user-age"> ${user.age}</div>
            <div class="user-actions" user-id="${user.id}">
              <button class="change-user-name-btn">Change name</button>
              <button class="change-user-color-btn">Change color</button>
              <button class="delete-user-btn">Delete user</button>
            </div>

          </div>
          `;
            })
                .join('') +
            '</div>' +
            `
    <div style="border: 1px solid grey; margin: 10px 0;"><h5 style="margin: 5px"> Changes history: <h5>
    ` +
            '<ul>' +
            this.userInvoker
                .getHistory()
                .map((item, index) => {
                return `

            <li style="color: brown; font-family: monospace; font-size: 14px;">
              ${index + 1}: 
              ${item}
              ${index + 1 === this.userInvoker.getHistory().length
                    ? ' <span style="color:blue"><<<</span>'
                    : ''}
            </li>

        `;
            })
                .join('') +
            '</ul></div>';
        this.conteinerElement.innerHTML = usersTemplate;
        document.querySelectorAll('.change-user-name-btn').forEach((btn) => {
            btn.addEventListener('click', (el) => {
                const id = el.target.parentElement.getAttribute('user-id');
                this.cangeUserName(Number(id));
            });
        });
        document.querySelectorAll('.change-user-color-btn').forEach((btn) => {
            btn.addEventListener('click', (el) => {
                const id = el.target.parentElement.getAttribute('user-id');
                this.changeUserColor(Number(id));
            });
        });
        document.querySelectorAll('.delete-user-btn').forEach((btn) => {
            btn.addEventListener('click', (el) => {
                const id = el.target.parentElement.getAttribute('user-id');
                this.deleteUser(Number(id));
            });
        });
        document.querySelectorAll('#add-user').forEach((el) => el.addEventListener('click', () => {
            this.addUser();
        }));
    }
    addUser() {
        const newUser = {
            id: Date.now(),
            color: Colors[Math.round(Math.random() * (Colors.length - 1))],
            name: Names[Math.round(Math.random() * (Names.length - 1))],
            age: Math.round(Math.random() * 40 + 25),
        };
        this.userInvoker.execute(new AddNewUserCommand(this.userReceiver, newUser));
    }
    cangeUserName(id) {
        const nameId = Math.round(Math.random() * (Names.length - 1));
        this.userInvoker.execute(new ChangeUserNameCommand(this.userReceiver, id, Names[nameId]));
    }
    changeUserColor(id) {
        const colorId = Math.round(Math.random() * (Colors.length - 1));
        this.userInvoker.execute(new ChangeUserColorCommand(this.userReceiver, id, Colors[colorId]));
    }
    deleteUser(id) {
        const deletedUser = this.userList.find((u) => u.id === id);
        this.userInvoker.execute(new RemoveUserCommand(this.userReceiver, deletedUser));
    }
}
