$('#vegas_slider').vegas({
  overlay: true,
  transition: 'blur',
  transitionDuration: 2000,
  delay: 10000,
  animationDuration: 20000,
  animation: 'kenburns',
  slides: [{ src: './images/room.jpg'},
           { src: './images/room02.jpg'},
           { src: './images/room03.jpg'},
           { src: './images/room04.jpg'},
           { src: './images/room05.jpg'}]
});
