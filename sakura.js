/*=============================================================================
 * 🌸の花びらが舞い散るJavaScript
 * https://actyway.com/8351 を元に改変
=============================================================================*/

(
() => {
  // 定数宣言
  const NUMBER_OF_PETALS = 50;  // 花びらの枚数
  const FPS              = 24; // 一秒間に24回 動かす
  const HANABIRA_HEIGHT  = 29; // 花びらの高さ 回転するので最大値は 29px
  const HANABIRA_WIDTH   = 29; // 花びらの幅   回転するので最大値は 29px

  // 乱数関数
  // min 以上 max 以下の乱数を返す (integer)
  // min 以上 max 未満の乱数を返す (float)
  let rand = (min, max, type = "integer") => {
    if(type === "integer"){
      return Math.floor(Math.random() * (max-min+1)) + min;
    } else {
      return Math.random() * (max-min) + min;
    }
  };

  // 🌸の花びらのための新しい div 要素を作成し、body の末尾に追加
  const divSakura = document.createElement("div");
  document.body.after(divSakura);

  // ウィンドウの高さ
  const windowHeight = window.innerHeight;
  // ウィンドウの幅(スクロールバー除く)
  const windowWidth  = document.documentElement.clientWidth
  // スクロール位置
  let scroll         = document.documentElement.scrollTop || document.body.scrollTop;

  // 変数宣言
  let hanabiras          = [];    // 花びら達の格納用配列
  let hanabiraBaseZIndex = 10000; // 花びらの z-index の基準値
  let hanabirasTop       = [];    // 花びら達の top 位置格納用配列
  let hanabirasLeft      = [];    // 花びら達の left 位置格納用配列
  let yuragi             = [];    // 花びらの連続して揺らげる回数の格納用配列
  let yuragiCounter      = [];    // 花びらの揺いだ累積回数の格納用配列
  let sokudo             = [];    // 落下速度の 格納用配列

  // スクロール時のイベント登録
  // (スクロールされても花びらがウィンドウ内に納まるようにしている)
  document.addEventListener('scroll', () => {
    scroll = document.documentElement.scrollTop || document.body.scrollTop;
  }, false);

  // それぞれの花びらについて、位置等の初期設定を行う
  for(let i = 0; i < NUMBER_OF_PETALS; i++){
    // 花びらの div を作る
    let divHanabira = document.createElement('div');

    // ランダムに生成した初期表示位置（top, left）を設定する
    hanabirasTop[i]  = rand(-500, 0) + scroll;
    // hanabirasLeft[i] = rand(0, windowWidth - HANABIRA_WIDTH);
    hanabirasLeft[i] = rand(0, windowWidth);
    divHanabira.setAttribute('style', `z-index: ${hanabiraBaseZIndex + i}; top: ${hanabirasTop[i]}px; left: ${hanabirasLeft[i]}px;`);

    // ランダムに生成した花びらの色とアニメーションのための css class を設定する
    divHanabira.setAttribute('class', `hana t${rand(1, 5)} y${rand(1, 5)}`);

    // 花びらに css ID を付与
    divHanabira.id  = `hanabira${i}`;

    // 扱いやすくするために、花びら要素達を配列に格納
    hanabiras[i] = divHanabira;

    // 作成した花びらをDOMに追加、画面に表示されるようにする
    divSakura.appendChild(divHanabira);

    // 連続して同一方向へ揺らげる回数をランダムに生成
    yuragi[i]             = rand(15, 50);
    // 連続して同一方向へ揺らいだ回数を0で初期化
    yuragiCounter[i] = 0;
    // 落下速度をランダムに生成
    sokudo[i]             = rand(1, 3);
  }

  // それぞれの花びらの位置を移動させる
  setInterval(() => {
    // 各花びらに対し移動処理を繰り返す
    for(let i = 0; i < NUMBER_OF_PETALS; i++){
      // 花びらの位置（top）がウィンドウ内なら
      if (hanabirasTop[i] < scroll + windowHeight - HANABIRA_HEIGHT){
        // 揺らいだ回数が、連続して揺らげる回数以内なら、右へ移動させる
        if (yuragiCounter[i] <= yuragi[i]){
          hanabirasLeft[i] += rand(0.3, 0.6, "float");
          // もし、花びらが右にはみ出すようなら、左端に移動させる
          // if (hanabirasLeft[i] + HANABIRA_WIDTH >= windowWidth){
          if (hanabirasLeft[i] >= windowWidth){
            hanabirasLeft[i] = 0;
          }
          // 連続して右へ揺らいだならば、今度は左へ移動させる
        } else {
          hanabirasLeft[i] -= rand(0.3, 0.6, "float");
        }
        // 右へyuragi回、左へyuragi回、揺らいだら、累積回数を0に初期化
        // これにより、再び、右へ揺らげるようにする
        if (yuragiCounter[i] >= yuragi[i] * 2){
          yuragiCounter[i] = 0;
        }
      // 花びらがウィンドウの下まできたら
      } else {
        // 花びらをウィンドウの上に戻し、画面幅内に表示する
        hanabirasTop[i]  = scroll;
        hanabirasLeft[i] = rand(0, windowWidth - HANABIRA_WIDTH);
      }

      // 表示位置（top）に落下速度分を追加する
      hanabirasTop[i]               += sokudo[i];

      // 花びらの位置を設定する
      hanabiras[i].style.top  = `${hanabirasTop[i]}px`;
      hanabiras[i].style.left = `${hanabirasLeft[i]}px`;
      // 累積値更新
      yuragiCounter[i]++;
    }
  }, 1000 / FPS);
}
)();
