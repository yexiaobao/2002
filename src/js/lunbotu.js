        
var imgCon,ul,preDot;
var pos=0,
    x=0,
    bool=false,
    autoBool=false,
    dotList=[],
    imgList=[],
    bnList=[],
    time=300,
    imgSrcList=["../img/focus01a.jpg","../img/focus02a.jpg","../img/focus03.jpg","../img/focus04.jpg","../img/focus05.jpg","../img/focus06.jpg"]
    direction="";
const WIDTH=1200;
const HEIGHT=535;
const SPEED=40;
const LEFT=Symbol();
const RIGHT=Symbol();

init();

function init(){
    var carousel=ce("div",{
        width:WIDTH+"px",
        height:HEIGHT+"px",
        position:"relative",
        margin:"auto",
        overflow:"hidden"
    });
    createImgCon(carousel);
    createButton(carousel);
    createDotList(carousel)
    document.body.appendChild(carousel);
    changeDot();
    ul.style.left=(WIDTH-ul.offsetWidth)/2+"px";
    setInterval(animation,16);
    carousel.addEventListener("mouseenter",mouseHandler);
    carousel.addEventListener("mouseleave",mouseHandler);
}

function mouseHandler(e){
    if(e.type==="mouseenter"){
        autoBool=false;
        time=300;
    }else if(e.type==="mouseleave"){
        autoBool=true;
    }
}

function createImgCon(parent){
    imgCon=ce("div",{
        position:"absolute",
        width:2*WIDTH+"px",
        height:HEIGHT+"px",
        left:0,
    });
    for(var i=0;i<imgSrcList.length;i++){
        var img=ce("img",{
            width:WIDTH+"px",
            height:HEIGHT+"px"
        });
        img.src=imgSrcList[i];
        imgList.push(img);
    }
    imgCon.appendChild(imgList[0]);
    parent.appendChild(imgCon);
}

function createButton(parent){
    var arr=["left","right"];
    for(var i=0;i<arr.length;i++){
        var img=ce("img",{
            position:"absolute",
            opacity:"0.3",
            top:(HEIGHT-60)/2+"px",
            left:i===0 ? "30px" : "none",
            right:i===1 ? "30px" : "none"
        });
        img.src=`../img/${arr[i]}.png`;
        parent.appendChild(img);
        bnList.push(img);
        img.addEventListener("click",bnClickHandler);
    }
}


function createDotList(parent){
     ul=ce("ul",{
        listStyle:"none",
        margin:0,
        padding:0,
        position:"absolute",
        bottom:"50px"
    });
    for(var i=0;i<imgSrcList.length;i++){
        var dot=ce("li",{
            width:"12px",
            height:"12px",
            borderRadius:"50%",
            border:"1px solid #dddddd",
            float:"left",
            marginLeft:i===0 ? "0px" : "15px"
        });
        dotList.push(dot);
        ul.appendChild(dot);
    }
    parent.appendChild(ul);
    ul.addEventListener("click",dotClickHandler);
}

function bnClickHandler(e){
    if(bool) return;
    if(e.target.src.includes("left.png")){
        pos--;
        if(pos<0) pos=imgSrcList.length-1;
        direction=RIGHT;
    }else{
        pos++;
        if(pos>imgSrcList.length-1) pos=0;
        direction=LEFT;
    }
    createNextImg();
}


function dotClickHandler(e){
    if(bool) return;
    if(e.target.constructor!==HTMLLIElement) return;
    var index=dotList.indexOf(e.target);
    if(index===pos) return;
    direction=index>pos ? LEFT : RIGHT;
    pos=index;
    createNextImg();
}


function createNextImg(){
    if(direction===LEFT){
        imgCon.appendChild(imgList[pos]);
        x=0;
    }else if(direction===RIGHT){
        imgCon.insertBefore(imgList[pos],imgCon.firstElementChild);
        imgCon.style.left=-WIDTH+"px";
        x=-WIDTH;
    }
    bool=true;
    changeDot();
}

function changeDot(){
    if(preDot){
        preDot.style.backgroundColor="rgba(255,0,0,0)";
    }
    preDot=dotList[pos];
    preDot.style.backgroundColor="rgba(255,0,0,0.5)";
}

function ce(type,style){
    var elem=document.createElement(type);
    Object.assign(elem.style,style);
    return elem;
}


function animation(){
    imgConMove();
    autoPlay();
}

function imgConMove(){
    if(!bool) return;
    if(direction===LEFT){
        x-=SPEED;
        if(x<=-WIDTH){
            imgCon.firstElementChild.remove();
            x=0;
            bool=false;
        }
        imgCon.style.left=x+"px";
      
    }else if(direction===RIGHT){
        x+=SPEED;
        if(x>=0){
            bool=false;
            x=0;
            imgCon.lastElementChild.remove();
        }
        imgCon.style.left=x+"px";
    }
}

function autoPlay(){
    if(!autoBool) return;
    time--;
    if(time>0)return;
    time=300;
    var evt=new MouseEvent("click");
    bnList[1].dispatchEvent(evt);
}

