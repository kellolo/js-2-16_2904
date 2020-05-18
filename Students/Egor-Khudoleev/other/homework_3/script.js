const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.send();

    return new Promise((resolve) => {
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                throw new Error('Something going wrong');
            }
        }

        xhr.onerror = function() {
            throw new Error('Something going wrong');
        }
    })
}

makeGETRequest(`${API_URL}/catalogData.json`)