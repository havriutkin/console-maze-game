const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field{
    constructor(fieldMap){
        this._map = fieldMap;
        this._width = fieldMap[0].length;
        this._height = fieldMap.length;
        this._userPos = {x: 0, y: 0};
    }

    print(){
        // Function prints map to console
        this._map.forEach(row => {
            console.log(row.join(' '));
        });
    }

    moveUser(direction){
        // Function takes direction and changes user's position
        switch (direction) {
            case 'w': {
                this._userPos.y--;
                break;
            }

            case 'd': {
                this._userPos.x++;
                break
            }

            case 's': {
                this._userPos.y++;
                break;
            }

            case 'a': {
                this._userPos.x--;
                break;
            }
        
            default: {
                throw new Error('Uknown direction');
            }
        }
    }

    checkState(){
        // Function returns current game state based on user position
        const {x, y} = this._userPos;

        if (x > this._width - 1 || x < 0)
            return 'lose'

        if (y > this._height - 1 || y < 0)
            return 'lose'

        if (this._map[y][x] == hole) 
            return 'lose'

        if (this._map[y][x] == hat)
            return 'win';

        return 'run';
    }

    updateMap(){
        this._map[this._userPos.y][this._userPos.x] = pathCharacter;
    }

    static generateMap(width, height, percentage){
        // Function generate random map with given percantage of holes. 
        // TODO 
    }
}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

let state = 'run';  // Possible states: run, win, lose
while (state === 'run'){
    myField.updateMap();
    myField.print();

    let userInput = prompt('Which way? ');

    myField.moveUser(userInput.toLowerCase());
    state = myField.checkState();

    if (state == 'win')
        console.log('You foung your hat!');

    if (state == 'lose')
        console.log('You lost');
}