/**
 * Monstruo al que tenemos que destruir
 */
class Boss extends Opponent {
    /**
     * @param game {Game} La instancia del juego al que pertenece el oponente
     */
    constructor (game) {
        const height = OPPONENT_HEIGHT * game.width / 100,
            width = OPPONENT_WIDTH * game.width / 100,
            x = getRandomNumber(game.width - width / 2),
            y = 0;

        super(game, width, height, x, y);
        this.direction = "R"; // Dirección hacia la que se mueve el oponente
        this.speed = OPPONENT_SPEED*2;
        this.myImage = BOSS_PICTURE;
        this.myImageDead = BOSS_PICTURE_DEAD;
        setTimeout(() => this.shoot(), 1000 + getRandomNumber(2500));
    }

    /**
     * Crea un nuevo disparo
     */
    shoot () {
        if (!this.dead && !this.game.ended) {
            if (!this.game.paused) {
                this.game.shoot(this);
            }
            setTimeout(() => this.shoot(), 1000 + getRandomNumber(2500));
        }
    }

    /**
     * Actualiza los atributos de posición del oponente
     */
    update () {
        if (!this.dead && !this.game.ended) {
            this.y += this.speed;
            if (this.y > this.game.height) {
                this.y = 0;
            }
            if (this.direction === "R") { // Hacia la derecha
                if (this.x < this.game.width - this.width - this.speed) {
                    this.x += this.speed;
                } else {
                    this.horizontalMov = 0;
                }
            } else if (this.x > this.speed) {
                this.x -= this.speed;
            } else {
                this.horizontalMov = 0;
            }
            this.horizontalMov -= this.speed;
            if (this.horizontalMov < this.speed) {
                this.horizontalMov = getRandomNumber(this.game.width / 2);
                this.direction = this.direction === "R" ? "L" : "R"; // Cambia de sentido
            }
        }
    }

    /**
     * Mata al oponente
     */
    collide() {
        
        if (!this.dead) {
            setTimeout(() => {
                this.game.endGame();
            }, 2000);
            ++this.game.score;
            document.getElementById("scoreli").innerHTML = `Score: ${game.score}`;
            super.collide();
        }

    }
}