// ウィンドウをスクロールした際の処理を、関数定義する。
//-----------------------------------------------------------------------
const pageTopAnimation = () => {
  // scroll という変数に、ウィンドウのスクロール量を取得して、代入する。
  let scroll = $(window).scrollTop();
  // もしスクロール量が200px以上ならば
  if (scroll >= 200){
    // #page-top に付与した dodownward というクラス名を除く
    $("#page-top").removeClass("downward");
    // #page-top に upward というクラス名を付与する
    $("#page-top").addClass("upward");

  // そうではなくて、もし #page-topに upward というクラス名が付与されていたら
  } else if ($("#page-top").hasClass("upward")){
    // upward というクラス名を除き
    $("#page-top").removeClass("upward");
    // downward というクラス名を#page-topに付与する
    $("#page-top").addClass("downward");
  }
}

// 画面をスクロールをした際にどの関数を呼ぶか記述する
//-------------------------------------------------------------------------
$(window).scroll(() => {
  pageTopAnimation();
});

// ページが読み込まれた際にどの関数を呼ぶか記述する
//-------------------------------------------------------------------------
$(window).on("load", () => {
  pageTopAnimation();
});

// #page-topをクリックした際の設定
//-------------------------------------------------------------------------
$("#page-top a").on("click", () => {
    $("body, html").animate(
      { scrollTop: 0 }, // ページトップまでスクロール
      500               // ページトップまで500msかけてスクロールする。
    );
    return false;       // リンク自体の無効化。
});
