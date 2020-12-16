$(function () {

    // 第一步点击发送把发送的内容渲染到页面中去
    $('#btnSend').on('click', function () {
        // 获取input输入的值
        var val = $('#ipt').val();

        // 创建li
        $('<li class="right_word"></li>').html(`
            <img src="img/person02.png" /> 
            <span>${val}</span>
        `).appendTo('#talk_list');

        $('#ipt').val('');
        resetui();

        // 根据输入的消息从后台获取，对应的语句
        $.ajax({
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: { spoken: val },
            success: function (res) {
                // console.log(res);
                if (res.data.type == 5000) {
                    // 创建li
                    $('<li class="left_word"></li>').html(`
                        <img src="img/person01.png" /> 
                        <span>${res.data.info.text}</span>
                    `).appendTo('#talk_list');

                    resetui();
                    // 调用转语音函数
                    TextVoice(res.data.info.text);

                    console.log('回复成功！');
                }
            }
        });

        // 根据输入的文本获取语音
        function TextVoice(txt){
            $.get('http://www.liulongbin.top:3006/api/synthesize', {text: txt} ,function (res) {
                // console.log(res);
                if (res.status == 200) {
                    $('audio').prop('src', res.voiceUrl);
                }
            });
        }
    });

    // 键盘 ent 发送
    $('#ipt').on('keyup',function (e) {
        console.log(e.keyCode);
        if (e.keyCode == 13) {
            $('#btnSend').trigger('click');
        }
    })
});