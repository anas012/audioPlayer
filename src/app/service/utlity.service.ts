import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtlityService {
  constructor() {}

  public files: any = [
    // tslint:disable-next-line: max-line-length
    {
      url: 'assets/songs/Habibi Song Asim Azhar.mp3',
      name: 'Habibi Song Asim Azhar',
      artist: 'XYZ',
      genere: 'Pop',
      status: 'stop',
      key: 1,
    },
    {
      url: 'assets/songs/Iraaday Song Abdul Hannan.mp3',
      name: 'Iraaday Song Abdul Hannan',
      artist: 'XYZ',
      genere: 'Pop',
      status: 'stop',
      key: 2,
    },
    {
      url: 'assets/songs/Kabhi Kabhi Aditi Zindagi.mp3',
      name: 'Kabhi Kabhi Aditi Zindagi',
      artist: 'XYZ',
      genere: 'Pop',
      status: 'stop',
      key: 3,
    },
  ];
}
