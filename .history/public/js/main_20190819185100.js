$(function() {
    $("#like").click(function() {
            $.ajax({　
                type: 'GET',
                url: '/like/:post_id',
                dataType: 'erb',
                success: function() {
                    console.log("OK");
                },
                error: function() {
                    console.log("miss");
                }
            })
        }),
        $("#unlike").click(function() {
            $.ajax({　
                type: 'GET',
                url: '/unlike/:post_id',
                dataType: 'erb',
                success: function() {
                    console.log("OK(un)");
                },
                error: function() {
                    console.log("miss(un)");
                }
            })
        })
});