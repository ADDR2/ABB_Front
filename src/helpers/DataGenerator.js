function dataGenerator(
    featuresAmount = 6,
    maxTotalRows = 50000,
    featureNames = ['Helix', 'Tragus', 'Lobule', 'Auditory Ossicle º1', 'Auditory Ossicle º2', 'Eustachian Tube']
) {
    const maxRowsPerTable = Math.floor(maxTotalRows / featuresAmount);
    const data = [];

    for(let index = 0; index < featuresAmount; index++) {
        const rowsPerTable = Math.floor(Math.random() * (maxRowsPerTable - 1) + 1);
        const amountOfDataSetsPerTable = Math.floor(rowsPerTable / 4);
        const feature = [];

        for (let secondIndex = 0; secondIndex < amountOfDataSetsPerTable; secondIndex+=4) {
            feature.push({ control: 'X', dev: Math.floor(Math.random()*101), devOut: Math.floor(Math.random()*501), state: Math.floor(Math.random()*3) });
            feature.push({ control: 'Y', dev: Math.floor(Math.random()*151), devOut: Math.floor(Math.random()*601), state: Math.floor(Math.random()*3) });
            feature.push({ control: 'Z', dev: Math.floor(Math.random()*61), devOut: Math.floor(Math.random()*201), state: Math.floor(Math.random()*3) });
            feature.push({ control: 'Diameter', dev: Math.floor(Math.random()*31), devOut: Math.floor(Math.random()*81), state: Math.floor(Math.random()*3) });
        }

        data.push({
            name: featureNames[index],
            state: Math.floor(Math.random()*3),
            data: feature
        });
    }

    return data;
}

export default dataGenerator;