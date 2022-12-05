$('#btn-popup').on('click', function () {
    $('.popup-layout').show();

    $('#code_input').focus();
});
$('.icon-close').on('click', function () {
    $('.popup-layout').hide();
});
$('#check_all').on('click', function () {
    $('.check-img').toggle();
});
$('.check_item').on('click', function () {
    $(this).children().toggle();

    var td = $(this).parent();

    var tr = td.parent();

    tr.children().toggleClass('active');
});
$('.paging-select').on('click', () => {
    $('.paging-option').toggle();
});

var options = $('.paging-option .item');
jQuery.each(options, (option) => {
    // var text = option.text();
    console.log(option);
    // option.on('click', ()=>{

    // })
});
