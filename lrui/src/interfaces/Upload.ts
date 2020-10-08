interface Post {
  title: string;
}

export interface Text extends Post {
  body?: string;
}

export interface Media extends Post {
  file: FileList;
}

export interface Link extends Post {
  url: string;
}

export interface UploadBehavior<T = Media | Text | Link> {
  upload: (data: T) => Promise<Response>;
}

export class UploadJSON implements UploadBehavior<Text | Link> {
  constructor(private url: string) {}
  upload(data: Text | Link): Promise<Response> {
    return fetch(this.url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}

export class UploadFile implements UploadBehavior<Media> {
  constructor(private url: string) {}
  upload(data: Media): Promise<Response> {
    const newFormData = new FormData();
    newFormData.append("title", data.title);
    Array.from(data.file).forEach((e) => {
      newFormData.append("my_file", e);
    });
    return fetch(this.url, {
      method: "POST",
      body: newFormData,
    });
  }
}
