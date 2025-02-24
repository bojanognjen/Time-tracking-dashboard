const buttons = document.querySelectorAll('.span-first');
const firstCall = 'weekly';
let obj = '';
let boxes = document.querySelectorAll('.box');

function writing(data,firstCall) {

    let period = firstCall.toLowerCase();

    for(let button of buttons) {
        if(button.textContent.toLowerCase() == period) {
            button.style.color = '#fff';
        } else {
            button.style.color = '#7078c9';
        }
    }

    for(let box of boxes) {
        for(let arrayObject of data) {
            if (box.children[1].children[0].children[0].innerText.toLowerCase() == arrayObject.title.toLowerCase()) {
                for(let key in arrayObject.timeframes) {
                    if(key == period) {
                        box.children[1].children[1].children[0].textContent = arrayObject.timeframes[key].current + 'hrs';
                        if (key == 'daily') {
                            box.children[1].children[1].children[1].textContent = `Yesterday - ${arrayObject.timeframes[key].previous}hrs`;
                        } 
                        else if (key == 'weekly') {
                            box.children[1].children[1].children[1].textContent = `Last Week - ${arrayObject.timeframes[key].previous}hrs`;
                        } 
                        else {
                            box.children[1].children[1].children[1].textContent = `Last Month - ${arrayObject.timeframes[key].previous}hrs`;
                        }
                    }
                }

            }
        }
    }

}

async function loading() {
    try{
        let response = await fetch('https://raw.githubusercontent.com/bojanognjen/Time-tracking-dashboard/master/data.json', {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP status is: ${response.status}`);
        }

        let data = await response.json();
        obj = data;
        writing(data,firstCall);

    }
    catch (err) {
        console.log(`There was an error: ${err.message}`);
    }   
}

window.addEventListener('load', loading);

buttons.forEach(button => {
    if (button) { // ✅ Prevents errors if an element doesn't exist
        button.addEventListener('click', () => {
            writing(obj,button.textContent);
        });
    }
});


