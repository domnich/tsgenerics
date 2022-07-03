import { User, UserProps } from "../models/user";
import { UserForm } from "./UserForm";
import { UserShow } from "./UserShow";
import { View } from "./View";


export class UserEdit extends View<User, UserProps> {
   public regionsMap(): { [key: string]: string; } {
       return {
           userShow: '.user-show',
           userForm: '.user-form'
       }
   }

   public onRender(): void {
       const userShow = new UserShow(this.regions.userShow, this.model);
       userShow.render();

       const userForm = new UserForm(this.regions.userForm, this.model);
       userForm.render();
   }

    public template(): string {
        return `
            <div>
                <div class="user-show"></div>
                <div class="user-form"></div>
            </div>
        `;
    }
}