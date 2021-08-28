// Get Todo

var fs = require('fs'); // 파일 시스템 모듈

exports.list = function(req, res){  // Todo 목록 가져오기
    fs.exists('./TodoList.json', function (exists){ // Todo 목록 존재 확인
        if(exists){
            fs.readFile('./TodoList.json', {
                'encoding' : 'utf8'
            }, function (err, list) {   // TodoList.json 파일 읽기
                res.json(list);
            });
        } else{
            var list = {    // 기본 ToDO 목록 형식
                'list' : []
            };

            fs.writeFile('./TodoList.json', JSON.stringify(list), function (err){   // TOdoList.json 파일 쓰기
                res.json(list);
            });
        }
    });
};

exports.add = function(req, res){   //새로운 ToDO 항목 추가
    var todo = {    // 기존 ToDo 항목 형식
        'contents' : '',
        'complete' : false
    };

    todo.contents = req.body.contents;

    fs.readFile('./TodoList.json', {
        'encoding' : 'utf8'
    }, function (err, data) {
        data = JSON.parse(data);

        data.list.push(todo);   //새로운 Todo 항목 추가

        fs.writeFile('./TodoList.json', JSON.stringify(data), function (err){
            res.json(true);
        });
    });
};

exports.complete = function(req, res){	// 선택한 ToDo 항목 완료하기
	fs.readFile('./TodoList.json', {
		'encoding': 'utf8'
	}, function (err, data) {
		data = JSON.parse(data);
		
		data.list[req.body.index].complete = true;
		
		fs.writeFile('./TodoList.json', JSON.stringify(data), function (err) {
			res.json(true);
		});
	});
};

exports.del = function(req, res){	// 선택한 ToDo 항목 삭제하기
	fs.readFile('./TodoList.json', {
		'encoding': 'utf8'
	}, function (err, data) {
		data = JSON.parse(data);
		
		data.list[req.body.index] = null;	// 선택한 ToDo 항목 삭제
		data.list = data.list.filter(Boolean);	// 유효한 값 추려내기
		
		fs.writeFile('./TodoList.json', JSON.stringify(data), function (err) {
			res.json(true);
		});
	});
};