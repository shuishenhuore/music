/*



*/





$(function(){

    //获取媒体元素
    var mp3 = $('#content .audio');
    //获取上一首
    var previos = $('.tool .previous');
    //获取下一首
    var next = $('.tool .next');
    //获取播放按钮
    var play_tool = $('.tool .play');
    //获取li标签
    var li = $('#content li')
    //获取歌名
    var title = $('#tool .pic_title .title')
    //获取到播放时的头像
    var head = $('#tool .pic_title .head')

    //是否播放
    var play = false;
    //是否隐藏
    var hide = true;
    //获取收起按钮
    var hide_tool = $('#hide');
    //获取播放按钮
    var play_tool = $('.paly_pause');

    var index = 0;

    //是否隐藏
    hide_fun()
    //是否播放
    play_fun()
    //上一首
    previous_fun()
    //下一首
    //next_fun()


    //获取索引
    li.click(function(){
        console.log($(this).index());
        index = $(this).index()
        $('.pause').attr({'src':'./pic/pause.png','title':'暂停'})
        show();
    });

    function show(){
        //播放音乐
        play_mp3();
        //更换播放音乐的字体
        change_title()
        //改变播放时的图像
        change_head()
        

    };
    
    function play_mp3(){
        var txt = './datasrc/' + $(li.eq(index)).text() + '.flac';
        mp3.attr('src',txt);
        mp3[0].play();
    };
    function change_title(){
        //获取播放音乐文本
        var txt = $(li.eq(index)).text()
        //改变播放时的字体
        title.text(txt);
    }

    function change_head(){
        //获取到播放头像信息
        var txt = $(li.eq(index)).text()
        var src = './head/' + txt + '.png'
        head.attr('src',src)
    }

    function hide_fun(){
        hide_tool.click(function(){
            //如果是被隐藏了那么点击后箭头应该向右边
            if(hide){
                $('.arrows').attr({'src':'./pic/右箭头.png','title':'展开'})
                $('#tool').animate({'left':'-480px'},800)
                hide=false;
            }else{
                $('.arrows').attr({'src':'./pic/左箭头.png','title':'收起'})
                $('#tool').animate({'left':'0px'},800)
                hide=true;
            }
        })
    }

    function play_fun(){
        play_tool.click(function(){
            if(play){
                //如果是正在播放点击就要变成暂停
                $('.pause').attr({'src':'./pic/play.png','title':'播放'})
                mp3[0].pause();
                play=false;
            }else{
                $('.pause').attr({'src':'./pic/pause.png','title':'暂停'})
                mp3[0].play();
                play=true;
            }
        })
    }

});

