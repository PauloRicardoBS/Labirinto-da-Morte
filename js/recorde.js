
(function (){
  
    var firebaseConfig = {
        apiKey: "AIzaSyBY4PwMaqVgX11T3dFc93D7HDQjvANwJKY",
        authDomain: "labirinto-da-morte.firebaseapp.com",
        databaseURL: "https://labirinto-da-morte.firebaseio.com",
        projectId: "labirinto-da-morte",
        storageBucket: "labirinto-da-morte.appspot.com",
        messagingSenderId: "398007823211",
        appId: "0:398007823212:web:8732a4020775a930a12149",
        measurementId: "G-E55NYWVJ9N"
    };

    firebase.initializeApp(firebaseConfig);

})()


firebase.database().ref('Jogadores').orderByChild('score').limitToFirst(1).on('value', function (snapshot){

    lista.innerHTML = [];

    snapshot.forEach( function (item) {

        var la = document.createElement('la');
        la.appendChild(document.createTextNode(item.val().Jogador + " : " + item.val().score*(-1)));
        lista.appendChild(la);
    
    });
})