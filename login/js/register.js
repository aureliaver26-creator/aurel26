document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `action=register&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    });

    const data = await res.json();

    // ambil data user dari localStorage
    const savedUser = JSON.parse(localStorage.getItem("savedUser"));

    if (data.status === "success") {

        document.getElementById("message").innerText =
            "Registrasi berhasil, silakan login";  
    }

        if (
            
                savedUser &&
                username === savedUser.username &&
                email === savedUser.email &&
                password === savedUser.password
            
        ) 
        {

            localStorage.setItem("loggedInUser", username);

            alert("Registrasi berhasil!");
            
            setTimeout(()=>{
              window.location.href="index.html";
            },1000);

        }

    } else {

        document.getElementById("message").innerText =
            data.message || "Gagal registrasi";

        alert("Username telah digunakan!");

    }
});
