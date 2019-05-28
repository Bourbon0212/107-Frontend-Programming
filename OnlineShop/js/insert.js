// 當文件已經全載入至記憶體時，開始執行程式
$(() => {
    $('#preview').empty(); //清空預覽

    $('#insert').on('click', function() {

        // 取得商品資料
        var data = {
            item: {
                name: $('#inputProductName').val(),
                price: Number($('#inputProductPrice').val()), //Number()轉成數字
                count: +$('#inputProductCount').val(), //+轉成數字
                image: $('#inputProductImage').val(),
            }
        }

        // 新增商品
        $.post('https://js.kchen.club/B06208001/insert', data, function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#message').text('新增成功')
                    console.log(response.item)
                    $('#dialog').modal('show')
                } else {
                    $('#message').text('新增失敗')
                    console.log(response.message)
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }
        })
    })

    //預覽用
    var newItem = (item) => {
        $img = $('<img>').attr('class', 'image').attr('src', $('#inputProductImage').val())
        $h3 = $('<h3>').attr('class', 'name').text($('#inputProductName').val())
        $p = $('<p>').attr('class', 'price').text('NT$ ' + Number($('#inputProductPrice').val()))

        $item = $('<div>').attr('class', 'item').append($img).append($h3).append($p)
        $col = $('<div>').attr('class', 'col-*').append($item)

        $('#preview').append($col)
    }
    $('#previewBtn').on('click', function() {
      $('#preview').empty(); //清空預覽
      newItem()
    })
})
