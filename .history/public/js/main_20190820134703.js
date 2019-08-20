$(function() {
/ $.ajax({　
type: 'GET',
    url: '/like/:post_id',
    dataType: 'erb',
    success: function() {
        console.log("OK");
        alert("ok");
        $(this).removeClass('like')
    },
    error: function() {
        console.log("miss");
    }
}).done(function(data) {
//データを受け取った後の処理
});
}),

console.log("main.jsを読み込みました。")
$('#like').on('click', function() {
console.log("いいね押された");
alert("いいね押された");
});
});