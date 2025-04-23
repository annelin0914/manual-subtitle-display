window.onload = function() {
    init();
};

function init() {
    var windowTopBar = document.createElement('div')
    windowTopBar.style.width = "100%"
    windowTopBar.style.height = "100%"
    windowTopBar.style.position = "absolute"
    windowTopBar.style.top = windowTopBar.style.left = 0
    windowTopBar.style.webkitAppRegion = "drag"
    document.body.appendChild(windowTopBar);

    window.addEventListener('storage', () => {
        document.getElementById("display-subtitle").innerHTML = localStorage.getItem("Display Text");
    });

    document.getElementById("display-subtitle").innerHTML = localStorage.getItem("Display Text");
}