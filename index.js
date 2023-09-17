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
                this._userPos.y++;
                break;
            }

            case 'd': {
                this._userPos.x++;
                break
            }

            case 's': {
                this._userPos.y--;
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

    checkUser(){
        // Function returns true if user is still alive, returns false otherwise
        const {x, y} = this._userPos;

        if (this._map[y][x] == hole) 
            return false

        if (x > this._width - 1 || x < 0)
            return false

        if (y > this._height - 1 || y < 0)
            return false

        return true;
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

myField.print();