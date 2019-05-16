var rand = (start, end) => {
  //決定範圍
  var n = Math.abs(end - start) + 1

  //放大n倍
  var r = Math.random() * n

  //去除小數點
  r = Math.floor(r)

  //點位移
  r = r + ((start <= end) ? start : end)

  return r
}

var dealOne = () => {
  var r = rand(1, 52)
  var img0 = $('#data img').get(0) //html element
  var $img0 = $(img0) //transform html element to jQuery element
  $img0.attr('src', './poker/pic' + r + '.png')
}

//i第幾張牌，r是甚麼牌
var changeCard = (i, v) => {
  var img = $('#data img').get(i)
  var $img = $(img)
  $img.attr('src', './poker/pic' + v + '.png')
}

var dealFive = () => {
  //Generate an array of 1 to 52
  var allPoker = []
  for (var i = 1; i <= 52; i++) {
    allPoker.push(i) //append an element to the array
  }
  //洗牌
  var n = rand(100, 500)
  for (var i = 0; i < n; i++) {
    //隨機挑兩個互換
    var r = rand(0, 51)
    var temp = allPoker[r]
    allPoker[r] = allPoker[0]
    allPoker[0] = temp
  }
  //把洗好的牌，發五張出去
  for (var i = 0; i < 5; i++) {
    changeCard(i, allPoker[i])
  }
}
