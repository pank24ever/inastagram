$(function() {
    $("#like").on('click', function() {
        // $.ajax({　
        //     type: 'GET',
        //     url: '/like/:post_id',
        //     dataType: 'erb',
        //     success: function() {
        console.log("OK");
        //             $(this).removeClass('like')
        //         },
        //         error: function() {
        //             console.log("miss");
        //         }
        //     }).done(function(data) {
        //         //データを受け取った後の処理
        //     });
        // }),
        // $("#unlike").on('click', function() {
        //     $.ajax({　
        //         type: 'GET',
        //         url: '/unlike/:post_id',
        //         dataType: 'erb',
        //         success: function() {
        //             console.log("OK(un)");
        //             $(this).removeClass('unlike')
        //         },
        //         error: function() {
        //             console.log("miss(un)");
        //         }
        //     }).done(function(data) {
        //         //データを受け取った後の処理
        //     });
    })
});