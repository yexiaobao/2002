  // var listId,divLists;
        // var style;
        // init();
        // function init(){
            var listId=document.querySelector(".listId")
            var  divLists=document.querySelector(".divList");
            var  li=document.querySelectorAll(".divList li")
            listId.addEventListener("mouseenter",mouseHandler);
            divLists.addEventListener("mouseleave",mouseoutHandler);

            function  mouseHandler(){
                // for(var i=0;listId.length;i++){
                //     divLists.style.display="block"
                // }
                divLists.style.display="block"
            }
            function mouseoutHandler(){
                divLists.style.display="none"
            }
