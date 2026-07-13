/* SL3D portfolio — header state, scroll reveal, gallery lightbox */
(function () {
  "use strict";

  /* header background on scroll */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* lightbox */
  var galleryImgs = Array.prototype.slice.call(
    document.querySelectorAll(".gallery img")
  );
  if (!galleryImgs.length) return;

  var lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-label", "Image viewer");
  lb.innerHTML =
    '<img alt="">' +
    '<button class="lb-close" aria-label="Close">&#10005;</button>' +
    '<button class="lb-prev" aria-label="Previous">&#8592;</button>' +
    '<button class="lb-next" aria-label="Next">&#8594;</button>' +
    '<span class="lb-counter"></span>';
  document.body.appendChild(lb);

  var lbImg = lb.querySelector("img");
  var counter = lb.querySelector(".lb-counter");
  var current = 0;

  function show(i) {
    current = (i + galleryImgs.length) % galleryImgs.length;
    var src = galleryImgs[current].dataset.full || galleryImgs[current].src;
    lbImg.src = src;
    lbImg.alt = galleryImgs[current].alt || "";
    counter.textContent = (current + 1) + " / " + galleryImgs.length;
  }

  function open(i) {
    show(i);
    lb.classList.add("is-open");
    document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  }

  function close() {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
    lbImg.src = "";
  }

  galleryImgs.forEach(function (img, i) {
    img.addEventListener("click", function () { open(i); });
  });

  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });

  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();
