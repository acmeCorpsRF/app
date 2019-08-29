import '../../../scss/styles.scss';

import $ from 'jQuery';

$(function () {
    let sum = (...args) => args.reduce((m, n) => m + n, 0);
    $('body').append('<div>');
    $('div').text(sum());
    console.log(process.env.NODE_ENV) + '\n';

    setTimeout(() => {
        new Error("Страница обновилась!");
    }, 2000);

});
