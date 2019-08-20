$(function() {　
    $('#like').on('click', function() {
        const data = $(this).attr('data-url');
        console.log(data);
        $.ajax({
            type: 'GET',
            url: data,
            // dataType: "int",
            // data: 1,
            //erbかはわからない。自分でかいた(Jsonとかはよく見つかる)
            //functionに引数がはいると思うが何をいれていいかわからない
            success: function(data) {
                dataType: json
                console.log("OK");
                alert("ok");
                // $(this).removeClass('like');
                // $(this).append(json);
            },
            error: function() {
                console.log("miss");
            }
        });
    });
});