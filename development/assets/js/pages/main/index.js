import '../../../scss/styles.scss';

import $ from 'jQuery';

$(function () {
    let sum = (...args) => args.reduce((m, n) => m + n, 0);
    $('body').append('<div>');
    console.log("Страница обновилась! - " + process.env.NODE_ENV);

    setTimeout(() => {
        $('div').text("Страница обновилась! - " + process.env.NODE_ENV);
    }, 3000);

});
