import { User } from './models/user';
import { UserEdit } from "./views/UserEdit";

const user = User.buildUser({ 
  name: 'Ivan',
  age: 20,
});

const root: HTMLElement | null = document.getElementById('root');

if (root) { 
  const userEdit = new UserEdit(root, user);
  userEdit.render();
}


