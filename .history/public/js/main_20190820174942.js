$(function() {　
    $('#like').on('click', function() {
        $.ajax({　
            type: 'GET',
            url: '/like/:post_id',
            //erbかはわからない。自分でかいた(Jsonとかはよく見つかる)
            dataType: 'erb',
            //functionに引数がはいると思うが何をいれていいかわからない
            success: function() {
                console.log("OK");
                alert("ok");
                $(this).removeClass('like')
            },
            error: function() {
                console.log("miss");
            }
        });
    });
});