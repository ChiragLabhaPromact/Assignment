class admin {
    setup() {
        let button = document.querySelector("#adminLogin");
        button.onclick = () => this.openPopup();

        let closebutton = document.querySelector("#popup-close-login");
        closebutton.onclick = () => this.closePopup();

        let login = document.querySelector('#loginbutton');
        login.onclick = () => this.submitbutton();

    }

    openPopup() {
        document.getElementById('login-overlay').style.display = 'block';
        document.getElementById('login-popup').style.display = 'block';
    }

    closePopup() {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('login-popup').style.display = 'none';
    }

    submitbutton() {

        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('login-popup').style.display = 'none';

        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-DE-SCOPE': '1689141944790016.DE_1689141944790019'
            },
            body: JSON.stringify({ username: username, grant_type: 'password', password: password })
        };

        fetch('https://api.beamable.com/basic/auth/token', options)
            .then(response => response.json())
            .then(response => {
                localStorage.setItem("access_token", response.access_token)
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                const option = {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        'X-DE-SCOPE': '1689141944790016.DE_1689141944790019',
                        authorization: `Bearer ${response.access_token}`
                    },
                    body: JSON.stringify({
                        query: 'select act_time, gamer_tag, event_id   from platform_session_install where act_date >= \'2023-12-06\' and act_date <= \'2023-12-06\' LIMIT 10'
                    })
                };

                fetch('https://api.beamable.com/basic/history/query', option)
                    .then(response => response.json())
                    .then(response => {
                        for (var i = 0; i < response.results.length; i++) {
                            this.fetchDetails(i, response);
                        }
                    }
                    )
                    .catch(err => console.error(err));
            })
    }

    fetchDetails(i, response) {
        var tbody = document.querySelector(".table tbody");
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-DE-SCOPE': '1689141944790016.DE_1689141944790019'
            }
        };

        fetch(`https://api.beamable.com/basic/stats/client/batch?objectIds=client.public.player.${response.results[i].gamer_tag}&stats=alias&format=string`, options)
            .then(res => res.json())
            .then(res => {
                var newRow = tbody.insertRow();
                newRow.insertCell(0).textContent = res.results[0].stats.alias;
                newRow.insertCell(1).textContent = response.results[i].gamer_tag;
                newRow.insertCell(2).textContent = response.results[i].event_id;
                newRow.insertCell(3).textContent = response.results[i].act_time;
                document.getElementById('table').style.display = 'block';
            })
            .catch(err => console.error(err));
    }
}

export default {
    modules: [
        {
            name: "Admin",
            pawnBehaviors: [admin]
        }
    ]
}