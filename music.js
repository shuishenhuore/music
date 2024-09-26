$(function(){
    var musicList = []
    var currentIndex = 0;
    var hide = false;
    $.getJSON('./music.json',function(data){
        musicList = data
        MusicList(data);
        render(musicList[currentIndex])
    })
    //渲染信息
    function render(info){
        //头像
        $('.head').attr('src',info.head);
        //音乐信息
        $('.title').text(info.name+'_'+info.singer);
        //音乐时长
        $('.duration').text(info.time)
        //音乐信息地址
        $('audio').attr('src',info.audio_url)
    }
    //点击播放
    $('.pause').click(function(){
        //音乐暂停
        if($('audio')[0].paused){
            $('audio')[0].play();
            $('.pause').attr({'src':'./pic/pause.png','title':'暂停'})
            $('.head').css('animation-play-state','running')
        }else{
            $('audio')[0].pause();
            $('.pause').attr({'src':'./pic/play.png','title':'播放'})
            $('.head').css('animation-play-state','paused')
        }
    })
    //上一首
    $('.previous').click(function(){
        if(currentIndex>0){
            currentIndex--;
        }else{
            currentIndex = musicList.length-1
        }
        render(musicList[currentIndex])
        $('audio')[0].play();
        $('.pause').attr({'src':'./pic/pause.png','title':'暂停'})
        $('.head').css('animation-play-state','running')
    });
    //下一首
    $('.next').click(function(){
        if(currentIndex<musicList.length-1){
            currentIndex++;
        }else{
            currentIndex = 0;
        }
        render(musicList[currentIndex])
        $('audio')[0].play();
        $('.pause').attr({'src':'./pic/pause.png','title':'暂停'})
        $('.head').css('animation-play-state','running')
    })
    //进度条
    $('audio').on('timeupdate',function(){
        var duration = $('audio')[0].duration;
        var current = $('audio')[0].currentTime;
        var progress = (current/duration)*100;
        $('.progressLine').css('width',progress+'%')
        //时间更新
        $('.time').text(format(parseInt(current)));
        //播放结束
        if(duration == current){
            $('.next').trigger('click')
        }
    })
    //快进进度条
    $('.progressContainer').click(function(e){
        var width = this.offsetWidth;
        var line = e.offsetX - this.offsetLeft;
        var duration = $('audio')[0].duration
        $('audio')[0].currentTime = (line/width)*duration;
    })
    //时间格式化
    function format(time){
        var minute = parseInt(time/60);
        var minute_f = minute>9?minute:'0'+minute;
        var sec = parseInt(time%60);
        var sec_f = sec>9?sec:'0'+sec;
        var format_time = minute_f+':'+sec_f;
        return format_time
    }
    //创建音乐列表
    function MusicList(list){
        $.each(list,function(index,item){
            var li = $(`<li>${item.name}_${item.singer}</li>`);
            $('#content ul').append(li)
        })
    }
    //音乐列表事件委托
    $('#content ul').on('click','li',function(){
        currentIndex = $(this).index()-1;
        render(musicList[currentIndex])
        $('audio')[0].play();
        $('.pause').attr({'src':'./pic/pause.png','title':'暂停'})
        $('.head').css('animation-play-state','running')
    })
    //隐藏工具栏
    $('#hide').click(function(){
        if(hide){
            //隐藏
            $('.arrows').attr({'src':'./pic/左箭头.png','title':'收起'})
            $('#tool').css({'animation':'right 0.8s linear','animation-fill-mode': 'forwards'})
            hide=false;
        }else{
            //没隐藏
            $('.arrows').attr({'src':'./pic/右箭头.png','title':'展开'})
            $('#tool').css({'animation':'left 0.8s linear','animation-fill-mode': 'forwards'})
            hide=true;
        }
    })
});