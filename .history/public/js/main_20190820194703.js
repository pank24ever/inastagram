$(function() {　
    $('#like').on('click', function() {
        const data = $(this).attr('data-url');
        $.ajax({
            type: 'GET',
            url: data,
            //erbかはわからない。自分でかいた(Jsonとかはよく見つかる)
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