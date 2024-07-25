// Daten-Array und Labels initialisieren
let data = [5,4,3,2,1];
let labelsArray = [1,2,3,4,5];

let numbers = document.getElementById('numbers');

// Canvas-Kontext abrufen
const ctx = document.getElementById('myChart').getContext('2d');

// Chart initialisieren
let myChart;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function bubbleSort() {




//bubbleSort();
    let n = data.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 1; i < n; i++) {
            if (data[i - 1] > data[i]) {
                // Vertauschen der Elemente
                let temp = data[i - 1];
                data[i - 1] = data[i];
                data[i] = temp;
                swapped = true;

                myChart.update();
                await sleep(500);
            }
        }
        n--; // Da das größte Element am Ende jedes Durchlaufs an die richtige Position gebracht wird
    } while (swapped);
    console.log(data)
}

async function quickSort() {
    const partition = async (left, right) => {
        let pivot = data[right];
        let i = left - 1;
        for (let j = left; j < right; j++) {
            console.log(left + " " + right);
            if (data[j] < pivot) {
                i++;
                let temp = data[i];
                data[i] = data[j];
                data[j] = temp;
                await sleep(500);
                myChart.update();
            }
        }
        let temp = data[i + 1];
        data[i + 1] = data[right];
        data[right] = temp;
        return i + 1;
    };

    const sort = async (left, right) => {
        if (left < right) {
            let pi = await partition(left, right);
            await sort(left, pi - 1);
            await sort(pi + 1, right);
        }
    };

    await sort(0, data.length - 1);
    console.log(data); // Ausgabe des sortierten Arrays
}


function createRandomArray() {
    let randomArray = [];
    for (let i = 0; i < 10; i++) {
        let randomNumber = Math.floor(Math.random() * 100); // Zufallszahl zwischen 0 und 99
        randomArray.push(randomNumber);
    }
    return randomArray;
}

function createArrayUpTo(x) {
    let resultArray = [];
    for (let i = 0; i < x; i++) {
        resultArray.push(i);
    }
    return resultArray;
}


// Listener

document.getElementById('random').addEventListener('click', function (){
    console.log("Test");
    if (numbers.value === ""){
        numbers.value = createRandomArray().toString();
    } else {
        numbers.value += "," + createRandomArray().toString();
    }
})

document.getElementById('submit').addEventListener('click', function(e) {
    data = numbers.value.split(',').map(Number);
    labelsArray = createArrayUpTo(data.length);
    console.log(data);
    console.log(labelsArray);
    if (myChart){
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelsArray,
            datasets: [{
                label: 'Liste',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });
    myChart.update();
    bubbleSort();
})