var chArray = [];
var engArray = [];
var currentArray = 0;
var displayText;
var popupOpen = false;

window.onload = function() {
    init();
};

function init() {
    if (chArray.length === 0) {
        document.getElementById("placeholder-text").innerHTML = '請上傳中文 .txt 檔';
    }
    // Chinese txt file
    document.getElementById('ch-upload-btn').addEventListener('click', openChDialog);
    document.getElementById('ch-txt').addEventListener('change', getChFile);
    // English txt file
    document.getElementById('eng-upload-btn').addEventListener('click', openEngDialog);
    document.getElementById('eng-txt').addEventListener('change', getEngFile);
}

function getChFile(event) {
    chArray = [];
    const input = event.target
    if ('files' in input && input.files.length > 0) {
        placeChFileContent(
        document.getElementById('content-target'),
        input.files[0])
    }
}

function placeChFileContent(target, file) {
    readFileContent(file).then(content => {
        chArray = content.split(/\r?\n/);
    }).catch(error => console.log(error));
    document.getElementById('eng-upload-btn').removeAttribute("disabled");
    if (engArray.length === 0) {
        document.getElementById("placeholder-text").innerHTML = 'Please upload the English .txt file';
    }
}


function openChDialog() {
    document.getElementById('ch-txt').click();
}

function getEngFile(event) {
    engArray = [];
    const input = event.target
    if ('files' in input && input.files.length > 0) {
        placeEngFileContent(
        document.getElementById('content-target'),
        input.files[0])
    }
    document.getElementById('start-btn').removeAttribute("disabled");
    document.getElementById("placeholder-text").innerHTML = '';
}

function placeEngFileContent(target, file) {
    readFileContent(file).then(content => {
        engArray = content.split(/\r?\n/);
        let index = 0;
        chArray.forEach(function(item) {
            var p = document.createElement("p");
            p.id = index;
            var text = document.createTextNode(item);
            p.onclick = function() {
                if (engArray.length > 0) {
                    document.getElementById(currentArray.toString()).classList.toggle("active");
                    document.getElementById(this.id).classList.toggle("active");
                    currentArray = parseInt(this.id);
                    displayText = engArray[currentArray];
                    localStorage.setItem("Display Text", displayText);
                    openPopup();
                }
            };
            p.appendChild(text);
            document.getElementById("subtitle").appendChild(p);
            index++;
        });
        displayText = engArray[0];
        document.getElementById(currentArray.toString()).classList.toggle("active");
        localStorage.setItem("Display Text", displayText);
    }).catch(error => console.log(error));

    window.addEventListener("keydown", function(e){
        switch (e.keyCode) {
            case 37:
                if (currentArray > 0) {
                    e.preventDefault();
                    document.getElementById(currentArray.toString()).classList.toggle("active");
                    displayText = engArray[currentArray - 1];
                    currentArray--;
                    document.getElementById(currentArray.toString()).classList.toggle("active");
                }
                break;
            case 38:
                if (currentArray > 0) {
                    e.preventDefault();
                    document.getElementById(currentArray.toString()).classList.toggle("active");
                    displayText = engArray[currentArray - 1];
                    currentArray--;
                    document.getElementById(currentArray.toString()).classList.toggle("active");
                }
                break;
            case 39:
                if (currentArray < chArray.length - 1) {
                    e.preventDefault();
                    document.getElementById(currentArray.toString()).classList.toggle("active");
                    displayText = engArray[currentArray + 1];
                    currentArray++;
                    document.getElementById(currentArray.toString()).classList.toggle("active");
                }
                break;
            case 40:
                if (currentArray < chArray.length - 1) {
                    e.preventDefault();
                    document.getElementById(currentArray.toString()).classList.toggle("active");
                    displayText = engArray[currentArray + 1];
                    currentArray++;
                    document.getElementById(currentArray.toString()).classList.toggle("active");
                }
                break;
        }
        localStorage.setItem("Display Text", displayText);
    }, true);
}

function openEngDialog() {
    document.getElementById('eng-txt').click();
}

function readFileContent(file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
    })
}

function openPopup() {

    if (!popupOpen) {
        const popup = window.open('../popup/popup.html', '_blank', 'height=190,width=1600,transparent=true,frame=false,alwaysOnTop=true');
        popup.window.addEventListener('load', () => {
            popupOpen = true;
            popup.window.addEventListener('unload', () => {
                popupOpen = false;
            });
        });
    }
    
}
