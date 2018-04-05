const fs=require('fs')

fs.readFile('test.txt','utf-8',function(err,data){
  //읽어들이기를 완료했을때의 처리
  console.log(data)
})
