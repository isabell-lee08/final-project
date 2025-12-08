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
    document.getElementById("list").innerHTML = ''
    for (let i = 0; i < cryList.length; i++) {
        const cryStory = document.createElement('li');
        cryStory.innerText = cryList[i].reason + ', ' + cryList[i].date;
        cryStory.id = cryList[i]._id;

        list.appendChild(cryStory);
    }
}