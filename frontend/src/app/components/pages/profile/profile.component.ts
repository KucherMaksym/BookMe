import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../../models/User";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ChatComponent} from "../../partials/chat/chat.component";
import {user} from "@angular/fire/auth";



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ChatComponent,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user!: User;
  isEditMode: boolean = false;
  activatedArea!:string;

  constructor(public authService: AuthService, private router:Router) {
    authService.profile().subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
    //this.router.navigate(['login']);
  }

  startEditing(event:any) {
    this.isEditMode = true;
    console.log(this.activatedArea = event.target.classList.item(0));
  }

  stopEditing() {
    this.isEditMode = false;
  }

  editProfile(field:string, value:string) {

    const data = {
      [field]: value
    };

    this.authService.editProfile(this.user.id, data).subscribe(message => {
      console.log(message);
      if (message)      this.isEditMode = false

    });

  }

  ngOnInit() {
    this.authService.user$.subscribe((user:any) => {
      this.user = user;
    });
  }

}
