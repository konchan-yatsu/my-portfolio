'use strict';



// detailボタンを押したら、Modalページが表示
document.getElementById('detail').onclick = function (event) {
  event.preventDefault();
  document.getElementById('modal').removeAttribute('id');
}

// modal内にあるcloseボタンを押したらModalが消える
document.getElementById('close').onclick = function (event) {
  event.preventDefault();
  console.log('osaretayo');
  document.querySelector('.detail').setAttribute('id', 'modal');

}