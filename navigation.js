// アニメーション関数(デスクトップ用)を定義する
const fixedAnimationForDesktop = () => {
  // スクロール量を取得
  let scroll       = $(window).scrollTop();

  // 300px以上、スクロールしたら
  if (scroll >= 300) {
    // ヘッダーを表示
    $("#desktop-header").removeClass("hidden");
    $("#desktop-header").addClass("shown");
    // 上から現れるよう、動きのためのクラス付与
    $("#desktop-header").removeClass("upward");
    $("#desktop-header").addClass("downward");
  }
  // そうでなければ
  else {
    // 画面上部に消えていく動きのためのクラス付与
    $("#desktop-header").removeClass("downward");
    $("#desktop-header").addClass("upward");
    // ヘッダーを非表示
    $("#desktop-header").removeClass("shown");
    $("#desktop-header").addClass("hidden");
  }
}

// アニメーション関数（モバイル用）を定義する
const fixedAnimationForMobile = () => {
  // スクロール量を取得
  let scroll       = $(window).scrollTop();

  // 300px以上、スクロールしたら
  if (scroll >= 300) {
    $("#mobile-header").removeClass("hidden");
    $(".open_button").addClass("fadeDown");
  }
  // そうでなければ
  else {
    $("#mobile-header").addClass("hidden");
    $(".open_button").removeClass("fadeDown");
  }
}

// 画面幅を取得
let windowWidth = $(window).width();

// 画面がスクロールときに、メニュー表示を行う
if (windowWidth <= 768) {
  // モバイル版のメニュー表示
  $(window).scroll(fixedAnimationForMobile);
  // ハンバーガーボタンをクリックした際の処理
  $(".open_button").on("click", () => {
    $(".open_button").toggleClass("active");
    $("#mobile-menu").toggleClass("active");
  });
  // リンクをクリックした際の処理
  $("#mobile-menu li a").on("click", () => {
    $(".open_button").removeClass("active");
    $("#mobile-menu").removeClass("active");
    $(".open_button").removeClass("fadeDown");
  });
} else {
  // デスクトップ版のメニュー表示
  $(window).scroll(fixedAnimationForDesktop);
}
