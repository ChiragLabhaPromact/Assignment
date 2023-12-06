class Apicall {

    setup() {
        this.callMyApi();
    }

    callMyApi() {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-DE-SCOPE': '1689141944790016.DE_1689141944790019'
            },
            body: JSON.stringify({ grant_type: 'guest' })
        };

        fetch('https://api.beamable.com/basic/auth/token', options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                localStorage.setItem("access_token", response.access_token);
            })
            .catch(err => console.error(err));

        let access_token = localStorage.getItem("access_token");

        const option = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-DE-SCOPE': '1689141944790016.DE_1689141944790019',
                authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify({
                language: { code: 'en', ctx: 'ISO639' },
                platform: 'WindowsEditor',
                device: 'H110M-S2 (Gigabyte Technology Co., Ltd.)',
                locale: 'en'
            })
        };

        fetch('https://api.beamable.com/basic/session/', option)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
}

export default {
    modules: [
        {
            name: "Api",
            pawnBehaviors: [Apicall]
        }
    ]
}