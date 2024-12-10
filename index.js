const mainRoutes = {
  login: {
    path: "src/login/login.html",
    head: [
      {
        tag: "link",
        props: [{ href: "src/login/login.css" }, { rel: "stylesheet" }],
      },
    ],
    tail: [
      {
        tag: "script",
        props: [
          { type: "text/javascript" },
          { src: "src/utility-functions/google-sheet-api.js" },
        ],
      },
    ],
  },
  products: {
    path: "src/products/products.html",
    head: [
      {
        tag: "script",
        props: [
          { type: "text/javascript" },
          { src: "src/utility-functions/google-sheet-api.js" },
        ],
      },
      {
        tag: "script",
        props: [
          { type: "text/javascript" },
          { src: "https://code.jquery.com/jquery-3.6.4.min.js" },
        ],
      },
      {
        tag: "script",
        props: [
          { type: "text/javascript" },
          {
            src: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
          },
        ],
      },
      {
        tag: "link",
        props: [
          { href: "https://fonts.googleapis.com/css?family=Lato&display=swap" },
          { rel: "stylesheet" },
        ],
      },
      {
        tag: "link",
        props: [
          {
            href: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
          },
          { rel: "stylesheet" },
        ],
      },
      {
        tag: "link",
        props: [
          {
            href: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css",
          },
          { rel: "stylesheet" },
        ],
      },
      {
        tag: "link",
        props: [
          {
            href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css",
          },
          { rel: "stylesheet" },
        ],
      },
      {
        tag: "link",
        props: [
          {
            href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css",
          },
          { rel: "stylesheet" },
        ],
      },
      {
        tag: "link",
        props: [{ href: "src/products/products.css" }, { rel: "stylesheet" }],
      },

      {
        tag: "link",
        props: [
          { href: "src/common-components/header.css" },
          { rel: "stylesheet" },
        ],
      },
      {
        tag: "link",
        props: [
          { href: "src/common-components/footer.css" },
          { rel: "stylesheet" },
        ],
      },
    ],
    tail: [
      {
        tag: "script",
        props: [
          { type: "text/javascript" },
          { src: "src/products/products.js" },
        ],
      },
      {
        tag: "script",
        props: [
          { type: "text/javascript" },
          { src: "src/common-components/slider.js" },
        ],
      },
    ],
  },
  productDetails: {
    path: "src/product-details/product-details.html",
    head: [
      {
        tag: "link",
        props: [
          { href: "src/product-details/product-details.css" },
          { rel: "stylesheet" },
        ],
      },
    ],
    tail: [
      {
        tag: "script",
        props: [
          { type: "text/javascript" },
          { src: "src/product-details/product-details.js" },
        ],
      },
    ],
  },
};

function loadPage(page, state) {
  fetch(`${mainRoutes?.[page]?.path}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      const element = document.getElementById("main-content");
      element.innerHTML = html;
      mainRoutes?.[page]?.head?.map((ref) => {
        loadToHead(ref);
      });
      mainRoutes?.[page]?.tail?.map((ref) => {
        loadToTail(ref);
      });
    })
    .catch((error) => {
      document.getElementById(
        "main-content"
      ).innerText = `Error: ${error.message}`;
    });

  function loadToHead(ref) {
    const tag = document.createElement(`${ref?.tag}`);
    ref?.props?.map((prop) => {
      tag[Object.keys(prop)?.[0]] = prop[Object.keys(prop)?.[0]];
    });
    document.head.appendChild(tag);
  }

  function loadToTail(ref) {
    const tag = document.createElement(`${ref?.tag}`);
    ref?.props?.map((prop) => {
      tag[Object.keys(prop)?.[0]] = prop[Object.keys(prop)?.[0]];
    });
    document.body.appendChild(tag);
  }
}

function load(url, id) {
  req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.send(null);
  document.getElementById(id).innerHTML = req.responseText;
}
