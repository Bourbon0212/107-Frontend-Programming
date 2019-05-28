// 當文件已經全載入至記憶體時，開始執行程式
$(document).ready(function() {

    // 清空 product-list
    $('#product-list').empty();
    $('#page').hide()

    var items = null
    var pageCount = 20
    var showItems = (page) => {
        if (items == null) return
        var start = (page - 1) * pageCount
        var end = start + pageCount - 1 >= items.length - 1 ? items.length - 1 : start + pageCount - 1
        $('#product-list').empty();
        for (var i = start; i <= end; i++) {
            newItem(items[i])
        }
    }

    var newItem = (item) => {
        $img = $('<img>').attr('class', 'image').attr('src', item.image)
        $h3 = $('<h3>').attr('class', 'name').text(item.name)
        $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)

        $item = $('<div>').attr('class', 'item').append($img).append($h3).append($p)
        $col = $('<div>').attr('class', 'col-*').append($item)

        $('#product-list').append($col)
    }

    var newPage = (n) => {
        var now = 1 //現在的頁面
        var pageNum = Math.ceil(n / 20)
        //pageNum = (n % 20 != 0) ? parseInt(pageNum + 1) : parseintpageNum

        $('#page-number').empty()

        $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('«')
        $lli = $('<li>').attr('class', 'page-item').attr('id', 'previous').addClass('disabled').append($la)
        $('#page-number').append($lli)

        // 插入分頁數字
        for (var i = 1; i <= pageNum; i++) {
            $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)

            $a.on('click', function() {
                var i = $(this).text()
                now = Number(i)
                showItems(Number(i))

                //處理上一頁下一頁
                $('#previous').removeClass('disabled')
                $('#next').removeClass('disabled')
                if (now == pageNum) {
                  $('#next').addClass('disabled')
                } else if (now == 1) {
                  $('#previous').addClass('disabled')
                }
                //處理頁碼active
                for (var j = 1; j <= pageNum; j++) {
                  console.log('num' + j);
                  $('#num' + j).attr('class', 'page-item')
                }
                var strActive = ((i == now) ? ' active' : '')
                $('#num' + i).attr('class', 'page-item' + strActive)
            })
            var strActive = ((i == now) ? ' active' : '')
            console.log(i);
            $li = $('<li>').attr('class', 'page-item' + strActive).attr('id', 'num' + i).append($a)
            $('#page-number').append($li)
        }

        $ra = $('<a>').attr('class', 'page-link').attr('href', '#').text('»')
        $rli = $('<li>').attr('class', 'page-item').attr('id', 'next').append($ra)
        $('#page-number').append($rli)

        //上一頁控制
        $('#previous').on('click', function(){
          if (now > 1) {
            now--
          }
          if (now == 1) {
            $('#previous').addClass('disabled')
          } else {
            $('#previous').removeClass('disabled')
          }
          for (var j = 1; j <= pageNum; j++) {
            $('#num' + j).attr('class', 'page-item')
          }
          $('#num' + now).attr('class', 'page-item active')
          showItems(now)
        })

        //下一頁控制
        $('#next').on('click', function(){
          $('#previous').removeClass('disabled')
          $('#next').removeClass('disabled')
          if (now < pageNum) {
            now++
          }
          if (now == pageNum) {
            $('#next').addClass('disabled')
          } else {
            $('#next').removeClass('disabled')
          }
          for (var j = 1; j <= pageNum; j++) {
            $('#num' + j).attr('class', 'page-item')
          }
          $('#num' + now).attr('class', 'page-item active')
          showItems(now)
        })
    }

    $('#query').on('click', function() {
        $.get('https://js.kchen.club/B12345678/query', function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#product-list').empty();
                    // 資料庫有回傳資料
                    items = response.items

                    // for (var i = 0; i < items.length; i++) {
                    //     newItem(items[i])
                    // }

                    // 加了分頁效果，預設顯示第一頁
                    showItems(1)

                    // 顯示分頁和設定分頁的函式
                    $('#page').show()
                    newPage(items.length)

                } else {
                    $('#message').text('查無相關資料')
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }

            console.log(response)
        }, "json")
        $('#query').addClass('active')
    })

})
