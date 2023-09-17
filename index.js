const prompt = require('prompt-sync')({sigint: true});
const {Field} = require('./Field.js');

// Game variables
let state = 'run';  // Possible states: run, win, lose
const myField = new Field(Field.generateMap(10, 10, 30));

// Game loop
while (state === 'run'){
    console.clear();
    myField.updateMap();
    myField.print();

    let userInput = prompt('Which way? ');

    try {  
        myField.moveUser(userInput.toLowerCase());
        state = myField.checkState();

        if (state == 'win')
            console.log('You foung your hat!');

        if (state == 'lose')
            console.log('You lost');
    } catch (error) {
        console.log(error);
    }
}
