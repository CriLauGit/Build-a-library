class Media {
  constructor (title) {
    this._title = title;
    this._isCheckedOut = false;
    this._ratings = [];
  }
  
  get title() {
    return this._title;
  }
  
  get isCheckedOut() {
    return this._isCheckedOut;
  }
  
  set isCheckedOut(value) {
    if (typeof(value)==='boolean') {
      this._isCheckedOut = value;
    }
    else {
      console.log("The value must be either true or false")
    }
   }
  
  get ratings() {
    return this._ratings;
  }
  
  getAverageRating() {
    return this.ratings.reduce((a,c) => a+c/this.ratings.length, 0)
  }
  
  toggleCheckOutStatus() {
    this.isCheckedOut = !this.isCheckedOut;
  }
  
  addRating (rating) {
    if(rating>=1 && rating <=5 && typeof(rating) === 'number') {
      this.ratings.push(rating);
    }
    else {
      console.log("The rating must be a number between 1 and 5.")
    }
  }
}

class Book extends Media {
  constructor (author, title, pages) {
    super(title);
    this._author = author;
    this._pages = pages;
  }
  
  get author() {
    return this._author;
  }
  
  get pages() {
    return this._pages;
  }
}

class Movie extends Media {
  constructor (director, title, runTime) {
    super(title);
    this._director = director;
    this._runTime = runTime;
  }
  
  get director() {
    return this._director;
  }
  
  get runTime() {
    return this._runTime;
  }
}

class CD extends Media {
  constructor (artist, title, songs) {
    super(title);
    this._artist = artist;
    this.songs = songs;
  }
  
  shuffle() {
    const shuffled = [];
    let tempSongs = [...this.songs];
    let n = tempSongs.length;
    for(let i=0; i <n; i++) {
      shuffled.push(tempSongs.splice(Math.floor(Math.random()*tempSongs.length),1)[0]);
    }
    return shuffled;
  }
}

class Catalog {
  constructor(type) {
    this._type = type;
    this._content = [];
  } 
  
  get type() {
    return this._type;
  }
  get content() {
    return this._content;
  }
  
  addContent (media) {
    this.content.push(media);
  }
  
  shuffleSongs() {
    const tempSongs = [];
    for(let i=0; i<this._content.length; i++) {
      tempSongs.push(this._content[i].songs);
    }
    const songsList = tempSongs.reduce((a, c) => a.concat(c), []);
    const shuffled = [];
    let n = songsList.length;
    for(let i=0; i <n; i++) {
      shuffled.push(songsList.splice(Math.floor(Math.random()*songsList.length),1)[0]);
    }
    return shuffled;
  }
}

const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544)
console.log(historyOfEverything.isCheckedOut);
historyOfEverything.toggleCheckOutStatus();
console.log(historyOfEverything.isCheckedOut);
historyOfEverything.addRating(4);
historyOfEverything.addRating(5);
historyOfEverything.addRating(5);
console.log(historyOfEverything.getAverageRating());
const speed = new Movie("Jan de Bont", "Speed", 116);
speed.toggleCheckOutStatus();
console.log(speed.isCheckedOut);
speed.addRating(1);
speed.addRating(1);
speed.addRating('a');
console.log(speed.getAverageRating());
const firstCD = new CD('Artist1', 'Title 1', ['Song1 1', 'Song1 2', 'Song1 3', 'Song1 5', 'Song1 4']);
const secondCD = new CD('Artist2', 'Title 2', ['Song2 1', 'Song2 2']);
const thirdCD = new CD('Artist3', 'Title 3', ['Song3 1', 'Song3 2']);
console.log(firstCD.shuffle());
const CDs = new Catalog('CDs');
CDs.addContent(secondCD);
CDs.addContent(firstCD);
CDs.addContent(thirdCD);
console.log(CDs.content[0].songs);
console.log(CDs.shuffleSongs());