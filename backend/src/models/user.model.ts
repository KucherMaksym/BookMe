import { model, Schema } from "mongoose";
import {Hotel, HotelModel, hotelSchema} from "./hotel.model";



export interface User {
    id: string;
    name: string;
    info: string;
    email: string;
    password: string;
    phone:string;
    hotels:Hotel[];
}


export const userSchema = new Schema<User>({
    name:{type:String,required:true},
    info:{type:String},
    email: {type:String,required:true},
    password: {type:String,required:true},
    phone: {type:String},
    // hotels:{type:[hotelSchema]},
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
})

export const UserModel = model<User>("User", userSchema);



