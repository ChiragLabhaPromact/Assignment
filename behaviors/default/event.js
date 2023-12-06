import { PawnBehavior } from "../PrototypeBehavior";

class event extends PawnBehavior {
    setup() {
        let button = document.querySelector("#button");
        button.onclick = () => this.openPopup();

        let closebutton = document.querySelector("#popup-close");
        closebutton.onclick = () => this.closePopup();

    }


    openPopup() {
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
            .then(response => {
                document.getElementById('overlay').style.display = 'block';
                document.getElementById('popup').style.display = 'block';
                document.getElementById('text').innerHTML = `Current Player Game Tag: ${response.gt}`
            })
            .catch(err => console.error(err));
    }

    closePopup() {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('popup').style.display = 'none';
    }
}

export default {
    modules: [
        {
            name: "Event",
            pawnBehaviors: [event]
        }
    ]
}