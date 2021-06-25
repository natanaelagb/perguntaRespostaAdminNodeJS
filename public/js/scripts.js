var button = document.getElementById("navbarToggle");

button.addEventListener("click", (event) => {
    
    let navbar   = button.nextElementSibling;
    let classes  = navbar.classList;

    classes.remove("colapso");
    classes.add("colapsando");

    if(classes.contains("mostrar")){
        classes.remove("mostrar");
        navbar.style.maxHeight = null;

        setTimeout(()=>{
            classes.remove("colapsando");
            classes.add("colapso");
        },350)

    }else{
        navbar.style.maxHeight = navbar.scrollHeight + "px";

        setTimeout(()=>{
            classes.remove("colapsando");
            classes.add("colapso");
            classes.add("mostrar");
        },350)
    }


})