const navSwitch = () => document.getElementById('navSwitch')

function optimise() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {
                code: `
                    document.getElementById('navigation-app').style.display = "none";
                    document.getElementById('ghx-header').style.display = "none";
                    document.getElementById('content').style.margin = "5px";
                    document.getElementById('content').style.border = "none";
                `
            });
    });
}

function undoOptimise() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {
                code: `
                    document.getElementById('navigation-app').style.display = "block";
                    document.getElementById('ghx-header').style.display = "table";
                `
            });
    });
}

const switchBtn = navSwitch();

switchBtn.onclick = () => {
    if (navSwitch().checked) {
        optimise();
        console.log('view optimise');
    } else {
        undoOptimise();
        console.log('updo view optimisation');
    }
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        { code: `document.getElementById('navigation-app').style.display;` },
        (result) => {
            switchBtn.checked = (result[0] != 'block')
        });
});

