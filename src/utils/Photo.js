

export default class Photo {
    constructor({ url, headers }) {
        this._link = url;
        this._headers = headers;
      }

_processingServerResponse(res) {
    if (res.ok) {
        
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

getAllPhotos() {

    return fetch(`${this._link}`,{
        method: 'GET',
        headers: this._headers,
    }).then((res) => {
      return this._processingServerResponse(res);
      console.log(res)
    });
  }



}



