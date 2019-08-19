$(function() {
    $("#like").click(function() {
        $.ajax({　
            type: 'GET',
            url: '',
            dataType: 'erb',
            success: function() {
                console.log("OK");
            },
            error: function() {
                console.log("miss");
            }
        })
    })
});