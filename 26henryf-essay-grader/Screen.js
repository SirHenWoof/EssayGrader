$('textarea').on('input', function() {
  $(this)
    .width (500)
    .height(500)
    .width (this.scrollWidth)
    .height(this.scrollHeight);
});