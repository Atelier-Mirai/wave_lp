$(".zoo div").each(function () {
  $(this).magnificPopup({
    /* 基本設定いろいろ */
    delegate: "a",
    type: "image",
    tLoading: "Loading image# % curr % ...",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1],
      arrowMarkup: `<button title="%title%"
                            type="button"
                            class="mfp-arrow mfp-arrow-%dir%"></button>`,
      tPrev: "Previous(Left arrow key)",
      tNext: "Next(Right arrow key)",
      tCounter: '<span class="mfp-counter"> %curr% of %total% </span>'
    },
    image: {
      tError: '<a href="%url%"> The image# %curr% </a> could not be loaded.',
      titleSrc: function (item) {
        return `${item.el.attr('title')} <small> by Marsel Van Oosten </small>`;
      }
    },
    /* クリックしたときにズームアップするための設定 */
    mainClass: "mfp-with-zoom",
    zoom: {
      enabled: true,
      duration: 300,
      easing: "ease-in-out",
      opener: function (openerElement) {
        return openerElement.is("img") ? openerElement : openerElement.find("img");
      }
    }
  });
});
