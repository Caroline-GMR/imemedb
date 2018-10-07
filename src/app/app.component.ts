import { Component, OnInit } from '@angular/core';
import { MemeService } from './services/meme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = true;
  memes: Array<any> = [];
  imgs = {
    'not-simply': 'https://www.meme-arsenal.com/memes/018048ccac3ed42c16a7a4a8f7216758.jpg',
    'waiting': 'https://imgflip.com/s/meme/Waiting-Skeleton.jpg',
    'other': 'https://i.stack.imgur.com/l60Hf.png'
  };
  newMeme: any = {
    lineOne: ' ',
    lineTwo: ' '
  };

  constructor(private memeService: MemeService) {
  }

  ngOnInit() {
    this.memeService.getAll()
    .then ((results) => {
      this.memes = results;
      this.loading = false;
    });
  }

  handleAddClick() {
    this.memeService.create(this.newMeme)
    .then(() => {
      this.memes.push(this.newMeme);
      this.newMeme = {};
    });
  }

  handleDeleteClick(id) {
    this.memeService.delete(id)
      .then(() => {
        this.memes = this.memes.filter(memes => {
          return memes._id !== id;
      });
    });
  }
}
