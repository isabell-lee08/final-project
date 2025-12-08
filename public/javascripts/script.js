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
        const cryStory = document.createElement('div');
        cryStory.classList.add('cryStory');
        cryStory.id = cryList[i]._id;

        const cryStoryDate = document.createElement('p');
        cryStoryDate.classList.add('date');
        cryStoryDate.innerHTML = cryList[i].date;

        const cryStoryReason = document.createElement('p');
        cryStoryReason.classList.add('reason');
        cryStoryReason.innerHTML = cryList[i].reason;

        cryStory.appendChild(cryStoryDate);
        cryStory.appendChild(cryStoryReason);

        container.appendChild(cryStory);
    }
}

const addButton = document.getElementById('add-button');

addButton.addEventListener('click', function () {
    let reasonValue = document.getElementById('reason').value;
    let dateValue = document.getElementById('date').value;

    if (reasonValue) {
        document.getElementById('inputWarning').innerHTML = "";
        addCry(reasonValue, dateValue);
        document.getElementById('reason').value = "";
        document.getElementById('date').value = "";
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