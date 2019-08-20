$(function() {　
    $('#like').on('click', function() {
        const data1 = $(this).attr('data-url');
        console.log(data1);
        $.ajax({
            type: 'GET',
            url: data1,
            dataType: "json",
            data: { "a": 1, "b": 2 },
            //erbかはわからない。自分でかいた(Jsonとかはよく見つかる)
            //functionに引数がはいると思うが何をいれていいかわからない
            success: function(data) {
                dataType: "json",
                console.log("OK");
                // alert("ok");
                // $(this).removeClass('like');
                // $(this).append(json);
            },
            error: function() {
                console.log("miss");
            }
        });
    });
});