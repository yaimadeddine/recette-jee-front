import {Component, OnInit} from '@angular/core';
import {Cloudinary} from "@cloudinary/url-gen";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front-end-recette-management-qualite-angular';

  ngOnInit(): void {
    // const cld = new Cloudinary({cloud: {cloudName: 'dkkkz6dif'}});
  }

}
