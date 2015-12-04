var fs = require('fs');

function GameOfLife(){
    var self = this;
    var time = parseInt(process.argv[2]) || 150;
    var ger  = parseInt(process.argv[3]);
    var file = process.argv[4] || 'game.txt';
    var grid = [];

    fs.readFile(file, 'utf8', function (err,data) {
        data = data.split('\r\n');
        var lengthArr = data[0].split(',');
        for(var i = 0; i < parseInt(lengthArr[0]); i++){
            var arr = new Int8Array(parseInt(lengthArr[1]));
            grid.push(arr);
        }
        for (var j = 1; j < data.length; j++) {
            if(data[j] !== ''){
                var elem = data[j].split(',');
                var x = parseInt(elem[0]);
                var y = parseInt(elem[1]);
                grid[x][y] = 1;
            }
        }
        self.start();
    });

    self.getVizinhos = function(h, w){
        var count = 0;
        for(var i = -1; i <= 1; i++)
            for(var j = -1; j <= 1; j++)
                if((i+h) > -1 && (j+w) > -1 && !((i) === 0 && (j) === 0) && grid[(i+h)] && grid[(i+h)][(j+w)])
                    count += grid[(i+h)][(j+w)];
        return count;
    };

    self.print = function(){
        process.stdout.write('\033c');
        var data = "";
        for(var i = 0; i < grid.length; i++){
            for(var j = 0; j < grid[i].length; j++){
                data += grid[i][j] == 1 ? "0" : "-";
            }
            data += "\n";
        }
        console.log(data);
    };

    self.game = function(){
        var _grid = [];

        for(var h = 0; h < grid.length; h++){
            var _tmp = [];
            for(var w = 0; w < grid[h].length; w++){
                var count  = self.getVizinhos(h, w);
                var celula = grid[h][w];
                if(count < 2)
                    _tmp.push(0);
                else if((count == 2 || count == 3) && celula == 1)
                    _tmp.push(1);
                else if(count == 3  && celula === 0)
                    _tmp.push(1);
                else if(count > 3)
                    _tmp.push(0);
                else
                    _tmp.push(0);
            }
            _grid.push(_tmp);
        }
        grid = _grid;
    };

    self.start = function(){
        var stime = setInterval(function(){
            self.print();
            self.game();
            if(ger > 0)
               ger--;
            else
                clearInterval(stime);
        },time);
        self.print();
    };
}
var game = GameOfLife();
