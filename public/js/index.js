function signForm() {

    const form = document.getElementById('form');
    const email = document.getElementById('email').value;
    const fullname = document.getElementById('fullname').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3001/signup', {
        method: "POST",
        body: JSON.stringify({
            fullname,
            email,
            password
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(data => data.json())
        .then(res => {
            if (res.status === 500) {
                alert("An error occured, try again")
            } else {
                alert("Your account has been created, We sent a varification code to Email");
                form.reset();
                window.location.href = "/verify"
            }
        })
}

function codeForm() {
    const form = document.getElementById('form');
    const code = document.getElementById('code').value;

    fetch('http://localhost:3001/verify', {
        method: "POST",
        body: JSON.stringify({
            code
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(data => data.json())
        .then(res => {
            if (res.status === 401) {
                alert(res.response)
            } else {
                alert("Your account has been varified, proceed to the signin page");
                form.reset();
            }
        })
}