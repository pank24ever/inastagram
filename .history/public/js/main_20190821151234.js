$(function() {　
    $('.like').on('click', function() {
        var data = $(this).attr('data-url');
        console.log(data);
        $.ajax({
            type: 'GET',
            url: data,
            dataType: "text",
            data: { "a": 1, "b": 2 },
            //erbかはわからない。自分でかいた(Jsonとかはよく見つかる)
            //functionに引数がはいると思うが何をいれていいかわからない
            success: function(response) {
                dataType: "string",
                $(function() {
                        if ($(this).hasClass('like')) {
                            console.log("OK");
                            $('this').css('display', 'none');
                            $('.unlike').css('display', 'block');
                        }
                        // alert("ok");
                        // $(this).removeClass('like');
                        // $(this).append(json);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log("ajax通信に失敗しました");
                        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                        console.log("textStatus     : " + textStatus);
                        console.log("errorThrown    : " + errorThrown.message);
                    }
                });
        });
    });
});