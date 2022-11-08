import { model, Schema } from "mongoose";
import ProfileEntitie from '../entities/ProfileEntitie';

const ProfileSchema = new Schema<ProfileEntitie>({
    profileName:{type:String, required:true, unique:true, trim:true},
    profileStatus:{type:Number, enum:[1,2,3], default:1},

},{versionKey:false});

export default model("Profile", ProfileSchema, "Profile");