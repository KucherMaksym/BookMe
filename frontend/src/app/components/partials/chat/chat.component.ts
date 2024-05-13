import {Component, inject, OnInit} from '@angular/core';
import {Socket } from "ngx-socket-io";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {User} from "../../../../models/User";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

interface ServerMessage {
  text: string;
  sender: string;
}


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',


})

export class ChatComponent implements OnInit {


  showChatList = false;

  toggleChatList() {
    this.showChatList = !this.showChatList;
  }

  currentUserId = new BehaviorSubject<string>("");

  private socket = inject(Socket);
  currentRecipientId!: string;
  currentRecipientName!: string;
  currentRoomId!: string;
  messages: {
    text: string,
    sender: string
  }[] = [];
  message: string = '';
  allUsers: User[] = [];
  user!:User;


  constructor(private authService:AuthService,private userService:UserService,private http:HttpClient) {
    this.userService.getAllUsers().subscribe( (users) =>{
      this.allUsers = users;
      console.log(this.allUsers)
    })
  }

  ngOnInit() {
    this.authService.user$.subscribe((user: any) => {
      this.user = user;
      if (this.user) {
        this.socket.connect();
        this.initSocketListeners();
        // this.socket.on('message', (messages: ServerMessage[]) => {
        //   this.handleNewMessages(messages);
        // });
      }
    });
  }

  initSocketListeners() {
    this.socket.on('initMessages', (messages: ServerMessage[]) => {
      this.handleInitMessages(messages);
    });

    this.socket.on('message', (messages: ServerMessage) => {
      this.messages.push({text: messages.text, sender: messages.sender});
    });
  }

  handleInitMessages(messages: ServerMessage[]) {
    this.messages = messages.map(({ text, sender }) => ({
      text,
      sender
    }));
    console.log(this.messages);
  }

  handleNewMessages(messages: ServerMessage[]) {
    console.log(messages);
    this.messages = messages.map(({ text, sender }) => ({
      text,
      sender
    }));
    console.log(this.messages);
  }

  changeCurrentChat(userId: string, username:string) {
    this.currentUserId.next(userId);
    this.socket.emit("leaveRoom", this.currentRoomId);
    this.messages = [];
    this.currentRecipientId = userId;
    this.currentRecipientName = username;
    const userIds = [this.user.id, this.currentRecipientId];
    this.currentRoomId = userIds.sort().join('-');
    this.socket.emit('joinChat', this.user.id, this.currentRecipientId);
  }

  sendMessages() {
    const message = this.message;
    const userIds = [this.user.id, this.currentRecipientId];
    const roomId = userIds.sort().join('-');
    const currentUser = this.user.id
    this.socket.emit('newMessage', { roomId, message, currentUser });
    this.messages.push({text: message, sender: currentUser});
    this.message = "";
  }


  // changeCurrentChat(userId: string) {
  //   this.currentUserId.next(userId);
  // }


}
