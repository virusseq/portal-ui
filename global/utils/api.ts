import { HttpMethods } from './constants';

export async function apiRequest(method: HttpMethods, url: string = '', data = {}) {
    const BASE_URL = 'https://us-central1-apa-beta-e5aa0.cloudfunctions.net/app/api/';
    // Default options are marked with *
    const response = await fetch(`${BASE_URL}${url}`, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: (method !== HttpMethods.GET) ? JSON.stringify(data) : null // body data type must match "Content-Type" header
    });

    if (!response.ok) {
      const errorObj = await response.json();
      throw errorObj;
    }
  
    return await response.json(); // parses JSON response into native JavaScript objects
}
