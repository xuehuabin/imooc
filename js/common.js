window.onload = function () {
    /* search */
    let searchInput = document.querySelector('.search_input');
    let searchPull = document.querySelector('.search_pull');
    searchInput.onfocus = function () {
        searchPull.style.display = 'none';
    }
    searchInput.onblur = function () {
        if (this.value == '') {
            searchPull.style.display = 'block';
        }
    }
    /* banner_aside */
    let bannerAside = document.querySelector('.banner_aside');
    let bannerNavLi = document.querySelector('.banner_aside_nav').getElementsByTagName('li');
    let bannerAsideItem = document.querySelectorAll('.banner_aside_item');
    for(let i = 0;i < bannerNavLi.length;i++){
        bannerNavLi[i].onmouseenter = function(){
            tab(bannerNavLi,bannerAsideItem,i);
        }
    }
    bannerAside.onmouseleave = function(){
        for(let i = 0;i < bannerNavLi.length;i++){
            bannerAsideItem[i].style.display = 'none';
            bannerNavLi[i].classList.remove('active');        }
    }
    /*  banner_container */
    let slide = document.querySelectorAll('.slide'),
        slidePagnation = document.querySelector('.banner_pagnation'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next');
        bg = document.querySelector('.bg');
    //默认显示第一张图片
    slide[0].classList.add('active');
    let imgSrc =  slide[0].getElementsByTagName('img')[0].src;
    bg.style.backgroundImage = 'url('+imgSrc+')';
    //初始化分页器        
    for (let i = 0; i < slide.length; i++) {
        slidePagnation.innerHTML += "<span></span>"
    }
    let slidePagnationDot = slidePagnation.querySelectorAll('span');
    slidePagnationDot[0].classList.add('active');
    //初始化索引值
    let activeIndex = 0;
    // 自动向下轮播
    let slidePlay = setInterval(slidePlayNext, 3500)
    //分页器控制
    for (let i = 0; i < slidePagnationDot.length; i++) {
        slidePagnationDot[i].onclick = function () {
            activeIndex = i;
            handleSlidePlay(activeIndex)
        }
    }
    //上一页
    prev.onclick = function () {
        slidePlayPrev();
    }
    //下一页
    next.onclick = function () {
        slidePlayNext();
    }
    //向上切换方法
    function slidePlayPrev() {
        activeIndex = activeIndex <= 0 ? slide.length - 1 : activeIndex - 1;
        handleSlidePlay(activeIndex)
    }
    //向下切换方法
    function slidePlayNext() {
        activeIndex = activeIndex >= slide.length - 1 ? 0 : activeIndex + 1;
        handleSlidePlay(activeIndex)
    }
    //鼠标悬停暂停自动轮播，离开继续自动轮播
    handleHover(document.querySelector('.banner_container'))
    function handleHover(element) {
        element.onmouseenter = function () {
            clearInterval(slidePlay)
            slidePlay = undefined;
        }
        element.onmouseleave = function () {
            slidePlay = setInterval(slidePlayNext, 3500)
        }
    }
    //处理切换逻辑
    function handleSlidePlay(index) {
        let imgSrc =  slide[index].getElementsByTagName('img')[0].src;
        bg.style.backgroundImage = 'url('+imgSrc+')';
        slide[index].classList.add('active');
        slidePagnationDot[index].classList.add('active');
        for (let i = 0; i < getSiblings(slide[index]).length; i++) {
            getSiblings(slide[index])[i].classList.remove('active')
            getSiblings(slidePagnationDot[index])[i].classList.remove('active')
        }
    }
    /* 倒计时 */
    let timeElms = document.querySelector('.imooc_card').querySelectorAll('.time');
    setInterval(setTime,1000);
    function setTime(){
        for(let  i = 0; i < timeElms.length;i++){
            if(timeElms[i].getAttribute('data-time')){
                let dataTime=timeElms[i].getAttribute('data-time');
                let endTime = new Date(dataTime).getTime();
                let nowTime = new Date().getTime();
                let chaTime = endTime - nowTime;
                if(chaTime <= 0){
                    timeElms[i].parentNode.style.display = 'none';
                    timeElms[i].parentNode.parentNode.classList.remove('red');
                }else{
                    setTimeElms(chaTime,timeElms[i]);
                }
           }else{
               timeElms[i].parentNode.style.display = 'none';
               timeElms[i].parentNode.parentNode.classList.remove('red');
           }  
       }
    }
    function setTimeElms(time,elm){    //渲染页面
        let hour = addZero(Math.floor(time/1000/60/60));
        let minute = addZero(Math.floor((time -hour*1000*60*60)/1000/60));
        let second= addZero(Math.floor((time -hour*1000*60*60-minute*1000*60)/1000));
        let day = Math.floor(hour/24);
        let newHour = addZero(hour%24);
        if(day >= 1){
            elm.innerText = day +' 天 '+newHour +' : '+minute+' : '+second;
            if(day>5){
                elm.style.display = 'none';
            }
        }else{
            elm.innerText = newHour +' : '+minute+' : '+second;
        }
    }
    function addZero(n){
        return n = n < 10 ? '0' + n : n;
    }    
    /* learn_route  */
    let learnRouteLi = document.querySelector('.learn_route').querySelector('.imooc_nav').getElementsByTagName('li');
    let learnRouteItem = document.querySelector('.learn_route').querySelectorAll('.learn_route_item');
    for(let i = 0;i < learnRouteLi.length;i++){
        learnRouteLi[i].onclick = function(){
            tab(learnRouteLi,learnRouteItem,i);
        }
    }
    /* hot_class */
    let hotClassLi = document.querySelector('.hot_class').querySelector('.imooc_nav').getElementsByTagName('li');
    let hotClassItem = document.querySelector('.hot_class').querySelector('.imooc_card').getElementsByTagName('ul');
    let hotClassAd = document.querySelector('.hot_class').querySelector('.ad');
    for(let i = 0;i < hotClassLi.length;i++){
        hotClassLi[i].onclick = function(){
            tab(hotClassLi,hotClassItem,i);
            if(this.index == 1){
                hotClassAd.style.display = 'block';
            }else{
                hotClassAd.style.display = 'none';
            }
        }
    }
    /* float--回到顶部 */
    let bool = true;
    let backTop =document.querySelector('.backTop');
    document.onscroll = function(){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        if(scrollTop >= clientHeight){
            if(bool){
                backTop.style.display = 'block';
                bool = false;
            }
        }else{
            backTop.style.display = 'none';
            bool = true;
        }
    }
    backTop.onclick = function(e){
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        toTop = setInterval('handleToTop('+scrollTop+',300)', time); 
    }
}
    /* 回到顶部效果 */
    let toTop,time=30; 
    function handleToTop(scrollTop,totalTime) {
        let scrollTopNow = document.body.scrollTop || document.documentElement.scrollTop;
        let speed = scrollTop/(totalTime/time);
        if (document.body.scrollTop!=0) {
            document.body.scrollTop -= speed;
        }else {
            document.documentElement.scrollTop -= speed;
        }
        if (scrollTopNow == 0) {
            clearInterval(toTop);
        }
    }
    /* 获取兄弟节点 */
    function getSiblings(element) {
        let siblings = new Array();
        let nodes = element.parentNode.children;
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeType == 1 && nodes[i] != element) {
                siblings.push(nodes[i]);
            }
        }
        return siblings;
    }
    /* tab切换 */
    function tab(navElm,itemElm,index){
        navElm[index].classList.add('active');
        itemElm[index].style.display = 'block';
        let itemSiblings = getSiblings(itemElm[index]);
        let navSiblings = getSiblings(navElm[index]);
        for(let  i = 0; i < itemSiblings.length; i++){
            itemSiblings[i].style.display = 'none';
            navSiblings[i].classList.remove('active');
        }
    }
