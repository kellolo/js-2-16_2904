let elements = {
    text: document.querySelector('.text'),
    sum: document.querySelector('.sum'),
    cal: document.querySelector('.cal')
}

export default function () {
    let writer = {
        text: '',
        sum: 0,
        cal: 0
    }

    let arr = document.querySelectorAll('input:checked');

    arr.forEach((val) => {
        writer.text += val.dataset.name + ' ';
        writer.sum += +val.dataset.price;
        writer.cal += +val.dataset.cal;
    });

    elements.text.textContent = writer.text;
    elements.sum.textContent = writer.sum + ' рублей';
    elements.cal.textContent = writer.cal + ' калорий';
}