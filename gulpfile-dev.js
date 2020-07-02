const {task,src,dest,watch,series,parallel}=require("gulp");
const load=require("gulp-load-plugins")();
const  del=require("del");

//删除dist目录的内容

task("del",async ()=>{
    await del("./dist");
})

//处理html
task("html",async ()=>{
    src("./src/html/*.html")
    .pipe(dest("./dist/html"))
    // .pipe(load.concat.reload())//刷新
})

//处理img 
task("imgs",async ()=>{
    src("./img/*.*")
    .pipe(dest("./dist/img"))
})