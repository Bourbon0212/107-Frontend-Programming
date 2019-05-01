$('#clear').on('click', () => {
  $('#data').empty()
})

$('#input').on('click', () => {
  var n = $('#input-text').val() // 第一層，先抓數字
  // 把n插到class=item的div中
  var $item = $('<div>').attr('class', 'item').text(n) // 把文字插到上一層，$item只是變數名稱，後面是jQuery語法
  var $col = $('<div>').attr('class', 'col-1').append($item) // 把div插到上一個div
  $('#data').append($col)
})

$('#compute').on('click', () => {
    //取出網頁所有的 item
    $items = $('.item')
    var sum = 0
        //將所有item的 text 變成數字相加
    for (var i = 0; i < $items.length; i++) {
        var str = $($items[i]).text()
        sum = sum + Number(str)
    }
    //計算平均
    var avg = sum / $items.length

    //輸出結果到網頁
    $('#result-sum').val(sum)
    $('#result-avg').val(avg)

    // var array = []
    // $('.item').each(function() {
    //     var value = Number($(this).text())
    //     array.push(value)
    // })
    // var result = compute(array)
    //
    // // 輸出結果到網頁
    // $('#result-sum').val(result.sum)
    // $('#result-avg').val(result.avg)
})
