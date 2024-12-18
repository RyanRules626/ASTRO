/* This was incorrectly named! This manages ALL javascript features! DO NOT MESS WITH THIS! */




// Fullscreen code 


function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function makeFullScreen() {
    document.getElementsByTagName("iframe")[0].className = "fullScreen";
    var elem = document.body;
    requestFullScreen(elem);
}

function stopFullScreen() {
            if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
}

// Panic key

document.body.addEventListener("keydown", function (event) {
    if (event.key === "-") {
        window.location.replace("https://canvas.instructure.com");
    }
});

// Tab cloaking PRO

const logo = "\x1b[91m[Parcoil Cloak]\x1b[0m";

const cloak = {
  getFavicon() {
    const icons = document.querySelectorAll('link[rel="icon"]');
    return icons.length > 0 ? icons[0].href : null;
  },
  setFavicon(url) {
    const icons = document.querySelectorAll('link[rel="icon"]');
    icons.forEach((icon) => (icon.href = url));
  },
  getTitle() {
    return document.title;
  },
  setTitle(newTitle) {
    document.title = newTitle;
  },
  setCloak(newTitle, url) {
    this.setTitle(newTitle);
    this.setFavicon(url);
    localStorage.setItem("cloakTitle", newTitle);
    localStorage.setItem("cloakFavicon", url);
  },
  init() {
    let cloakTitle = localStorage.getItem("cloakTitle");
    let cloakFavicon = localStorage.getItem("cloakFavicon");

    if (!cloakTitle || !cloakFavicon) {
      console.log(logo, "Initializing cloak settings...");
      const newTitle = this.getTitle();
      const newFavicon = this.getFavicon();
      if (!cloakTitle) {
        localStorage.setItem("cloakTitle", newTitle);
      }
      if (!cloakFavicon && newFavicon) {
        localStorage.setItem("cloakFavicon", newFavicon);
      }
      cloakTitle = localStorage.getItem("cloakTitle");
      cloakFavicon = localStorage.getItem("cloakFavicon");
    }

    this.setCloak(cloakTitle, cloakFavicon);
  },
  aboutBlank(url) {
    if (!url) url = "https://www.google.com/search?q=how+many+seconds+in+a+day";
    const newWindow = window.open();
    const iframe = newWindow.document.createElement("iframe");
    newWindow.document.body.style.margin = "0";
    newWindow.document.body.style.height = "100vh";
    iframe.src = window.location.href;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    newWindow.document.body.appendChild(iframe);
    window.location.replace(url);
  },
  reset() {
    localStorage.removeItem("cloakTitle");
    localStorage.removeItem("cloakFavicon");
    window.location.reload();
  },
};

window.cloak = cloak;

document.addEventListener("DOMContentLoaded", () => {
  let savedTitle = localStorage.getItem("cloakTitle");
  let savedFavicon = localStorage.getItem("cloakFavicon");

  cloak.setFavicon(savedFavicon);
  cloak.setTitle(savedTitle);

  const cloakSelect = document.querySelector("[data-cloak-select]");

  if (cloakSelect) {
    cloakSelect.addEventListener("change", () => {
      const selectedCloakName = cloakSelect.value;
      const selectedCloak = cloaks.find(
        (cloak) => cloak.name === selectedCloakName
      );

      if (selectedCloak) {
        cloak.setCloak(selectedCloak.title, selectedCloak.icon);
        console.log(logo, `Set cloak to: ${selectedCloak.title}`);
      } else {
        console.error(
          `Cloak '${selectedCloakName}' not found in cloaks array.`
        );
      }
    });
  }
});

cloak.init();
// Anti-blocksi mode

    window.addEventListener('beforeunload', function (e) {
      // Cancel the event
      e.preventDefault();
      // Chrome requires returnValue to be set
      e.returnValue = '';
    });
    window.onbeforeunload=function(){return "Anti-tab close enabled."};