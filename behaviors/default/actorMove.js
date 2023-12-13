import { ActorBehavior, PawnBehavior } from "../PrototypeBehavior";

class actorMovePawn extends PawnBehavior {

    setup() {
        this.x = this.translation[0];
        this.y = this.translation[1];
        this.z = this.translation[2];
        this.isBallMoving = false;
        this.testIntract();
        this.angle = 0
        this.spinSpeed = 0.2;
        console.log(this.actor);
    }

    testIntract() {
        if (!this.isBallMoving && Math.abs(this.getMyAvatar().translation[2] - this.actor.translation[2]) < 0.9) {
            this.isBallMoving = true;
            this.moveball(0);
        }
        this.future(100).testIntract();
    }

    moveball(elepsedTime) {
        if (elepsedTime >= 800) {
            this.isBallMoving = false;
            return
        };
        if (elepsedTime >= 300) {
            this.future(30).moveball(elepsedTime + 30);
        } else {
            this.future(5).moveball(elepsedTime + 5);

        }
        this.angle -= this.spinSpeed;
        this.z -= 0.1;

        this.set({
            rotation: Microverse.q_euler(this.angle, 0, 0),
            translation: [this.x, this.y, this.z],
        });
    }
}


export default {
    modules: [
        {
            name: "ActorMove",
            pawnBehaviors: [actorMovePawn],
        }
    ]
}