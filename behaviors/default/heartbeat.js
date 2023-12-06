import { PawnBehavior } from "../PrototypeBehavior";

class heartbeat extends PawnBehavior {
    setup() {
        this.callMyApi();
    }

    callMyApi() {
        let access_token = localStorage.getItem("access_token");
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'X-DE-SCOPE': '1689141944790016.DE_1689141944790019',
                authorization: `Bearer ${access_token}`
            }
        };

        fetch('https://api.beamable.com/basic/session/heartbeat', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        this.future(5000).callMyApi();
    }
}

export default {
    modules: [
        {
            name: "Heartbeat",
            pawnBehaviors: [heartbeat]
        }
    ]
}