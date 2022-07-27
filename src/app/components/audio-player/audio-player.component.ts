import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UtlityService } from 'src/app/service/utlity.service';
import * as moment from 'moment';
@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css'],
})
export class AudioPlayerComponent implements OnInit {
  constructor(private utility: UtlityService) {}
  val = 0;
  volume = 1;
  AudioList = this.utility.files;
  audioObj = new Audio();
  currentTime: any = '00:00';
  duration: any = '00:00';
  currentTimeS: any = '0';
  durationS: any = '0';
  event: any = {
    name: '',
    status: 'stop',
    key: '',
  };
  audioEvents = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart',
  ];
  ngOnInit(): void {}

  onPlayAudio(event: any) {
    if (this.event == null) {
      this.event = event;
    } else if (this.event.key != null) {
      if (this.event.key == event.key) {
        event.status == 'pause';
      }
      if (this.event.key != event.key) {
        this.AudioList.forEach((x: any) => {
          if (x.key == this.event.key) {
            x.status = 'stop';
          }
        });
        this.event = null;
        this.event = event;
      }
    } else {
    }
    if (event.status == 'stop') {
      // this.audioObj.src = event.url;
      // this.audioObj.load();
      // this.audioObj.play();
      this.streamObservable(event.url).subscribe(() => {});
      event.status = 'play';
    } else if (event.status == 'play') {
      event.status = 'pause';
      this.audioObj.pause();
    } else if (event.status == 'pause') {
      event.status = 'play';
      this.audioObj.play();
    }
  }

  private streamObservable(url: any) {
    return new Observable((observer) => {
      // Play audio
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) => {
        this.currentTime = this.formatTime(this.audioObj.currentTime);
        this.duration = this.formatTime(this.audioObj.duration);
        this.durationS = this.convertMinToSec(this.duration);
        this.currentTimeS = this.convertMinToSec(this.currentTime);
        this.currentTimeS = this.currentTimeS * 60;
        this.durationS = this.durationS * 60;
        if (this.durationS == this.currentTimeS) {
          this.audioObj.pause();
          this.audioObj.currentTime = 0;
          this.event.status = 'stop';
        }
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
      };
    });
  }

  private addEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  }
  onSetVolume() {
    this.audioObj.volume = this.volume;
  }

  formatTime(time: number, format: string = 'mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  convertMinToSec(str: string) {
    var newStr = str.replace(/:/g, '.');
    return newStr;
  }

  onBackward() {
    this.audioObj.currentTime -= 10;
  }
  onForward() {
    this.audioObj.currentTime += 10;
  }

  seekTo(seconds: any) {
    this.audioObj.currentTime = seconds;
  }
}
