(function() {

    // 构造函数
    function LayerTag(left,right) {
        if(left&&document.getElementById(left)!=null){
            this.left=left;
        }
        else{
            return;
        }
        if(right&&document.getElementById(right)!=null){
            this.right=right;
        }
        else{
            return;
        }
        this.init();
    }


    // 原型
    LayerTag.prototype = {
        constructor: LayerTag,

        init: function() {
            let inputs=document.getElementById(this.left).getElementsByTagName("input");
            let tags=document.getElementById(this.right).getElementsByTagName("div");
            for(let i=0;i<inputs.length;i++){
                let passClick=this.handleLeftClick(i,tags);
                inputs[i].addEventListener("click",passClick,false);
            }
            for(let i=0;i<tags.length;i++){
                let passClick=this.handleRightClick(i,tags);
                tags[i].addEventListener("click",passClick,false);
            }

        },
        handleLeftClick:function(index,tags){
            return function(){
                if(this.checked){
                    for(let i=0;i<tags.length;i++){
                        tags[i].style.backgroundColor="skyblue";
                    }
                    tags[index].style.display="block";
                    tags[index].style.backgroundColor="dodgerblue";
                }
                else{
                    tags[index].style.display="none";
                }
            }
        },
        handleRightClick:function(index,tags){
            return function(){
                for(let i=0;i<tags.length;i++){
                    tags[i].style.backgroundColor="skyblue";
                }
                tags[index].style.backgroundColor="dodgerblue";
            }
        }
    };

    // 一种对外暴露的方式
    window.LayerTag = LayerTag;
})();

// 通过扩展方法将图层管理扩展为jQuery的一个工具方法
(function ($) {
    $.extend({
        becomeLayerTag: function (left,right) {
            new LayerTag(left,right);
            return this;
        }
    })
})(jQuery);
$.becomeLayerTag("left","right");