'use strict';

let pattern = {
    'name': /^([а-я]|[ё]){3,}$/i,
    'email': /^\w+([-_.])?\w+\.?\w+@\w+(\.\w+){1,2}$/,
    'phone': /^\+?\d+[ (-]?\d{3}[ )-]?(\d+[ -]?){7,}$/,
    'pass': /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}/
}

export default (e) => {
    let target = e.target.classList[1];
    if (e.target.value !== '') {
        e.target.nextElementSibling.classList.add('no-empty');
        if (e.target.value.search(pattern[target]) === -1) {
            document.querySelector('.after-'+target).style.visibility = 'visible';
        } else {
            document.querySelector('.after-'+target).style.visibility = 'hidden';
        }
    } else {
        e.target.nextElementSibling.classList.remove('no-empty');
        document.querySelector('.after-'+target).style.visibility = 'hidden';
    }
}