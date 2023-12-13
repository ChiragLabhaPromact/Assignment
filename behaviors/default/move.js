import { ActorBehavior, PawnBehavior } from "../PrototypeBehavior";

class MovePawn extends PawnBehavior {

    setup() {
        let THREE = Microverse.THREE;
        var geometry = new THREE.BoxGeometry();

        let texture1;
        let texture2;

        if (this.actor) {
            texture1 = new THREE.TextureLoader().load(this.actor);
        }

        if (this.getMyAvatar()) {
            texture2 = new THREE.TextureLoader().load(this.getMyAvatar());
        }

        var material1 = new THREE.MeshBasicMaterial({ map: texture1 });
        this.mesh1 = new THREE.Mesh(geometry, material1);

        var material2 = new THREE.MeshBasicMaterial({ map: texture2 });
        this.mesh2 = new THREE.Mesh(geometry, material2);
        this.x = this.translation[0];
        this.y = this.translation[1];
        this.z = this.translation[2];
        this.isBallMoving = false;
        this.angle = 0
        this.spinSpeed = 0.2;
        this.intersects();
    }

    intersects() {
        this.mesh1.position.set(this.x, this.y, this.z);
        this.mesh2.position.set(this.getMyAvatar().translation[0], this.getMyAvatar().translation[1], this.getMyAvatar().translation[2]);

        var box1 = new THREE.Box3().setFromObject(this.mesh1);
        var box2 = new THREE.Box3().setFromObject(this.mesh2);

        box1.min.y = box1.max.y = 0;
        box2.min.y = box2.max.y = 0;

        // Check for collision
        if (box1.intersectsBox(box2)) {
            this.moveFootball(0);
            let avatarName = this.actor.service("PlayerManager").players.get(this.viewId)._name;
            this.say("dataupdated", avatarName);
        }

        this.future(100).intersects();
    }

    moveFootball(elepsedTime) {
        if (elepsedTime >= 800) {
            this.isBallMoving = false;
            return
        };
        if (elepsedTime >= 300) {
            this.future(30).moveFootball(elepsedTime + 30);
        } else {
            this.future(5).moveFootball(elepsedTime + 5);

        }
        this.angle -= this.spinSpeed;
        this.z -= 0.1;
        this.set({
            rotation: Microverse.q_euler(this.angle, 0, 0),
            translation: [this.x, this.y, this.z],
        });
    }
}

class MoveActor extends ActorBehavior {
    setup(){
        this.listen("dataupdated", "test")
    }

    test(avatarName) {
        if(this.myObject == undefined) {
            this.myObject = {};
        }
        if(this.myObject.hasOwnProperty(avatarName)) {
            this.myObject[avatarName] += 1; 
        } else {
            this.myObject[avatarName] = 1;
        }
        console.log(this.myObject);
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