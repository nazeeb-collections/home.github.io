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
        tag: "link",
        props: [{ href: "src/products/products.css" }, { rel: "stylesheet" }],
      },
      {
        tag: "link",
        props: [{ href: "src/header/header.css" }, { rel: "stylesheet" }],
      },
      {
        tag: "link",
        props: [{ href: "src/footer/footer.css" }, { rel: "stylesheet" }],
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
    state: {},
  },
  cart: {
    path: "src/cart/cart.html",
    head: [
      {
        tag: "link",
        props: [{ href: "src/cart/cart.css" }, { rel: "stylesheet" }],
      },
    ],
    tail: [
      {
        tag: "script",
        props: [
          { type: "text/javascript" },
          { src: "src/cart/cart.js" },
        ],
      },
    ],
  },
};

async function loadPage(page, id, state) {
  console.log("reached here")
  if (mainRoutes?.[page]?.path) {
    try {
      // Clear previously loaded dynamic resources
      removeDynamicResources();
      // Fetch HTML content for the new page
      loadContent(`${mainRoutes?.[page]?.path}`, id);
      // Dynamically load new styles and scripts
      mainRoutes?.[page]?.head?.forEach((ref) => loadToHead(ref));
      mainRoutes?.[page]?.tail?.forEach((ref) => loadToTail(ref));
    } catch (error) {
      document.getElementById(id).innerText = `Error: ${error.message}`;
      console.error(error);
    }
  }
}

async function loadHtmlBehind(url, id) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

function loadContent(url, id) {
  req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.send(null);
  document.getElementById(id).innerHTML = req.responseText;
}

function loadToHead(ref) {
  const tag = document.createElement(`${ref?.tag}`);
  ref?.props?.map((prop) => {
    tag[Object.keys(prop)?.[0]] = prop[Object.keys(prop)?.[0]];
  });
  tag.setAttribute("data-dynamic", "true"); // Mark as dynamic
  document.head.appendChild(tag);
}

function loadToTail(ref) {
  const tag = document.createElement(`${ref?.tag}`);
  ref?.props?.map((prop) => {
    tag[Object.keys(prop)?.[0]] = prop[Object.keys(prop)?.[0]];
  });
  tag.setAttribute("data-dynamic", "true"); // Mark as dynamic
  document.body.appendChild(tag);
}

// Function to remove all dynamically loaded resources
function removeDynamicResources() {
  // Remove dynamic styles
  document.querySelectorAll('link[data-dynamic="true"]').forEach((link) => {
    link.parentNode.removeChild(link);
  });

  // Remove dynamic scripts
  document.querySelectorAll('script[data-dynamic="true"]').forEach((script) => {
    script.parentNode.removeChild(script);
  });
}
