import { User, UserProps } from "../models/user";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
    eventsMap(): { [key: string]: () => void } {
        return {
            'click.set-age': this.onSetAgeClick.bind(this),
            'click.set-name': this.onSetNameClick.bind(this),
            'click.save-model': this.onSaveClick.bind(this)
        };
    }

    onSaveClick(): void {
        const input: HTMLInputElement | null = this.parent.querySelector('input');
        const name = input!.value;
        if (name) {
            this.model.set({ name });
        }
        this.model.save();
    }

    onSetNameClick(): void {
        const input: HTMLInputElement | null = this.parent.querySelector('input');
        const name = input!.value;
        if (name) {
            this.model.set({ name });
        }
    }

    onSetAgeClick(): void {
        this.model.setRandomAge();
    }

    template(): string {
        return `
           <div>
                <input placeholder=${this.model.get('name')} />
                <button class="set-name">Click me</button>
                <button class="set-age">Set random age</button>
                <button class="save-model">Save user</button>
           </div>
        `;
    }
}