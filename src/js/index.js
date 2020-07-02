

init();
function init(){
    var  listId=document.querySelector(".listId");
    var divList=document.querySelector(".divList li");
    listId.addEventListener("mouseenter",mouseHandler);
}
function mouseHandler(){
    console.log(this)
    listId.style.position="absolute";
    listId.style.marginTop="90px";
    listId.style.display="block";
  
}
