// Copyright 2022 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

export function init(Constants) {
    Constants.AvatarNames = ["newwhite"];

    /* Alternatively, you can specify a card spec for an avatar,
       instead of a string for the partical file name, to create your own avatar.
       You can add behaviorModules here. Also, if the system detects a behavior module
       named AvatarEventHandler, that is automatically installed to the avatar.
        {
            type: "3d",
            modelType: "glb",
            name: "rabbit",
            dataLocation: "./assets/avatars/newwhite.zip",
            dataRotation: [0, Math.PI, 0],
            dataScale: [0.3, 0.3, 0.3],
        }
    */

    Constants.UserBehaviorDirectory = "behaviors/default";
    Constants.UserBehaviorModules = [
        "lights.js", "move.js", "apicall.js", "heartbeat.js", "event.js", "admin.js"
    ];

    Constants.DefaultCards = [
        {
            card: {
                name:"world model",
                layers: ["walk"],
                type: "3d",
                behaviorModules: ["Api", "Heartbeat", "Event", "Admin"],
                singleSided: true,
                shadow: true,
                translation:[0, -1.7, 0],
                placeholder: true,
                placeholderSize: [400, 0.1, 400],
                placeholderColor: 0xe0e0e0,
                placeholderOffset: [0, 0, 0],
            }
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                dataLocation: "3OF2-s4U1ZOJduGATmLEIXo1iTkQHd5ZBknKgL5SvqpQJzs7Pzx1YGApJiMqPGE6PGEsPSA-Oio7YSYgYDpgCCsZLTYjBjwOJB4sDRcrfAg3Ljk2OBoEGBYWfWAmIGEsPSA-Oio7YSImLD0gOSo9PCpgPwB9AAIIISx8YiYneScqKyQaIisNLHkaGT8YKg56JQwQfHstPiNiGQ49e2ArLjsuYCMBPgMiCQt3OQskGhcleSp9HQIIfXseHgo7EAo9CB48FRwpegsCLH4OIwY",
                fileName: "/abandoned_parking_4k.jpg",
                dataType: "jpg",
                toneMappingExposure: 1.2
            }
        },
        {
            card: {
                translation: [0.014005326478046514, -1.2687309555828903, -5.983748895844471],    
                scale: [0.16907287635213353, 0.16907287635213353, 0.16907287635213353],    
                rotation: [0, 0.0015984296693304875, 0, 0.9999987225104802],    
                layers: ["pointer"],    
                behaviorModules: ["Move"],
                name: "Football.glb",   
                dataLocation: "3FX27TcBjr2-ZvZjLxcbwCZn0alV3SOS4Z5Beipgxa2QLjIyNjV8aWkgLyojNWgzNWglNCk3MyMyaC8paTNpPBMyMRYJPAAzCRV3DS8hCxwvc3V_PgACAX52dGkvKWglNCk3MyMyaCsvJTQpMCM0NSNoKiklJyoiIzAiIyAnMyoyaTIxASgUCzYyDzYeEi0NNiMyMwxrcCUpMQIDMAUhdBYqKDUsH3MODQINdX5pIicyJ2kgEyd1AgExABIFMAsnFH4xBQk8MAQzESosNSMnHBMJcBcxchcvKCQsM3IP",    
                dataScale: [2.132073633812013, 2.132073633812013, 2.132073633812013],    
                ileName: "Football.glb",    
                modelType: "glb",    
                shadow: true,    
                singleSided: true,    
                type: "3d",
            }
        }
    ];
}
