export default class Wiki {
  constructor({ url, data }) {
    this._link = url;
    this._data = data;
  }

  async getInfo() {
    const wikiRequest = new XMLHttpRequest();
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&titles=${this._data}&formatversion=2&rvprop=content&rvslots=*`;
    wikiRequest.open("GET", url);

    const promise = new Promise((resolve, reject) => {
      wikiRequest.onload = function () {
        // Parse the request into JSON
        const data = JSON.parse(this.response);

        // Log the data object
        const extract = data.query.pages[0].extract;
        resolve(extract);
      };
      wikiRequest.onerror = function () {
        reject(new Error("Request failed"));
      };
    });

    wikiRequest.send();

    const extract = await promise;
    return extract;
  }
}
