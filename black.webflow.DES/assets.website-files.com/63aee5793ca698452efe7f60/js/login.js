const endPoint = "https://neura-ai-backend.vercel.app/";
function getDetails() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endPoint + "auth/signup");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    const body = JSON.stringify({
        // access_token
        //     :
        //     "eyJhbGciOiJIUzI1NiIsImtpZCI6IjNXb01Ub1YrZ3IraW1aRlEiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjkzODM5NDE3LCJpYXQiOjE2OTM4MzU4MTcsImlzcyI6Imh0dHBzOi8vamNuc2pxcWxnem5saHBlanN3bG0uc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjcyYWI0NDAzLWRjNDQtNGNjYS1iNjM2LWFkYjFmOGQ0MGM2MCIsImVtYWlsIjoiaGVsbG90aGVyZUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTY5MzgzNTgxN31dLCJzZXNzaW9uX2lkIjoiMDA3ZGFhYWYtZWY4OS00MmU1LWE4OTItM2E3ODlkOWZmYzMxIn0.BG6K2fZP5AofJDxHwZzAZmzklRYiCwRC7ksgW9xAZIw",
        // refresh_token
        //     :
        //     "m7iG2m-M_iwtfjqQ0fQLrA",
        //     supabase_id
        //     :
        //     "72ab4403-dc44-4cca-b636-adb1f8d40c60",
        email_id: username,
        password: password,
    });
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 201) {
            console.log(JSON.parse(xhr.responseText));
        } else {
            console.log(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(body);
}