import '../../../scss/styles.scss';
// import '../../../scss/pages/personal_data/styles.scss';
// import '../../../scss/pages/privacy_policy/styles.scss';

import $ from 'jQuery';

$(function () {
    console.log("Страница PAGE_2 обновилась! - " + process.env.NODE_ENV);

    setTimeout(() => {
        $('body').append('<div>"Страница PAGE_2 обновилась! - ' + process.env.NODE_ENV + '"</div>');
    }, 6000);

});
