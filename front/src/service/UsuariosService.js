


const UsuariosService = {
    findByUser: user =>{
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(
                "GET",
                "http://localhost:3000/auth/login",
                true
            );

            xhr.onreadystatechange = function() {
                console.log(this.responseText);
            };
            

            xhr.send();
        })
    }


}