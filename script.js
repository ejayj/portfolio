/* 
https://github.com/Aneks1/canvas-particles
This is my first pen, if you liked it please leave a heart 💗 
*/

class Particle {
    parent;
    id;
    position = { x: 0, y: 0 };
    diameter = 0;
    life = 0;
    speed = { x: 0, y: 0 };
    init() {
        const interval = setInterval(() => {
            this.position.x += this.speed.x * 60 / 1000;
            this.position.y -= this.speed.y * 60 / 1000;
            this.life -= 1 / 60;
            if (this.life <= 0) {
                clearInterval(interval);
                this.parent.particles.delete(this.id);
            }
        }, 1000 / 60);
    }
    constructor(id, parent) {
        this.parent = parent;
        this.id = id;
        this.init();
    }
}
class ParticleSystem {
    canvas;
    size;
    lastId = 0;
    ammount = 0;
    particles = new Map();
    diameter = { min: 0, max: 0 };
    life = { min: 0, max: 0 };
    speed = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
    static getRandomNumberInInterval(invterval) {
        const min = Math.ceil(invterval.min);
        const max = Math.floor(invterval.max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    createParticle() {
        const particle = new Particle(this.lastId.toString(), this);
        particle.position.x = ParticleSystem.getRandomNumberInInterval({ min: 0, max: this.size.x });
        particle.position.y = ParticleSystem.getRandomNumberInInterval({ min: 0, max: this.size.y });
        particle.diameter = ParticleSystem.getRandomNumberInInterval(this.diameter);
        particle.life = ParticleSystem.getRandomNumberInInterval(this.life);
        particle.speed.x = ParticleSystem.getRandomNumberInInterval(this.speed.x);
        particle.speed.y = ParticleSystem.getRandomNumberInInterval(this.speed.y);
        this.particles.set(this.lastId.toString(), particle);
        this.lastId++;
    }
    init() {
        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = 'white';
        this.particles = new Map()
        for (let i = 0; i < this.ammount; i++)
            this.createParticle();
        setInterval(() => {
            if (this.particles.size <= this.ammount)
                this.createParticle();
        }, 1000 / 60);
        setInterval(() => {
            ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.particles.forEach((particle) => {
                ctx?.beginPath();
                ctx?.arc(particle.position.x, particle.position.y, particle.diameter / 2, 0, 2 * Math.PI, false);
                ctx?.closePath();
                ctx?.fill();
            });
        }, 1000 / 60);
    }
    constructor(canvas, size) {
        this.canvas = canvas;
        this.size = size;
        canvas.width = size.x;
        canvas.height = size.y;
    }
}

        const canvas = document.getElementById('container')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const system = new ParticleSystem(canvas, { x: window.innerWidth, y: window.innerHeight })
        system.ammount = 100
        system.diameter = { min: 1, max: 2 }
        system.life = { min: 15, max: 20 }
        system.speed = { x: { min: -10, max: 10 }, y: { min: -10, max: 10 } }
        system.init()

onresize = (event) => {
  system.size = { x: window.innerWidth, y: window.innerHeight }
  system.init()
};

        /* ------------------------------------------------------------------------ *  
4 states per letter: Transparent | Line | Block | Visible.
These states are shuffled for a unique "decode" effect each time.
* ------------------------------------------------------------------------ */

        function decodeText() {
            var text = document.getElementsByClassName('decode-text')[0];
            // debug with
            // console.log(text, text.children.length);

            // assign the placeholder array its places
            var state = [];
            for (var i = 0, j = text.children.length; i < j; i++) {
                text.children[i].classList.remove('state-1', 'state-2', 'state-3');
                state[i] = i;
            }

            // shuffle the array to get new sequences each time
            var shuffled = shuffle(state);

            for (var i = 0, j = shuffled.length; i < j; i++) {
                var child = text.children[shuffled[i]];
                classes = child.classList;

                // fire the first one at random times
                var state1Time = Math.round(Math.random() * (2000 - 300)) + 50;
                if (classes.contains('text-animation')) {
                    setTimeout(firstStages.bind(null, child), state1Time);
                }
            }

            // At the end of decodeText()
            setTimeout(decodeText, 7200);
        }

        // send the node for later .state changes
        function firstStages(child) {
            if (child.classList.contains('state-2')) {
                child.classList.add('state-3');
            } else if (child.classList.contains('state-1')) {
                child.classList.add('state-2')
            } else if (!child.classList.contains('state-1')) {
                child.classList.add('state-1');
                setTimeout(secondStages.bind(null, child), 100);
            }
        }
        function secondStages(child) {
            if (child.classList.contains('state-1')) {
                child.classList.add('state-2')
                setTimeout(thirdStages.bind(null, child), 100);
            }
            else if (!child.classList.contains('state-1')) {
                child.classList.add('state-1')
            }
        }
        function thirdStages(child) {
            if (child.classList.contains('state-2')) {
                child.classList.add('state-3')
            }
        }

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }


        // Demo only stuff
        decodeText();

        // beware: refresh button can overlap this timer and cause state mixups
        setInterval(function () { decodeText(); }, 10000);


        var scrollTop = document.getElementById("scrollTop");

window.onscroll = function(){
    scrollfunction()
};
function scrollfunction(){

    if( document.body.scrollTop > 1 || document.documentElement.scrollTop > 1){
        scrollTop.style.display = "block";
    } else {
        scrollTop.style.display = "none";
    }
}

scrollTop.addEventListener("click", function(){
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
    })
})

document.getElementById('ProjectsScrollButton').addEventListener('click', function() {
  const scroller = document.getElementById('cardScroller');
  // Find one card's width (including margin)
  const card = scroller.querySelector('.column');
  if (!card) return;
  const cardStyle = window.getComputedStyle(card);
  const cardWidth = card.offsetWidth + parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);
  // Scroll by 3 cards
  scroller.scrollBy({ left: cardWidth * 3, behavior: 'smooth' });
});


        //new idea:
        //scrolling image that fades into the next one like the htmlup eventually template
        //buttons using css transition that enlarge as you scroll over them, or get bigger as you tap on it on iphone
        //as you scroll over each button, in javascript what you are scrolling over is changed by background

        //add different mouse animation

        //the pages themself will be fairly static, with maybe a carosel for the projects and a different hover animation
        //and an animation for projects on click

        //then a list of my skills/known languages fading in like that one htmlup hyperspace template

        //the words "emmanuel johnson" will fade up also like the landing page on the htmlup hyperspace template
        //the projects fadde in or about me fade in like the blue area of the hyperspacwe template? and then carosel? or maybe see more in projectS? or maybe make it about me?
        //my skills pop in like the pink section

        //contact me at bottom like framer stuff
        //hire me and myr esume section

        //we are stealing the animations from them. the actually website will be founded on pop ups or
        //on click the whole page changes and background changes to a new page, with a big x to go back button on top right? or a left facing arrow