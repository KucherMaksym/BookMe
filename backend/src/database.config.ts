import {connect} from "mongoose";

export const dbConnection = () => {
    connect("mongodb://localhost:27017").then(
        ()=> console.log("success connection"),
        (error) => console.log(error)
    )
};
