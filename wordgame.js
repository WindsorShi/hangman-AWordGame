// var present="";
var l = "";
var char = "";
var w = "";
var ssid = ""; //sessionid
var cwc = 0; //correctWordCount
var twn = 0; //totalWordNum
var twgn = 0; //totalWrongGuessCount
var wgn = 0; //wrongGuessCountOfCurrentWord
var tagn = 0; //totalAllowedGuessNum
var score = 0; //成绩
var guessCount = 0; //预留
var id = "";
var dt = "";
//函数开始
//开始游戏
$(function(){
 $('#start').click(function(){
    $.ajax({
        type: 'post',
         contentType:"application/json",  
        url: 'https://strikingly-hangman.herokuapp.com/game/on ',
        data: {
            "playerId": "shiwenshade@163.com",
            "action": "startGame"
        },
        success: function(data) {
            tagn = data.data.numberOfGuessAllowedForEachWord;
            $('#tagn').val(tagn);
            ssid = data.sessionId;
            twn = data.data.numberOfWordsToGuess;
            m = data.message;
            alert('m');
        }
    });
  });

//获取一个未知词
    $('#geranewword').click(function(){
    $.ajax({
        type: 'post',
        contentType:"application/json",  
        url: 'https://strikingly-hangman.herokuapp.com/game/on ',
        data: {
            "sessionId": ssid,
            "action": "nextWord"
        },
        success: function(data) {
            w = data.data.word;
            twn = data.data.totalWordCount;
            wgn = data.data.wrongGuessCountOfCurrentWord;
            $('#word').val(w);
            $('#totalWordCount').val(twn);
            $('#wgn').val(wgn);
        }
    });
  });

//猜词


// function upperCase(x)
// {
// var y=document.getElementById(x).value
// document.getElementById(x).value=y.toUpperCase()
// }


    $("#guessword").keydown(function(){
               var regExp = /[A-Z]$/;
               if(!regExp.test($(this).val())){
                      $(this).val("");
               }
    l = document.getElementById("guessword").value;
    });
    $("#guessword").keyup(function(){
    $.ajax({
        type: 'post',
        contentType:"application/json",  
        url: 'https://strikingly-hangman.herokuapp.com/game/on ',
        data: {
            "sessionId": "3f0421bb5cb56631c170a35da90161d2",
            "action": "guessWord",
            "guess": l
        },
        success: function(data) {
            w = data.data.word;
            twn = data.data.totalWordCount;
            wgn = data.data.wrongGuessCountOfCurrentWord;
            $('#word').val(w);
            $('#totalWordCount').val(twn);
            $('#wgn').val(wgn);
            if (wgn == tagn) {
                if (confirm("You failed to guess this word. \r Please start with a new word.")) {
                    getAWord();
                }
            }
        }
    });
 });


//统计成绩

    $('#result').click(function(){
    $.ajax({
        type: 'post',
        contentType:"application/json",  
        url: 'https://strikingly-hangman.herokuapp.com/game/on ',
        data: {
            "sessionId": "3f0421bb5cb56631c170a35da90161d2",
            "action": "getResult"
        },
        success: function(data) {
            twn = data.data.totalWordCount;
            cwc = data.data.correctWordCount;
            twgn = data.data.totalWrongGuessCount;
            sc = data.data.score;
            $('#correctWordCount').val(cwc);
            $('#totalWordCount').val(twn);
            $('#totalWrongGuessCount').val(twgn);
            $('#score').val(sc);
        }
    });
 });

//提交

    $('#submit').click(function(){
    $.ajax({
            type: 'post',
            contentType:"application/json",  
            url: 'https://strikingly-hangman.herokuapp.com/game/on ',
            data: {
                "sessionId": "3f0421bb5cb56631c170a35da90161d2",
                "action": "submitResult"
            },
            success: function(data) {

                id = data.data.playerId;
                twn = data.data.totalWordCount;
                cwc = data.data.correctWordCount;
                sc = data.data.score;
                twgn = data.data.totalWrongGuessCount;
                dt = data.data.datetime;
                alert(
                    "playerId:"+ id+", \\n "+"totalWordCount:"+ twn+",\\n" + "correctWordCount:" +cwc+", \\n" +"totalWrongGuessCount:"+ twgn+", \\n"+ "score:" +sc+",\\n" + "datetime:" +dt
                    ) 
                }
            });
        });

})
