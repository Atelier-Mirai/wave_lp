// 任意のタブにURLからリンクするための関数
const showSegumentByHashLink = (locationHashLink) => {
  if (!locationHashLink) { return false; } // 引数が与えられないときは戻る。

  // タブ設定
  $('.tab.menu li').find('a').each(function() { // タブ内のaタグ全てを取得
    let id = $(this).attr('href');              // aタグのhref属性値を取得
                                                // (=表示させたいタブセグメントのID)

    // もしaタグのhref属性が、リンク元の指定されたURLのハッシュリンクと等しければ、
    if(id === locationHashLink){
      let containingElement = $(this).parent(); // タブ内のaタグの親要素liを取得
      $('.tab.menu li').removeClass("active");  // タブ内のliに付与された
                                                // activeクラスを取り除く
      $(containingElement).addClass("active");  // liにactiveクラスを付与
      $(".tab.segument").removeClass("active"); // タブセグメントのactiveクラスを取り除く
      $(locationHashLink).addClass("active");   // activeクラスを付与
    }
  });
}

// タブをクリックした際に、以下が実行される。
$('.tab.menu a').on('click', function() {
  let id  = $(this).attr('href'); // リンクのhref属性を取得
                                  // (=表示させたいタブセグメントのID)
  showSegumentByHashLink(id);     // タブセグメントを表示する
  return false;                   // aタグをクリックした際の通常動作
                                  // (リンク先へのジャンプ)を無効にする。
});

// ページ読み込み完了時に、以下が実行される。
$(window).on('load', () => {
  let locationHashLink = location.hash;     // URLのフラグメント識別子(ハッシュリンク)を取得
  showSegumentByHashLink(locationHashLink); // 設定したタブセグメントの読み込み
});
