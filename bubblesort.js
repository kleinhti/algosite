function bubbleSort(arr) {
    let n = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 1; i < n; i++) {
            if (arr[i - 1] > arr[i]) {
                // Vertauschen der Elemente
                let temp = arr[i - 1];
                arr[i - 1] = arr[i];
                arr[i] = temp;
                swapped = true;
            }
        }
        n--; // Da das größte Element am Ende jedes Durchlaufs an die richtige Position gebracht wird
    } while (swapped);
    return arr;
}