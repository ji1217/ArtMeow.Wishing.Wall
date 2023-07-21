$(() => {
  class WishWall {
    constructor() {
      this.colors = ['#FF5722', '#FF9800', '#F44336', '#E91E63', '#9C27B0', '#2196F3', '#4CAF50'];
      this.$document = $(document);
      this.$body = $(document.body);
      this.$input = $('input[name=text]');
      this.winW = $(window).width();
      this.winH = $(window).height() - 300;
      this.bindEvents();
      // initial wish cards
      ['I wanna fly.', '心想事成.', 'Be a Cat.', 'I wish '].forEach(text => this.addWish(text));
    }

    addWish(text) {
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      const top = parseInt(Math.random() * this.winH);
      const left = parseInt(Math.random() * this.winW);

      this.$body.append(`
        <div class="Card" style="top: ${top}px; left: ${left}px; background: ${color};">
          <span class="Card__close">x</span>
          <p class="Card__text">${text}</p>
        </div>
      `);
    }

    bindEvents() {
      this.$input.on('keydown', e => {
        if (e.which !== 13 || !this.$input.val()) return;
        this.addWish(this.$input.val());
        this.$input.val('');
      });

      this.$document.on('click', '.Card__close', e => $(e.target).parent().remove());

      this.$document.on('mousedown', '.Card', e => {
        const $card = $(e.currentTarget);
        const diffY = e.clientY - $card.offset().top;
        const diffX = e.clientX - $card.offset().left;
        $card.css('z-index', 1);
        $card.siblings().css('z-index', 0);

        this.$document.on('mousemove', e => {
          let top = e.clientY - diffY;
          let left = e.clientX - diffX;

          if (top < 0) top = 0;else
          if (top > this.winH) top = this.winH;

          if (left < 0) left = 0;else
          if (left > this.winW) left = this.winW;

          $card.css({ 'top': `${top}px`, 'left': `${left}px`, 'z-index': 1 });
        });
      });

      this.$document.on('mouseup', () => this.$document.off('mousemove'));
    }}


  new WishWall();
});