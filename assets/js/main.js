"use strict"

$(() => {
    setInterval(() => $("#yoda").animate({ left: "+=5%" }), 1000);
    setInterval(() => $("#yoda").animate({ left: "0px" }), 19000);

    class StarWars {
        characterCards = $("#characterCards");
        yourCharacter = $("#yourCharacter");
        defender = $("#defender");
        attackBtn = $("#attackBtn");
        gameInfo = $("#gameInfo");
        action = 1;
        yourAttack = 0;
        characters = [
            {
                name: "Obi-Wan Kenobi",
                health: 120,
                attack: 8,
                imageUrl: "./assets/img/obi-wan.jpg",
                enemyAttackBack: 15
            },
            {
                name: "Luke Skywalker",
                health: 100,
                attack: 14,
                imageUrl: "./assets/img/luke-skywalker.jpg",
                enemyAttackBack: 5
            },
            {
                name: "Darth Sidious",
                health: 150,
                attack: 8,
                imageUrl: "./assets/img/darth-sidious.png",
                enemyAttackBack: 20
            },
            {
                name: "Darth Maul",
                health: 180,
                attack: 7,
                imageUrl: "./assets/img/darth-maul.jpg",
                enemyAttackBack: 25
            }
        ];

        showCharacter() {
            for (let item of this.characters) {
                let character = `<div class="character">
                <p class="character-name">${item.name}</p>
                <hr>
                <img src="${item.imageUrl}" alt="">
                <p class="character-live">${item.health}</p>
            </div>`
                this.characterCards.append(character);
            }
        }

        chooseCharacter() {
            let yourCharacter = this.yourCharacter;
            let defender = this.defender;
            let action = this.action;
            let gameInfo = this.gameInfo;
            let yourAttack = this.yourAttack;
            let characters = this.characters;
            $(".character").on("click", function () {
                if (action === 1) {
                    $(this).css({ display: "none" });
                    yourCharacter.html($(this).html());
                    let a = (($(this).html()).slice(($(this).html()).indexOf('name">') + 6)).substring(0, (($(this).html()).slice(($(this).html()).indexOf('name">') + 6)).indexOf('<'));
                    yourAttack = characters.find(x => x.name === a).attack;
                    starWarsGame.yourAttack = yourAttack;
                    yourCharacter.css({ "box-shadow": "0 0 20px 0 rgb(143, 201, 56" });
                    gameInfo.text("Please select the defender");
                    action = 2;
                } else if (action === 2) {
                    $(this).css({ display: "none" });
                    defender.html($(this).html());
                    defender.css({ "box-shadow": "0 0 20px 0 rgb(221, 14, 14" })
                    gameInfo.text("Please click the attack button");
                    action = 0;
                }
            })
        }

        attack() {
            let yourCharacter = this.characters.find(x => x.name === $("#yourCharacter .character-name").text());
            let defender = this.characters.find(x => x.name === $("#defender .character-name").text());
            this.gameInfo.html(`You attacked ${defender.name} for ${yourCharacter.attack} damage. <br>
            ${defender.name} attacked you back for ${defender.enemyAttackBack} damage.`);

            let yourLive = $("#yourCharacter .character-live");
            let defenderLive = $("#defender .character-live");
            if (yourLive.text() - defender.enemyAttackBack <= 0) {
                this.gameInfo.html(`Game over`);
            } else {
                yourLive.text(yourLive.text() - defender.enemyAttackBack);
            }
            if (defenderLive.text() - yourCharacter.attack <= 0) {
                this.defender.html(`<p class="character-name">?</p>
                    <hr>
                    <img src="./assets/img/question-mark.gif" alt="">
                    <p class="character-live">?</p>`);
                this.defender.css({ "box-shadow": "0 0 2px 0 rgb(221, 14, 14" })
                this.gameInfo.html(`You have defeated ${defender.name}, you can choose to fight another enemy.`);
                let newDefender = this.defender;
                let newGameInfo = this.gameInfo;
                $(".character").on("click", function () {
                    $(this).css({ display: "none" });
                    newDefender.html($(this).html());
                    newDefender.css({ "box-shadow": "0 0 20px 0 rgb(221, 14, 14" })
                    newGameInfo.text("Please click the attack button");
                })
            } else {
                defenderLive.text(defenderLive.text() - yourCharacter.attack);
            }
            yourCharacter.attack = yourCharacter.attack + this.yourAttack;
        }
    }

    var starWarsGame = new StarWars();

    starWarsGame.showCharacter();
    starWarsGame.chooseCharacter();
    starWarsGame.attackBtn.on("click", function () {
        if ($("#yourCharacter .character-name").text() == "?") {
            alert('Please select your character');
        } else if ($("#defender .character-name").text() == "?") {
            alert('Please select the defender');
        } else {
            starWarsGame.attack()
        }
    })
})