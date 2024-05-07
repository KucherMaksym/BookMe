import {Hotel} from "./Hotel";

export class User {
  id!:string;
  name!:string;
  info!:string;
  email!:string;
  password!:string;
  phone!:string;
  hotels!:Hotel[];
}
