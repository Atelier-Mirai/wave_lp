// ページ読み込み時に実行されるよう、イベントリスナを指定。
window.addEventListener('load', init);

// 初期化処理を行う関数
function init() {
  // ShuffleTextのインスタンス達を格納する配列
  let effectList = [];
  // shuffle クラスが付与された全ての要素を取得する。
  // (<li class="shuffle">と書かれた要素全て)
  let elementList = document.querySelectorAll('.shuffle');

  // elementListの全てのメンバーに対して、繰り返し処理を行う。
  for (let i = 0; i < elementList.length; i++) {

    // i番目のメンバーを取得して、elementという変数に代入。
    let element = elementList[i];
    // カスタムdata属性を付与
    // (元の要素のHTMLは
    // <li class="shuffle">01/01「トップページ」更新しました。</li>
    // だったが、これを、
    // <li class="shuffle" data-index="1">01/01「トップページ」更新しました。</li>
    // と、data-index="1" と、カスタムdata属性を付与する。)
    element.dataset.index = i;
    // ShuffleTextクラスのインスタンスを生成し、
    // effectListに格納する。
    effectList[i] = new ShuffleText(element);

    // マウスを載せたときに再生するよう、イベントリスナを指定。
    element.addEventListener('mouseenter', function () {
      // <li>要素は、次のようになっている。
      // <li class="shuffle" data-index="1">05/04 トップページ 更新しました。</li>
      // this.dataset.index と書くことで、
      // data-index="1" の 1 を取得できる。
      effectList[this.dataset.index].start();
      // effectList[1].start(); と等価。
    });

    // マウスを離した時に再生するよう、イベントリスナを指定。
    element.addEventListener('mouseleave', function () {
      effectList[this.dataset.index].start();
    });

    // ページを読み込んだときに、初回を再生する。
    effectList[i].start();
  }
}
