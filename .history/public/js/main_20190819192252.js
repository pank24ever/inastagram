$(function() {
    $("#like").on('click', function() {
            $.ajax({　
                type: 'GET',
                url: '/like/:post_id',
                dataType: 'erb',
                success: function() {
                    console.log("OK");
                    $(this).addClass('unlike')
                },
                error: function() {
                    console.log("miss");
                }
            })
        }),
        $("#unlike").on('click', function() {
            $.ajax({　
                type: 'GET',
                url: '/unlike/:post_id',
                dataType: 'erb',
                success: function() {
                    console.log("OK(un)");
                    $(this).addClass('like')
                },
                error: function() {
                    console.log("miss(un)");
                }
            })
        })
})