import { ChangeEvent } from "react";

export interface UploadFileArgs {
  data: string | ArrayBuffer;
  files: FileList;
}

export async function uploadFileList(files: FileList) {
  return new Promise<UploadFileArgs>((resolve, reject) => {
    if (!FileReader) {
      reject(new Error("FileReader API not supported"));
      return;
    }

    const fr = new FileReader();
    fr.onload = function () {
      if (fr.result) resolve({data: fr.result, files: files});
      else reject(new Error("Error reading file"));
    };
    fr.onerror = function () {
      reject(new Error("Error reading file"));
    };
    fr.readAsDataURL(files[0]);
  });
}

export async function uploadFile(ev: ChangeEvent<HTMLInputElement>) {
  return new Promise<UploadFileArgs>((resolve, reject) => {
    const files = ev.target.files;
    if (files === null || files.length === 0) {
      reject(new Error("No file selected!"));
      return;
    }

    uploadFileList(files)
      .then((f) => resolve(f))
      .catch((e) => reject(e));
  });
}
