import '../../../scss/styles.scss';

import $ from 'jQuery';

$(function () {
    let sum = (...args) => args.reduce((m, n) => m + n, 0);
    $('p').text(sum());
    $('body').append('<div>');
    console.log(process.env.NODE_ENV) + '\n';

    let promise = new Promise((resolve, reject) => {

        setTimeout(() => {
            reject(new Error("Время вышло! asdfasdasda"));
        }, 1000);

    });

    promise
        .then(
            result => alert("Fulfilled: " + result),
            error => alert("Rejected: " + error.message)
        );

});
