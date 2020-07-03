<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        table
        {
            border-collapse: collapse;
            width: 1000px;
            background-image: url();
        }
        td,th{
            border:1px solid #000000;
        }
    </style>
</head>
<body>
<?php
    header("content-type:text/html;charset=utf-8");
    open_sql();
    function open_sql()
    {
        $sql = mysqli_connect("localhost", "root", "root", "game", "3306");
        if (mysqli_connect_errno()) return;
        $res = mysqli_query($sql, "SELECT * FROM `user` WHERE `user`='$_POST[user]'");
        if ($res->num_rows > 0) {
            //  从结果中取出第一条数据，变为数组，这个数组中含有索引数据和关联数据两条
            //  $arr=mysqli_fetch_array($res);
            // 从结果中取出第一条数据，变为数组，这个数组关联数组
            $arr = mysqli_fetch_assoc($res);
            if ($arr["password"] === $_POST["password"]) {
                show_list($sql);
            } else {
                echo "密码错误";
            }
        } else {
            echo "没有找到该用户名";
        }
    }

    function show_list($sql)
    {
        $res = mysqli_query($sql, "SELECT * FROM `user` WHERE 1");
        echo "<table>";
        for ($i = 0; $i < $res->num_rows; $i++) {
            $arr = mysqli_fetch_assoc($res);
            if($i===0){
                echo "<tr>";
                foreach($arr as $key=>$value){
                    echo "<th>";
                    echo $key;
                    echo "</th>";
                }
                echo "<th>删除</th>";
                echo "</tr>";
            }
            echo "<tr>";
            foreach ($arr as $key => $value) {
                echo "<td>";
                echo $value;
                echo "</td>";
            }
            echo "<td><form action='http://localhost:4010/delete.php' method='GET'><input type='text' name='pid' value={$arr['pid']} style='display:none'><button type='submit'>删除</button></form></td>";
            echo "</tr>";
        }
        echo "</table>";
    }
    ?>
</body>
</html>