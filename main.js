var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);

    for(var i = 0; i < data.players.length; i++){
        //create options based on json data
        var select = document.getElementsByClassName('playerSelect')[0];
        var playerName = document.createElement('option');

        playerName.innerHTML = data.players[i].player.name.first + ' ' + data.players[i].player.name.last
        playerName.setAttribute('value', data.players[i].player.id)
        select.appendChild(playerName);

    }

    //listen to user selecting an option and display data accordingly
    select.addEventListener('change', function(e){
        for(var i = 0; i < data.players.length; i++){
            if(e.target.value == data.players[i].player.id){

                //player image
                var playerImg = document.getElementsByClassName('playerImg')[0];
                playerImg.setAttribute('src', 'assets/p'+data.players[i].player.id +'.png>');
                playerImg.setAttribute('id', 'p'+data.players[i].player.id);
                playerImg.setAttribute('alt', data.players[i].player.name.first + 'image');
                playerImg.setAttribute('src', 'assets/p'+ data.players[i].player.id+'.png' );

                //club image
                var playerClub = document.getElementsByClassName('playerClub')[0];
                playerClub.setAttribute('src', 'assets/club'+data.players[i].player.currentTeam.id +'.png');
                playerClub.setAttribute('alt', data.players[i].player.name.first + ' image');
               
                //player stats

                var playerStatsCont = document.getElementsByClassName('playerStatsCont')[0];
                var name = playerStatsCont.getElementsByTagName('h2')[0];
                name.innerHTML = data.players[i].player.name.first + ' ' + data.players[i].player.name.last;
                var post = playerStatsCont.getElementsByTagName('h3')[0];
                post.innerHTML = data.players[i].player.info.positionInfo;


                //stats
                
                //clear default stats
                var stats = document.getElementsByClassName('stats');
                for(var j = 0; j < stats.length; j++){
                  stats[j].parentElement.innerHTML = '';
                }
                //add stats from json
                for(var j = 0; j < data.players[i].stats.length; j++){
                  var playerStats = document.getElementsByClassName('playerStats')[0];
                  var divCont = document.createElement('div');
                  divCont.classList.add('stats');

                  var heading = document.createElement('h3');
                  heading.innerHTML = data.players[i].stats[j].name;
                  divCont.appendChild(heading);

                  var playerData = document.createElement('h4');
                  playerData.innerHTML = data.players[i].stats[j].value;
                  divCont.appendChild(playerData);
                  playerStats.appendChild(divCont);
                }
            }
        }
        
    });

  }
};
xmlhttp.open("GET", "./data/player-stats.json", true);
xmlhttp.send();