import { model, Schema } from "mongoose";

export interface Hotel {
    id:string;
    name:string;
    description:string;
    pricePerAdult:number;
    pricePerKid:number;
    isFree:boolean;
    location:string;
    images:string[];
    rating:number;
    totalVotes:number;
}


export const hotelSchema = new Schema<Hotel>(
    {
    name: {type:String, required:true},
    description: {type:String, required:true},
    pricePerAdult:{type:Number, required:true},
    pricePerKid:{type:Number, required:true},
    isFree:{type:Boolean, required:true},
    location:{type:String, required:true},
    images:{type:[String]},
    rating:{type:Number, default: 0},
    totalVotes:{type:Number, default:0},
}, {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true
    })

export const HotelModel = model<Hotel>("HotelModel", hotelSchema);