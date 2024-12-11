loadContent("src/header/header.html", 1);
loadContent("src/slider/slider.html", 2);
loadContent("src/content/content.html", 3);
// loadContent("src/footer/footer.html", 4);

loadToTail({
  tag: "script",
  props: [{ type: "text/javascript" }, { src: "src/slider/slider.js" }],
});
loadToTail({
  tag: "script",
  props: [{ type: "text/javascript" }, { src: "src/content/content.js" }],
});
