// アニメーション関数(デスクトップ用)を定義する
const fixedAnimationForDesktop = () => {
  // スクロール量を取得
  let scroll       = $(window).scrollTop();

  // 200px以上、スクロールしたら
  if (scroll >= 200) {
    // ヘッダーを表示
    $("#header").removeClass("hidden");
    $("#header").addClass("shown");
    // 上から現れるよう、動きのためのクラス付与
    $("#header").removeClass("upward");
    $("#header").addClass("downward");
  }
  // そうでなければ
  else {
    // 画面上部に消えていく動きのためのクラス付与
    $("#header").removeClass("downward");
    $("#header").addClass("upward");
    // ヘッダーを非表示
    $("#header").removeClass("shown");
    $("#header").addClass("hidden");
  }
}

// アニメーション関数（モバイル用）を定義する
const fixedAnimationForMobile = () => {
  // スクロール量を取得
  let scroll       = $(window).scrollTop();

  // 200px以上、スクロールしたら
  if (scroll >= 200) {
    $("#mobile-header").removeClass("hidden");
    $(".open_button").addClass("fadeDown");
    $("#mobile-header").addClass("done");
  }
  // そうでなければ
  else {
    $("#mobile-header").addClass("hidden");
    $(".open_button").removeClass("fadeDown");
    $("#mobile-header").removeClass("done");
  }
}

// 画面幅を取得
let windowWidth = $(window).width();

// 画面がスクロールされたら、アニメーション関数を呼び出す
if (windowWidth <= 768) {
  $(window).scroll(fixedAnimationForMobile);
  // ハンバーガーボタンをクリックした際の処理
  $(".open_button").on("click", () => {
    $(".open_button").toggleClass("active");
    $("#mobile-header").toggleClass("panel_active");
  });

  $("#mobile-header nav ul li a").on("click", () => {
    $(".open_button").removeClass("active");
    $("#mobile-header").removeClass("panel_active");
  });
} else {
  $(window).scroll(fixedAnimationForDesktop);
}
