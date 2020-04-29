$(document).ready(function(){
        $.ajax({
            type:'GET',
            url: 'https://itunes.apple.com/search?term=pop&limit=2',
            success:function(data){
            data = JSON.parse(data);
            $("#1p").attr("href",data["results"][1].previewUrl)
            $("#p1").text(data["results"][1].trackName)
        }
    });
});
$(document).ready(function(){
        $.ajax({
            type:'GET',
            url: 'https://itunes.apple.com/search?term=jazz&limit=10',
            success:function(data){
            data = JSON.parse(data);
            $("#2p").attr("href",data["results"][8].previewUrl)
            $("#p2").text(data["results"][8].trackName)
        }
    });
});
$(document).ready(function(){
        $.ajax({
            type:'GET',
            url: 'https://itunes.apple.com/search?term=country&limit=1',
            success:function(data){
            data = JSON.parse(data);
            $("#3p").attr("href",data["results"][0].previewUrl)
            $("#p3").text(data["results"][0].trackName)
        }
    });
});
$(document).ready(function(){
        $.ajax({
            type:'GET',
            url: 'https://itunes.apple.com/search?term=classical&limit=5',
            success:function(data){
            data = JSON.parse(data);
            $("#4p").attr("href",data["results"][0].previewUrl)
            $("#p4").text(data["results"][0].trackName)
        }
    });
});
$(document).ready(function(){
        $.ajax({
            type:'GET',
            url: 'https://itunes.apple.com/search?term=blues&limit=2',
            success:function(data){
            data = JSON.parse(data);
            $("#5p").attr("href",data["results"][1].previewUrl)
            $("#p5").text(data["results"][1].trackName)
        }
    });
});
$(document).ready(function(){
        $.ajax({
            type:'GET',
            url: 'https://itunes.apple.com/search?term=rock&limit=3',
            success:function(data){
            data = JSON.parse(data);
            $("#6p").attr("href",data["results"][2].previewUrl)
            $("#p6").text(data["results"][2].trackName)
        }
    });
});

