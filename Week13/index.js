var newItem = (item) => {
  //從小到大 一個一個包進去
  $img = $('<img>').attr('class', 'image').attr('src', item.image)
  $h3 = $('<h3>').attr('class', 'name').text(item.name)
  $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)

  $item = $('<div>').attr('class', 'item').append($img).append($h3).append($p)
  $col = $('<div>').attr('class', 'col-*').append($item)

  $('#product-list').append($col)
}

$('#query').on('click', function() {
    $.get('https://kchen-teach.github.io/hw2/product.json', function(response) {
      //response 就是 get 到的東西
      if (response) {
        //確定server回傳資料
        if (response.result) {
          //確定資料庫有回傳
          $('#product-list').empty();//清空
          var items = response.data
          for (var i = 0; i < items.length; i++) {
              newItem(items[i])
          }
        } else {
          $('#message').text('No Data!')
          $('#dialog').modal('show')
        }
      } else {
        $('#message').text('Server Error!')
        $('#dialog').modal('show')
      }
        console.log(response)
    }, "json")
})
