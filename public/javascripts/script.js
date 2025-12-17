// date field
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;
document.getElementById('date').setAttribute('max', formattedDate);

// tear rate
let tearsValue = "";
const rateDiv = document.getElementsByClassName("rater");
for (var i = 0; i < rateDiv.length; i++) {
    rateDiv[i].addEventListener('click', function () {
        tearsValue = this.value;
    });
}
function clearRate() {
    tearsValue = "";
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.checked = false;
    });
}

let cryList = [];

async function getCry() {
    const response = await fetch('/api/cry');
    const data = await response.json();
    console.log(data);
    cryList = data;

    updateDisplay();
    clearRate();
}

getCry();

// make cry
let container = document.getElementById("container");
let cryStory = document.getElementById("messageBox");

function updateDisplay() {
    clearRate();
    container.innerHTML = "";

    for (let i = 0; i < cryList.length; i++) {
        const cryEye = document.createElement('div');
        cryEye.classList.add('eye', 'closed');
        cryEye.id = cryList[i]._id;

        container.appendChild(cryEye);

        const tear = document.createElement('div');
        tear.classList.add('tearAnim', 'size' + cryList[i].tearsNum);

        const cryStoryCard = document.createElement('div');
        cryStoryCard.classList.add('card');
        cryStoryCard.classList.add(cryList[i]._id);

        const cryStoryContent = document.createElement('div');
        cryStoryContent.classList.add('content');
        cryStoryCard.appendChild(cryStoryContent);

        const cryStoryDate = document.createElement('p');
        cryStoryDate.classList.add('date');
        cryStoryDate.innerHTML = ('Date: ' + cryList[i].date);

        const cryStoryReason = document.createElement('p');
        cryStoryReason.classList.add('reason');
        cryStoryReason.innerHTML = cryList[i].reason;

        const cryStoryRate = document.createElement('div');
        cryStoryRate.setAttribute('title', cryList[i].tearsNum + " tear(s)")

        let numOfIcons = cryList[i].tearsNum;

        for (let i = 0; i < numOfIcons; i++) {
            const tearIcon = document.createElement('img');
            tearIcon.src = "/public/images/tearIcon.png";
            cryStoryRate.appendChild(tearIcon)
        }

        cryStoryContent.appendChild(cryStoryDate);
        cryStoryContent.appendChild(cryStoryRate);
        cryStoryContent.appendChild(cryStoryReason);

        function closeEye() {
            cryEye.classList.replace('open', 'closed');
            cryEye.classList.remove('highlight');
            cryEye.removeChild(tear)
            cryStory.removeChild(cryStoryCard);
        }

        function openEye() {
            cryEye.classList.replace('closed', 'open');
            cryEye.appendChild(tear)
            cryStory.appendChild(cryStoryCard);
        }

        const cryStoryDelete = document.createElement('button');
        cryStoryDelete.classList.add('delete');
        cryStoryDelete.innerHTML = ('x');
        cryStoryDelete.addEventListener('click', function () {
            closeEye();
        })
        cryStoryCard.appendChild(cryStoryDelete);

        cryEye.addEventListener('click', function () {
            if (cryEye.classList.contains('open') || cryEye.classList.contains('highlight')) {
                closeEye()
            } else {
                openEye()
                cryStoryCard.style.background = "white"
                const direction = document.getElementById('direction');
                if (direction) {
                    cryStory.removeChild(direction);
                }
            }
            // click highlight
            cryStoryCard.addEventListener('pointerover', function () {
                cryStoryCard.style.background = "gold"
                cryEye.classList.add('highlight');
            })

            cryStoryCard.addEventListener('pointerout', function () {
                cryStoryCard.style.background = "white"
                cryEye.classList.remove('highlight');
            })
        });
    }
    const divider = document.createElement('div');
    divider.classList.add('divider');
    container.appendChild(divider);
}


// add cry
const addButton = document.getElementById('add-button');

addButton.addEventListener('click', function () {
    cryStory.innerHTML = "";
    let reasonValue = document.getElementById('reason').value;
    let dateValue = document.getElementById('date').value;
    if (reasonValue && tearsValue) {
        if (dateValue) {
            addCry(reasonValue, dateValue, tearsValue);
            document.getElementById('reason').value = "";
            document.getElementById('date').value = "";
        } else {
            dateValue = "unknown date";
            addCry(reasonValue, dateValue, tearsValue);
            document.getElementById('reason').value = "";
            document.getElementById('date').value = "";
        }
    } else {
        if (reasonValue) {
            alert("Please indicate how hard you cried.")
        } else if (tearsValue) {
            alert("Please input a reason.")
        } else {
            alert("Please make sure all fields are filled.")
        }
    }

});

async function addCry(reasonValue, dateValue, tearsValue) {
    const postData = {
        reason: reasonValue,
        date: dateValue,
        tearsNum: tearsValue
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

    // success message
    const success = document.getElementById("success");
    function showSuccess() {
        success.style.display = 'inline';
    }

    showSuccess();

    function hideSuccess() {
        success.style.display = 'none';
    }

    setTimeout(hideSuccess, 4000);
}

// sort by tears
const sorter = document.getElementById("tear_choices");

sorter.addEventListener('change', function () {
    let sortChoice = sorter.value;
    sortCry(sortChoice);
});

const resetSort = document.getElementById("reset");

resetSort.addEventListener('click', function () {
    let sortChoice = "";
    sortCry(sortChoice);
});

async function sortCry(sortChoice) {
    const response = await fetch('/api/cry/' + sortChoice);
    const data = await response.json();
    cryList = data;

    cryStory.innerHTML = "";
    updateDisplay();
    clearRate();
}