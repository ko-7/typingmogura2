'use strict';
{
  // 表示させる文字
  const words = [
    'a','b','c','d','e','f','g','h','i','j',
    'k','l','m','n','o','p','q','r','s','t',
    'u','v','w','x','y','z',
  ];

// 穴のidを取得し変数に代入
  const hole0 = document.getElementById('hole0');
  const hole1 = document.getElementById('hole1');
  const hole2 = document.getElementById('hole2');
  const hole3 = document.getElementById('hole3');
  const hole4 = document.getElementById('hole4');
  const hole5 = document.getElementById('hole5');
  const hole6 = document.getElementById('hole6');
  const hole7 = document.getElementById('hole7');
  const hole8 = document.getElementById('hole8');
  const hole9 = document.getElementById('hole9');
  const hole10 = document.getElementById('hole10');
  const hole11 = document.getElementById('hole11');
  const hole12 = document.getElementById('hole12');
  const hole13 = document.getElementById('hole13');
  const hole14 = document.getElementById('hole14');
  const hole15 = document.getElementById('hole15');

// 穴idの配列（ランダムで出させるために必要）
  const holeNumbers = [
    hole0,hole1,hole2,hole3,
    hole4,hole5,hole6,hole7,
    hole8,hole9,hole10,hole11,
    hole12,hole13,hole14,hole15,
  ]
let wordsIndex;//ランダムに選ばれたwordsのインデックス番号を保存
let word;//表示する文字
let holeNumbersIndex
let score = 0;//タイプできた文字数
let miss = 0;//ミスした回数
const timeLimit = 15*1000; //制限時間
let startTime;//ゲーム開始時刻を記憶
let isPlaying = false;//ゲーム中か否かの判定指標
let displayTime;//文字を表示させる時間
let displayWords = [];//表示させてる文字を記憶する配列
let displayHoles = [];//文字を表示させてる穴を記憶する配列
let id;

// holeNumbers[1].textConten = "4";

// 次の文字を表示----------------------------------------------------------
function changeWord(){
  // 表示する文字をランダムで選ぶ
  wordsIndex = Math.floor(Math.random()*words.length);
  // word = words[wordsIndex];


  // 文字を表示する穴をランダムで選ぶ
  holeNumbersIndex = Math.floor(Math.random()*holeNumbers.length);
  // holeNumbers[holeNumbersIndex] = holeNumbers[holeNumbersIndex];
  holeNumbers[holeNumbersIndex].textContent = words[wordsIndex];
  displayWords[holeNumbersIndex] = words[wordsIndex];
  displayHoles[holeNumbersIndex] = holeNumbers[holeNumbersIndex]

  setTimeout(function(){//setTimeoutが必要な意味がわからない！
    displayHoles[holeNumbersIndex].classList.add('active');
  },100);

    id = setTimeout(function(){
    displayHoles[holeNumbersIndex].classList.add('wasntType');
    displayHoles[holeNumbersIndex].classList.remove('active');
    clearTimeout(id);
    changeWord();

  },Math.floor(1000*(Math.random()*2)+2000));

  // words.splice(wordsIndex,1);  //wordsから表示中のアルファベットを削除（同じ文字が2つ以上表示されることを防ぐ）
  // holeNumbers.splice(holeNumbersIndex,1);
}
// ------------------------------------------------------------------------

const scoreLabel = document.getElementById('score');
const missLabel = document.getElementById('miss');
const timerLabel = document.getElementById('timer');

// 時間の計算=============================================================
function setTimer(){

  const intervalId = setInterval(()=>{
    updateTimer();
  },10);
  function updateTimer(){
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft/1000).toFixed(2);

    if(timeLeft < 10){
      clearInterval(intervalId);
      displayHoles[holeNumbersIndex].textContent = "";
      isPlaying = false;
      clearTimeout(id);
// タイムアウト後時間を0:00にセット
      setTimeout(function(){
        timerLabel.textContent = "0:00";
      },20);
    }
  }
}//=========================================================================

// タイプしたキーを認識する
window.addEventListener('keyup',e => {
  console.log(e.key);
  console.log(isPlaying);
  if(isPlaying === false){
    if(e.key === " "){
      startTime = Date.now();
      setTimer();
      changeWord();
      score = 0;
      scoreLabel.textContent = score;
      miss = 0;
      missLabel.textContent = miss;
      isPlaying = true;

      // ゲーム開始一定時間経過後複数文字発生！
      // setTimeout(function(){
      //   changeWord();
      // },5*1000);
    }
  }else{
    if(e.key === displayWords[holeNumbersIndex]){
      displayHoles[holeNumbersIndex].textContent = "";
      score++;
      scoreLabel.textContent = score;
      displayHoles[holeNumbersIndex].classList.remove('active');
      clearTimeout(id);
      changeWord();
    }else{
      miss++;
      missLabel.textContent = miss;
    }
  }
});


}
