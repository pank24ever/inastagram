// $(function() {　
//     $('.unlike').on('click', function() {
//         var data = $(this).attr('data-url');
//         console.log(data);
//         $.ajax({
//             type: 'GET',
//             url: data,
//             dataType: "text",
//             data: { "a": 1, "b": 2 },
//             //functionの引数にはなぜかこれがはいるとOK
//             success: function(response) {
//                 dataType: "string",
//                 $(function() {
//                     $('.unlike').css('display', 'none');
//                     $('.like').css('display', 'inline');
//                     alert("ok");
//                 });
//             },
//             error: function(XMLHttpRequest, textStatus, errorThrown) {
//                 console.log("ajax通信に失敗しました");
//                 console.log("XMLHttpRequest : " + XMLHttpRequest.status);
//                 console.log("textStatus     : " + textStatus);
//                 console.log("errorThrown    : " + errorThrown.message);
//             }
//         });
//     });
// });

// $(function() {　
//     $('.like').on('click', function() {
//         var data = $(this).attr('data-url');
//         console.log(data);
//         $.ajax({
//             type: 'GET',
//             url: data,
//             dataType: "text",
//             data: { "a": 1, "b": 2 },
//             success: function(response) {
//                 dataType: "string",
//                 $(function() {
//                     $('.like').css('display', 'none');
//                     $('.unlike').css('display', 'inline');
//                     alert("ok");
//                 });
//             },
//             error: function(XMLHttpRequest, textStatus, errorThrown) {
//                 console.log("ajax通信に失敗しました");
//                 console.log("XMLHttpRequest : " + XMLHttpRequest.status);
//                 console.log("textStatus     : " + textStatus);
//                 console.log("errorThrown    : " + errorThrown.message);
//             }
//         });
//     });
// });

$(function() {　
    $('.unlike').on('click', function() {
        var data = $(this).attr('data-url');
        console.log(data);
        $.ajax({
            type: 'GET',
            url: data,
            dataType: "text",
            data: { "a": 1, "b": 2 },
            //functionの引数にはなぜかこれがはいるとOK
            success: function(response) {
                dataType: "string",
                $(function() {
                    $('.unlike').css('display', 'none');
                    $('.like').css('display', 'inline');
                    alert("ok");
                });
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

$(function() {　
    $('.like').on('click', function() {
        var data = $(this).attr('data-url');
        console.log(data);
        $.ajax({
            type: 'GET',
            url: data,
            dataType: "text",
            data: { "a": 1, "b": 2 },
            success: function(response) {
                dataType: "string",
                $(function() {
                    $('.like').css('display', 'none');
                    $('.unlike').css('display', 'inline');
                    alert("ok");
                });
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