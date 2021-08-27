// テキストを含む一般的なモーダル
$(".info").modaal({
  overlay_close: true, // モーダル背景クリック時に閉じるか
  before_open: () => { // モーダルが開く前に行う動作
    $('html').css('overflow-y', 'hidden'); // 縦スクロールバーを出さない
  },
  after_close: () => { // モーダルが閉じた後に行う動作
    $('html').css('overflow-y', 'scroll'); // 縦スクロールバーを出す
  }
});

// 確認を促すモーダル
$(".confirm").modaal({
  type: 'confirm',
  confirm_title: 'ログイン画面', // 確認画面タイトル
  confirm_button_text: 'ログイン', // 確認画面ボタンのテキスト
  confirm_cancel_button_text: 'キャンセル', // 確認画面キャンセルボタンのテキスト
  confirm_content: 'ログインが必要です。<br>この画面はボタンを押さなければ閉じません。', // 確認画面の内容
});

// 画像のモーダル
$(".gallery").modaal({
  type: 'image',
  overlay_close: true, // モーダル背景クリック時に閉じるか
  before_open: () => { // モーダルが開く前に行う動作
    $('html').css('overflow-y', 'hidden'); // 縦スクロールバーを出さない
  },
  after_close: () => { // モーダルが閉じた後に行う動作
    $('html').css('overflow-y', 'scroll'); // 縦スクロールバーを出す
  }
});

// 動画のモーダル
$(".video-open").modaal({
  type: 'video',
  overlay_close: true, // モーダル背景クリック時に閉じるか
  background: '#28bfe7', // 背景色
  overlay_opacity: 0.8, // 透過具合
  before_open: () => { // モーダルが開く前に行う動作
    $('html').css('overflow-y', 'hidden'); // 縦スクロールバーを出さない
  },
  after_close: () => { // モーダルが閉じた後に行う動作
    $('html').css('overflow-y', 'scroll'); // 縦スクロールバーを出す
  }
});

// iframeのモーダル
let w = $(window).width();  // 画面幅を取得
let h = $(window).height(); // 画面高さを取得
$(".iframe-open").modaal({
  type: 'iframe',
  width: w * 0.8,  // iframe横幅
  height: h * 0.8, // iframe高さ
  overlay_close: true, // モーダル背景クリック時に閉じるか
  before_open: () => { // モーダルが開く前に行う動作
    $('html').css('overflow-y', 'hidden'); // 縦スクロールバーを出さない
  },
  after_close: () => { // モーダルが閉じた後に行う動作
    $('html').css('overflow-y', 'scroll');  // 縦スクロールバーを出す
  }
});
