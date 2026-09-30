// Header rule once scrolled, reveal on scroll, the example job ticket and the chat.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var top = document.getElementById('top');
  var onScroll = function () { if (top) top.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  // The ticket walks reported, booked, done, then starts again.
  var t = document.getElementById('ticket');
  if (t) {
    if (reduce) { t.setAttribute('data-step', '3'); }
    else {
      var step = 1, paused = false;
      t.addEventListener('mouseenter', function () { paused = true; });
      t.addEventListener('mouseleave', function () { paused = false; });
      setInterval(function () {
        if (paused || document.hidden) return;
        step = step === 3 ? 1 : step + 1;
        t.setAttribute('data-step', String(step));
      }, 2600);
    }
  }

  var chat = document.getElementById('chat');
  if (chat && !reduce && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { chat.classList.toggle('play', e.isIntersecting); });
    }, { threshold: 0.3 }).observe(chat);
  }
})();
