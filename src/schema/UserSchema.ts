import { model, Schema, Types } from 'mongoose';
import UserEntities from '../entities/UserEntitie';
import ProfileEntitie from '../entities/ProfileEntitie';

const UserSchema=new Schema<UserEntities>(
    { 
        userName:{ type:String, required:true},
        userMail:{ type:String, required:true, unique:true},
        userPass:{ type:String, required:true},
        userProfile:{ type: Types.ObjectId, ref:"Profile", required:true},
        userPhoto:{type:String, default:"NoPhoto"},
    },
    {
        versionKey: false
    }
);

export default model("User", UserSchema, "User");