// date field
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;
document.getElementById('date').setAttribute('max', formattedDate);

let cryList = [];

async function getCry() {
    const response = await fetch('/api/cry');
    const data = await response.json();
    console.log(data);
    cryList = data;

    updateDisplay();
}

getCry();

function updateDisplay() {
    let container = document.getElementById("container")
    container.innerHTML = "";

    for (let i = 0; i < cryList.length; i++) {
        const cryEye = document.createElement('div');
        cryEye.classList.add('eye');
        cryEye.classList.add('closed');
        cryEye.id = cryList[i]._id;
        container.appendChild(cryEye);

        let overlay = document.createElement("div")
        overlay.setAttribute('id', 'overlay');

        const tear = document.createElement('div');
            tear.classList.add('tearAnim');

        cryEye.addEventListener('click', function () {
            overlay.innerHTML = "";
            cryEye.classList.replace('closed', 'open');

            document.body.appendChild(overlay);

            cryEye.appendChild(tear)

            const cryStory = document.createElement('div');
            cryStory.classList.add('cryStory');

            const cryStoryDate = document.createElement('p');
            cryStoryDate.classList.add('date');
            cryStoryDate.innerHTML = cryList[i].date;

            const cryStoryReason = document.createElement('p');
            cryStoryReason.classList.add('reason');
            cryStoryReason.innerHTML = cryList[i].reason;

            cryStory.appendChild(cryStoryDate);
            cryStory.appendChild(cryStoryReason);
            overlay.appendChild(cryStory);
        });

        overlay.addEventListener('click', function () {
            cryEye.classList.replace('open', 'closed');
            overlay.innerHTML = "";
            document.body.removeChild(overlay);
            cryEye.removeChild(tear);
        });
    }
}

const addButton = document.getElementById('add-button');

addButton.addEventListener('click', function () {
    let reasonValue = document.getElementById('reason').value;
    let dateValue = document.getElementById('date').value;

    if (reasonValue) {
        if (dateValue) {
            document.getElementById('inputWarning').innerHTML = "";
            addCry(reasonValue, dateValue);
            document.getElementById('reason').value = "";
            document.getElementById('date').value = "";
        } else {
            document.getElementById('inputWarning').innerHTML = "";
            dateValue = "unknown date";
            addCry(reasonValue, dateValue);
            document.getElementById('reason').value = "";
            document.getElementById('date').value = "";
        }
    } else {
        document.getElementById('inputWarning').innerHTML = "Please input a response."
    }

});

async function addCry(reasonValue, dateValue) {
    const postData = {
        reason: reasonValue,
        date: dateValue
    }
    const response = await fetch('/api/cry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    cryList = data;
    getCry()
}