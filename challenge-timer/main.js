'use strict';

// 手順************************************************************
// 1 formのinputされた時刻を時間換算
// 2 inputをcountdown関数に代入し、recalc1関数で１秒ごとのsettimeout
// 3 startとstopの両ボタンが押された時間はDate.now()で保存しておき、stopの際は調整処理
// 4 resetボタンの際はすべてのinputが削除される
// *****************************************************************


//************************************************************************
//カウントダウン関数宣言　 

let rest;
function countdown(due) {
  const now = new Date();
  rest = due - now.getTime();

  return rest;
}
//************************************************************************
// フォームに入力された時刻を時間換算し、inputへ代入
let input;
document.getElementById('form').onchange = function () {
  input = new Date().getTime() + (document.getElementById('form').hourInput.value) * 1000 * 60 * 60 + (document.getElementById('form').minInput.value) * 1000 * 60 + (document.getElementById('form').secInput.value) * 1000

}
//***************************************************************************
// １秒ごとのカウントダウンを再計算
// 一時停止がされた場合の分岐も記載
let counter1;
function recalc1() {

  if (stopTime > 0) {

    counter1 = countdown(input) - stopTime + startTime;

  } else {

    counter1 = countdown(input);
  }


  if (counter1 >= 0) {
    document.getElementById('hour').textContent = Math.floor(counter1 / 1000 / 60 / 60) % 24;
    document.getElementById('min').textContent = Math.floor(counter1 / 1000 / 60) % 60;
    document.getElementById('sec').textContent = Math.floor(counter1 / 1000) % 60;
  }
  refresh();
  return counter1;
}

//***************************************************************************
// １秒ごとのsettimeout宣言
let timeoutID;
function refresh() {
  timeoutID = setTimeout(recalc1, 1000);
}
//***************************************************************************
let startTime;
let stopTime;

//***************************************************************************
// 各ボタンの処理を宣言
//startとstopの両ボタンが押された時間はDate.now()で保存 

document.getElementById('btnStart').onsubmit = function (event1) {
  event1.preventDefault();
  startTime = Date.now();
  recalc1();
  console.log(startTime / 1000);
  // console.log(rest/1000);  
}

document.getElementById('btnStop').onsubmit = function (event2) {
  event2.preventDefault();
  clearTimeout(timeoutID);
  stopTime = Date.now();
  console.log(stopTime / 1000);
  // console.log(rest/1000);
}

document.getElementById('btnReset').onsubmit = function (event3) {
  document.getElementById('hour').textContent = ''
  document.getElementById('min').textContent = ''
  document.getElementById('sec').textContent = ''
  document.getElementById('form').hourInput.value = ''
  document.getElementById('form').minInput.value = ''
  document.getElementById('form').secInput.value = ''
}
//***************************************************************************