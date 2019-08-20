$(function() {　
    $('#like').on('click', function() {
        $.ajax({　
            type: 'GET',
            url: '/like',
            //erbかはわからない。自分でかいた(Jsonとかはよく見つかる)
            dataType: 'json',
            //functionに引数がはいると思うが何をいれていいかわからない
            success: function(json) {
                console.log("OK");
                alert("ok");
                $(this).removeClass('like');
                $(this).append(json);
            },
            error: function() {
                console.log("miss");
            }
        });
    });
});