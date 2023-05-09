function abrirMenu() {
    var menu = document.getElementById("menuMobile");
    menu.style.left = "0";
}

function fecharMenu() {
    var menu = document.getElementById("menuMobile");
    menu.style.left = "-30em";
}

function meuperfil() {
    var abaperfil = document.getElementById("abaperfil");
    abaperfil.style.opacity = 1;
}

function meuperfilmobile() {
    var abaperfil = document.getElementById("abaperfilmobile");
    abaperfil.style.opacity = 1;
}

function fecharabaperfil() {
    var abaperfil = document.getElementById("abaperfil");
    abaperfil.style.opacity = 0;
}

function fecharabaperfilmobile() {
    var abaperfil = document.getElementById("abaperfilmobile");
    abaperfil.style.opacity = 0;
}

function fecharbotaoperfilmobile() {
    const loginbutton = document.getElementById("botaologinmobile");
    loginbutton.style.opacity = 0;
}

function fecharabaperfillogin() {
    const loginbutton = document.getElementById("botaologin");
    loginbutton.style.opacity = 0;
}