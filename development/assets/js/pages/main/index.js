import '../../../scss/styles.scss';

import $ from 'jQuery';

$(function () {
    console.log("Страница MAIN обновилась! - " + process.env.NODE_ENV);

    setTimeout(() => {
        $('body').append('<div>"Страница MAIN обновилась! - ' + process.env.NODE_ENV + '"</div>');
    }, 3000);

});
