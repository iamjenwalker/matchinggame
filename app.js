function dealCardsAnimation() {
    TweenMax.staggerFrom('.pairs--outer', '0.1', { y: 1400 }, 0.05);
}

var vue = new Vue({
    el: '#wrapper',
    data: function() {
        return {
            id: '',
            el: '',
            correctArray: [],
            selected: false,
            counter: 0,
            counterView: false,
            cards: [
                { name: 'one', src: 'one.jpg' },
                { name: 'two', src: 'two.jpg' },
                { name: 'three', src: 'three.jpg' },
                { name: 'four', src: 'four.jpg' },
                { name: 'five', src: 'five.jpg' },
                { name: 'six', src: 'six.jpg' },
                { name: 'seven', src: 'seven.jpg' },
                { name: 'eight', src: 'eight.jpg' },
                { name: 'nine', src: 'nine.jpg' },
                { name: 'ten', src: 'ten.jpg' }
            ]
        };
    },

    created: function() {
        var cardFunctions = {
            count: 0,
            selectCard: function(el) {
                var pairsBack = el.querySelector('.pairs--back');
                var pairsFront = el.querySelector('.pairs');

                pairsBack.removeAttribute('class');
                pairsBack.setAttribute('class', 'pairs--back--alt');

                pairsFront.removeAttribute('class');
                pairsFront.setAttribute('class', 'pairs--front--alt');

            },

            unselectCard: function(el) {
                var pairsBack = el.querySelector('.pairs--back--alt');
                var pairsFront = el.querySelector('.pairs--front--alt');

                if (!pairsFront) {
                    pairsFront = el.querySelector('.pairs--front--matched');
                }

                pairsBack.removeAttribute('class');
                pairsBack.setAttribute('class', 'pairs--back');

                pairsFront.removeAttribute('class');
                pairsFront.setAttribute('class', 'pairs');
            },

            matchedCard: function(el) {
                var pairsBack = el.querySelector('.pairs--back');
                var pairsFront = el.querySelector('.pairs');

                pairsBack.removeAttribute('class');
                pairsBack.setAttribute('class', 'pairs--back--alt');

                pairsFront.removeAttribute('class');
                pairsFront.setAttribute('class', 'pairs--front--matched');
            },

            increaseCount: function() {
                this.count += 1;
                document.getElementById('cc').innerHTML = 'Turns Taken:' + this.count;
            },

            matchedMessage: function(name) {
                var Icon = document.getElementById('matched--cards');
                var att = Icon.getAttribute('class');
                Icon.removeAttribute('class');
                var delayAddClass = setTimeout(function() {
                    Icon.setAttribute('class', 'matched--cards2');
                }, 400);

                document.getElementById('matched--cards').innerHTML = "You've matched " + name;
            },

            resetGame: function() {
                var pairsBack = document.querySelectorAll('.pairs--outer');
                var count = pairsBack.length;

                for (var i = 0; i < count; i++) {
                    this.unselectCard(pairsBack[i]);
                }
            },

            reset: function(array, comp) {
                var count = array.length;
                if (count === comp) {
                    var time = setTimeout(function() {
                        cardFunctions.resetGame();
                    }, 3000);
                }
            }
        };

        var cardLength = this.cards.length * 2;
        var cards = this.cards;
        var num = this.cards.length;
        var dd = cards.map(function(ar) {
            return cards.push(ar);
        });
        cards = this.shuffle(this.cards);
        var i = 0;
        cards.forEach(function() {
            var id = 'pair' + i.toString();
            document.getElementById('pairs').innerHTML += '<div class="pairs--outer" id="' + id + '"><div class="pairs--back"><img src="card-back.jpg" alt="cardBack" height="100" width="80" /></div><div class="pairs" ><img src="' + cards[i].src + '" alt="" height="100" width="80"/></div></div>';
            i++;
        });

        var selected = false;
        var nameSelect = '';
        var correctArray = [];
        var count = 0;

        function matches(name, el) {
            var addSelected;
            var element;
            var turnSelected;
            var index = correctArray.indexOf(name);
            var previousElement;
            var unselect;
            //  if(index === -1){

            if (this.el === el) {
                //RECLICK
                return;
            } else if (selected === false) {

                //FIRST OF PAIR CLICKED
                selected = true;
                nameSelect = name;
                this.el = el;
                addSelected = cardFunctions.selectCard(el);
            }

            //CLICKS ARE EITHER A MATCH OR NOT
            else if ((selected === true) && (nameSelect !== name)) {

                //NO MATCH

                previousElement = this.el;
                selected = false;

                turnSelected = cardFunctions.selectCard(el);

                unselect = setTimeout(function() {
                    cardFunctions.unselectCard(el);
                }, 1000);

                unselect2 = setTimeout(function() {
                    cardFunctions.unselectCard(previousElement);
                }, 1000);

                this.el = '';

                cardFunctions.increaseCount();

            } else if ((selected === true) && (nameSelect === name)) {
                //CARDS PAIRED
                selected = false;
                nameSelect = name;
                this.el = el;
                turnSelected = cardFunctions.matchedCard(el);

                correctArray.push(name);

                this.el = '';

                cardFunctions.matchedMessage(name);
                cardFunctions.increaseCount();
                cardFunctions.reset(correctArray, num);
            }
        }

        var pairs = document.getElementsByClassName('pairs--outer');
        for (var j = 0; j < pairs.length; j++) {
            var name = cards[j].name;
            pairs[j].addEventListener('click', (function(name, j) {
                return function() {
                    matches(name, this);
                };
            })(name, j));
        }
        dealCardsAnimation();
    },

    methods: {
        shuffle: function(array) {
            for (i = array.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = array[i - 1];
                array[i - 1] = array[j];
                array[j] = x;
            }
            return array;
        },
    },
});