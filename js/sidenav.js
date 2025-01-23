function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0"; 
}

//Sidenav care te duce pe fiecare sectiune apasata instant, fara smooth!
// inchiderea meniului cand se face clic pe un link si derularea catre sectiune
/*document.querySelectorAll('.sidenav a').forEach(item => {
    item.addEventListener('click', function() {
        closeNav();
        // Asteapta sa se inchida meniul inainte de a derula
        setTimeout(() => {
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        }, 500); // 500ms este timpul de tranzitie CSS
    });
});*/

function navigateToSection(event) {
    event.preventDefault(); // Previne comportamentul standard (scrolling instant)
    const target = document.querySelector(event.target.getAttribute('href'));
    window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
    });
}
