const {task,src,dest,watch,series,parallel}=require("gulp");
const load=require("gulp-load-plugins")();
const  del=require("del");

task("html",async ()=>{
    src("./src/html/*.html")
    .pipe(dest("./dist/html"));
    // .pipe(load.concat.reload())//刷新
})