$(".slider").slick({
  slidesToShow: 3,         // 画面に見せるスライドの枚数
  slidesToScroll: 3,       // 1回のスクロールで移動するスライドの枚数
  dots: true,              // 画面下部に案内用ドット（点）を表示
  arrows: true,            // 左右の矢印表示
  autoplay: true,          // 自動再生
  autoplaySpeed: 2000,     // 自動再生速度(ms)
  rows: 1,                 // スライド表示に用いる行数
  pauseOnHover: true,      // ホバー時に停止するか否か
  responsive: [            // レスポンシブ対応
    {
      breakpoint: 768,     // 端末の横幅が768px以下の見せ方
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 428,     // 端末の横幅が428px以下の見せ方
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
});
