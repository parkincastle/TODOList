//Get homepage

exports.index = function(req, res){
    res.render('index', { title: 'TODO리스트 테스트' });
  };