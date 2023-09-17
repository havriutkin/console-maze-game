const terminal = require( 'terminal-kit' ).terminal;
const {generateRandomPair, generateUniquePairs, validateMaze} = require('./utils.js');

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
        for (let y = 0; y < this._height; y++) {
            for (let x = 0; x < this._width; x++){
                if (x === this._userPos.x && y === this._userPos.y)
                    terminal.green(this._map[y][x]);
                else if (this._map[y][x] === hat)
                    terminal.yellow(hat);
                else if (this._map[y][x] === pathCharacter)
                    terminal.gray(pathCharacter);
                else if (this._map[y][x] === fieldCharacter)
                    terminal(fieldCharacter);
                else
                    terminal.red(hole);
            }
            terminal('\n');
        }
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
        // Function generates random map with given percantage of holes. 
        const map = Array.from({ length: height }, () => Array(width).fill(fieldCharacter));    // At firts fill field with fieldCharacters

        // Locate user and hat
        map[0][0] = pathCharacter;  
        const [hatX, hatY] = generateRandomPair(0, width - 1, 0, height - 1);
        map[hatY][hatX] = hat;

        // Genrate holes
        const amountOfHoles = width * height * percentage / 100;
        const restrictionSet = new Set(['0, 0', `${hatX}, ${hatY}`]);
        const holesPositions = generateUniquePairs(amountOfHoles, restrictionSet, 0, width - 1, 0, height - 1);

        // Put holes on a map
        holesPositions.forEach(position => {
            const [x, y] = position
            map[y][x] = hole;
        });

        return map;
    }
}

exports.Field = Field;