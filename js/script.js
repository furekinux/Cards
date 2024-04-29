function fetchDeck(){
    let url = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    let xhr = new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            let response = JSON.parse(this.responseText)
            console.log(response)
            newButtons = document.getElementById("buttons")
            newButtons.innerHTML=`
                <button onclick="drawCard(${response})">Draw</button>`
            let url = `https://deckofcardsapi.com/api/deck/${response.deck_id}/draw/?count=1`
            console.log(response.deck_id)
            let xhr = new XMLHttpRequest();
            xhr.open("GET",url,true);
            xhr.onreadystatechange = function(){
                if (this.readyState === 4 && this.status === 200){
                    let response = JSON.parse(this.responseText)
                    console.log(response)
                    displayCards(response)
                }else if(this.readyState === 4){
                    console.log("Error :(",this.statusText)
                }
            }
            xhr.send();
        }else if(this.readyState === 4){
            console.log("Error :(",this.statusText)
        }
        }
    xhr.send();
}

function drawCard(response){
    console.log(response)
    let url = `https://deckofcardsapi.com/api/deck/${response.deck_id}/draw/?count=1`
    console.log(response.deck_id)
    let xhr = new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            let response = JSON.parse(this.responseText)
            console.log(response)
            displayCards(response)
        }else if(this.readyState === 4){
            console.log("Error :(",this.statusText)
        }
        }
    xhr.send();
}


function displayCards(data){
    console.log(data.cards)
    arraysito = data.cards
    arraysito.forEach(card => {
        console.log(card)
        let cardImg = document.getElementById("cards")
        if(data.response === "error"){
            cardImg.innerHTML=`<p>Error</p>`
        } else{
            let imgcard = document.createElement("img");
            imgcard.src = card.images.svg

            cardImg.appendChild(imgcard);
        }
    }
    );
}