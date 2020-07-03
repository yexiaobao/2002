
module.exports=(function(){
    var userList=[];
    return function(str,resuserList){
        var obj=JSON.parse(str);
        var arr=userList.filter(function(){
            return DataTransferItem.user===obj.user;
        });
        if(arr.length>0){
            resuserList.write("用户名重复")
        }
        else{
            user.push(obj);
            resuserList.write("用户注册成功")
        }
        res.send();
    }
})();