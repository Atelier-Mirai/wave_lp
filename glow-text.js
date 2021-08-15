// .glow.text に shineクラス名を付与する関数定義
const addShineClassName = () => {
  let $element = $(".glow.text");
  $element.each(() => {
    let elemPosition = $element.offset().top - 50;
    let scroll       = $(window).scrollTop();
    let windowHeight = $(window).height();

    // .glow.text要素の位置までスクロールされたなら、shineクラスを付与する。
    if (scroll >= elemPosition - windowHeight) {
      $element.addClass("shine");
    } else {
      $element.removeClass("shine");
    }
  });
}

// 画面スクロール時に呼び出す関数を記述する
$(window).scroll(() => {
  addShineClassName();
});

// 画面が読み込まれた際に
// <h1 class="glow text">Best</h1>を
// <h1 class="glow text">
//   <span style="animation-delay:.0s;">B</span>
//   <span style="animation-delay:.1s;">e</span>
//   <span style="animation-delay:.2s;">s</span>
//   <span style="animation-delay:.3s;">t</span>
// </h1>
// にする関数
$(window).on('load', () => {
  //spanタグを追加する
  let $element = $(".glow.text");
  $element.each(() => {
    let text = $element.text();
    let textbox = "";
    text.split('').forEach((t, i) => {
      let delay = i / 10;
      textbox += `<span style="animation-delay:${delay}s;">${t}</span>`;
    });
    $element.html(textbox);
  });

  addShineClassName();
});
