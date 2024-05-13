import {model, Schema} from "mongoose";


export interface Message {
    roomId: string;
    text: string;
    sender: string
}

export const messageSchema  = new Schema<Message>({
    roomId:{type:String,required:true},
    text: {type: String, required:true},
    sender: {type:String, required:true},
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
})

export const messageModel = model<Message>("messages", messageSchema)


