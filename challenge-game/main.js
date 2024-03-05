'use strict';

// 制作手順＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
//１canvasの操作を把握し、諸元の設定や風船を表示
//２風船位置をランダムにして降下させる
//   そのときにsettimeoutによりキャンバス消去、再度の風船表示を繰り返す
//３キャノンを表示させ、左右キーで操作できるように実装
//    カーソルキーでの移動について関数宣言した
// 4 ビームの実装。ｽﾍﾟｰｽｷｰ発射は左右キー関数に組み込んだ。
// 　衝突判定はmainloopに組み込んだ 
// 5 最終調整として、score判定やゲーム条件などをmainloopに盛り込んだ
// 6 最後にstartボタンと説明ﾍﾟｰｼﾞ（Modal実装）を用意
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊


// キャンバスの生成および準備と画像読込
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
// console.log(canvasHeight);
// const balloon = new Image();
// balloon.src = '風船のイラスト6.svg';
const balloon = document.getElementById('balloon');
const canon = document.getElementById('canon');
// context.drawImage(balloon, 1, 1, 50, 50);
let cannonX = canvasWidth / 2;
// context.drawImage(canon, cannonX, 450, 50, 50)
let score = 0;


// 変数宣言
let height = 0;
let weidth;
// let i;
// let balloonList = [];


// 左右のカーソルキーが押されているかどうかを保持するフラグ
let leftKeyPressed = false;
let rightKeyPressed = false;
document.onkeydown = keyDown;
document.onkeyup = keyUp;

// ビームが現在発射中であることを示すフラグ
let beamFlag = false;
// ビームのX, Y座標
let beamX;
let beamY;


// 実行する関数****************************************************
randomWd();
document.getElementById('start').onclick = function () {
  // submitでも同じか試してみる（Submitは１回のみ？やから）
  mainLoop();
}

// ********************************************************************


// 関数宣言　ゲームを動かす
function mainLoop() {
  balloonDrawing(weidth, height);
  height += 2;
  cannonShift();
  context.drawImage(canon, cannonX, canvasHeight - 50, 50, 50)
  emitBeam();
  beamMoving();

  // 後半に実装　scoreが30点未満の場合には続ける
  if (score < 30) {

    // 後半に実装　風船が落ちたらゲームオーバー
    if (height >= canvasHeight) {
      repaint();
      window.alert('balloonが落ちました。ｹﾞｰﾑｵｰﾊﾞｰです');

    } else {

      //ビームが当たったときの処理  
      if (beamX >= weidth && beamX <= weidth + 50 && beamY < height) {
        // console.log('shootDown');
        // 当たったら、全体を消して初期化
        repaint();
        // ビームも初期値にもどす
        beamFlag = false;
        //バルーンの高さも初期値に戻す
        height = 0;
        // 点数を加点し、表示
        score += 10;
        document.getElementById('score').textContent = score;
        // 再度のrandom実行(これしないとｘ位置が固定される)
        randomWd();
        // mainLoop();
      } else {
        refresh();
      }

    }

  } else {
    repaint();
    window.alert('おめでとうございます。ゲームクリア!');
  }

}

// 関数宣言　バルーン横位置ランダム
function randomWd() {
  weidth = Math.floor(Math.random() * (canvasWidth - 50))
  return weidth
}

// 関数宣言　バルーンを表示、
function balloonDrawing(weidth, height) {
  context.drawImage(balloon, weidth, height, 50, 50)
}

// 関数宣言　リペイント
function repaint() {
  context.fillStyle = '#ccc'
  context.fillRect(0, 0, canvasWidth, canvasHeight);
}


// 関数宣言　一定時間経過
function refresh() {
  setTimeout(repaint, 20);
  setTimeout(mainLoop, 20);
}


// 関数宣言　キャノンを操作で移動させる
// キャノン砲を動かす

function cannonShift() {
  if (leftKeyPressed && cannonX > 0) {
    cannonX -= 10;
  } else if (rightKeyPressed && cannonX < (canvasWidth - 50)) {
    cannonX += 10;
  }
}

// 関数宣言　ビームを発射
function emitBeam() {
  if (beamFlag) {
    context.strokeStyle = "red";
    context.beginPath();
    context.moveTo(beamX, beamY);
    context.lineTo(beamX, beamY + 30);
    context.stroke();
  }
}

// 関数宣言　 ビーム行進 (発射中なら)ビームを動かす
function beamMoving() {
  if (beamFlag) {
    if (beamY > 0) {
      beamY -= 10;
    } else {
      beamFlag = false;
    }
  }
}

// 関数宣言　ボタンを押したとき

function keyDown(e) {
  if (e.code === "ArrowLeft") {
    leftKeyPressed = true;
    // console.log(leftKeyPressed);
  } else if (e.code === "ArrowRight") {
    rightKeyPressed = true;
    // console.log(rightKeyPressed);
  } else if (e.code === "Space" && !beamFlag) {
    beamFlag = true;
    // console.log(beamFlag);
    beamX = cannonX + 25;
    beamY = canvasHeight - 50;
  }

}

// 関数宣言　ボタンを離したとき
function keyUp(e) {
  if (e.code === "ArrowLeft") {
    leftKeyPressed = false;
    // console.log(leftKeyPressed);
  } else if (e.code === "ArrowRight") {
    rightKeyPressed = false;
    // console.log(rightKeyPressed);
  }
}

// 制作メモ・備忘＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// ・複数回のバルーンは配列構造と繰り返しで実現か？
// 　→とりあえず、一個づつでやってみる
//　・点数表示ボタンをつくって、あたったら加点していくを実装
// 　・開始ボタンを押したら開始する仕組みを実装
//
// ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊