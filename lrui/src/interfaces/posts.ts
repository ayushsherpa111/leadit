import { UploadBehavior, UploadJSON, Link, UploadFile, Media } from "./Upload";

enum categoies {
  link = "link",
  media = "media",
  text = "text",
}

abstract class Post {
  constructor(public title: string, private _category: categoies) {}

  abstract performUpload(): void;

  get category() {
    return this._category;
  }
}

export class MediaPost extends Post implements Media {
  uploader: UploadBehavior<Media>;
  constructor(title: string, private _media_data: FileList) {
    super(title, categoies.media);
    this.uploader = new UploadFile("/post/u/media");
  }

  async performUpload() {
    const response = await this.uploader.upload({
      title: this.title,
      file: this.file,
    });
    console.log(await response.json());
  }

  get file() {
    return this._media_data;
  }
}

export class LinkPost extends Post implements Link {
  uploader: UploadBehavior;
  constructor(title: string, private _url: string) {
    super(title, categoies.link);
    this.uploader = new UploadJSON("/post/u/url");
  }

  async performUpload() {
    const response = await this.uploader.upload({
      title: this.title,
      url: this.url,
    });
    if (response.status >= 400) {
      throw new Error(response.statusText);
    }
    return await response.json();
  }

  get url() {
    return this._url;
  }
}

export class TextPost extends Post {
  uploader: UploadBehavior;
  constructor(title: string, private _body?: string) {
    super(title, categoies.text);
    this.uploader = new UploadJSON("/post/u/text");
  }

  async performUpload() {
    const response = await this.uploader.upload({
      title: this.title,
      body: this.body,
    });
    if (response.status >= 400) {
      throw new Error(response.statusText);
    }
    const reply = await response.json();
    return reply;
  }

  get body() {
    return this._body;
  }
}
