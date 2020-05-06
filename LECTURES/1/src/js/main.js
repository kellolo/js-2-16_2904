// import
import helloFunction from './components/comp1.js';
//основной рабочий скрипт

function main() {
    // ask name (function hello) === helloFunction
    // hello + name
    let name = helloFunction();
    
    return `Hello ${name}`;
}

export default function() {
    console.log(main());
}