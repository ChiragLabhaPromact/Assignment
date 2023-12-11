import {ActorBehavior, PawnBehavior} from "../PrototypeBehavior";
// import {} from ''

class MovePawn  extends PawnBehavior{

    setup() {
        this.addEventListener("pointerDown", "moveFootball");
    }
    
    moveFootball() {
        let x = this.translation[0]; 
        let y = this.translation[1]; 
        let z = this.translation[2] - 5 ; 


        this.set({translation: [x, y, z]});

    }
}

class MoveActor extends ActorBehavior {
    setup() {
        console.log(this.translation);

    }
}

export default {
    modules: [
        {
            name: "Move",
            pawnBehaviors: [MovePawn],
            actorBehaviors: [MoveActor]
        }
    ]
}