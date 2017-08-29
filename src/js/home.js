window.onload = function () {
    var $fullText = $('.admin-fullText');
    $('#admin-fullscreen').on('click', function() {
        $.AMUI.fullscreen.toggle();
    });

    $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
        $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
    });


    // var LoginForm = new Vue({
    //     el: '#loginForm',
    //     data: {
    //         account: 'xxxxxxxxx'
    //     }
    // });
};