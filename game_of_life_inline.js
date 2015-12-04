var fs = require('fs');

function GameOfLife() {
    var self = this,
        file = process.argv[0] || 'game.txt',
        length,
        x = 0,
        y = 0,
        ger  = parseInt(process.argv[2]),
        grid;

    fs.readFile('game.txt', 'utf8', function (err,data) {
        data = data.trim();
        data = data.split('\r\n');
        length = data[0].split(',');
        y = parseInt(length[0]);
        x = parseInt(length[1]);
        length = x * y;
        grid = new Int8Array(length);

        for (var j = 1; j < data.length; j++) {
            var elem = data[j].split(',');
            var h = parseInt(elem[0]) * x;
            var w = parseInt(elem[1]);
            var p = 0;

            if(h === 0)
                p = w;
            else
                p = w + h;

            grid[p] = 1;
        }
        self.start();
    });

    self.vizinhos = function(el){
        var l1 = grid[el-1] || 0;
        var l2 = grid[el+1] || 0;

        var l3 = grid[el-x] || 0;
        var l4 = grid[el+x] || 0;

        var l5 = grid[((el-x) +1)] || 0;
        var l6 = grid[((el+x) +1)] || 0;

        var l7 = grid[((el-x) -1)] || 0;
        var l8 = grid[((el+x) -1)] || 0;

        return (l1 + l2 + l3 + l4 + l5 + l6 + l7 + l8);
    };

    self.work = function(){
        // console.log(length);
        var _tmp = new Int8Array(length);
        for (var i = 0; i < grid.length; i++) {
            var count  = self.vizinhos(i);
            var celula = grid[i];

            if((count == 2 || count == 3) && celula == 1)
                _tmp[i] = 1;
            else if(count == 3  && celula === 0)
                _tmp[i] = 1;
        }
        // console.log(_tmp);
        grid = _tmp;
    };

    self.print = function(){
        var data = "";
        var count = 0;
        for (var h = 0; h < length; h++) {
            count++;
            data += " "+grid[h];
            if(count == x){
                count = 0;
                data += "\n";
            }
        }
        console.log(data);
    };

    self.soma = function(){
        var count = 0;
        for (var i = 0; i < grid.length; i++) {
            count += grid[i];
        }
        console.log(count);
    };

    self.start = function () {
        while(true){
            if(ger > 0)
               ger--;
            else
                break;

            self.work();
        }
        self.print();
    };
}

GameOfLife();
