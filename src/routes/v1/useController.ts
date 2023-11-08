import { IUser } from '../../models/user';
import { User } from '../../models/user';

export const CreateNewUser = (user: IUser) => {
    const newUser = new User(user);
    return newUser.save();
}

export const DeleteUser = (id: number) => {
    return User.findOneAndDelete({"id": id}).then(user => console.log('User deleted:', user));
}
export const GetUser = (id: number) =>{
    return User.findOne({"id": id}).then(user => user);
}

export const GetAllUser =  () =>{
    return User.find().then(users => users);
}

export const UpdateUser=  (id: number, body: IUser) =>{
    return User.findOneAndUpdate({"id": id}, body, {new: true}).then(user => user);
}