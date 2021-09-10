import React from 'react';

interface IFileDownloaderProps {
    toDownload: object;
}

/**
 * Button that downloads JSON to the user's machine.
 * @param props toDownload: the object to be transformed into JSON and downloaded
 * @returns
 */
export function FileDownloader(props: IFileDownloaderProps) {
  return (
    <button onClick={() => downloadJsonFile(props.toDownload, 'key.json')} >Click to download</button>
  );
}

/** Stolen from SO:
 * https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react/44661948
 */

const downloadJsonFile = (obj: object, filename: string = 'myJson.json') => {
  const element = document.createElement('a');
  const file = new Blob([JSON.stringify(obj)], {type: 'application/json'});
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};
