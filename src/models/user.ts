import { Model } from "./Model";
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { Collection } from "./Collection";

export interface UserProps {
    name?: string;
    age?: number;
    id?: number;
}

const API_URL = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
    static buildUser(attrs: UserProps): User {
        return new User(
           new Attributes<UserProps>(attrs),
           new Eventing(),
           new ApiSync<UserProps>(API_URL)
        );
    }
    
    static buildUserCollection(): Collection<User, UserProps> {
        return  new Collection<User, UserProps>(
            API_URL,
            (json: UserProps) => User.buildUser(json)
        );
    }

    isAdminUser(): boolean {
        return this.get('id') === 1;
    }

    public setRandomAge(): void {
        const age = Math.round(Math.random() * 100);
        console.log(age)
        this.set({ age })
    }
};
