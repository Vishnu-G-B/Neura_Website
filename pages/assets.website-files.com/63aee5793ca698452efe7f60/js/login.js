const endPoint = "https://api.neura-ai.club/";

function signUpRequest() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confPassword = document.getElementById("conf-password").value;
    const phone_number = document.getElementById("phNo").value;
    const loginButton = document.getElementById("sign-up");
    const branchDropdown = document.getElementById("select1");
    const branch = branchDropdown.options[branchDropdown.selectedIndex].text;
    const year = document.getElementById("select2").value;
    loginButton.textContent = "Loading...";
    loginButton.disabled = true;

    console.log(username,"+",password,"+",phone_number,"+",branch,"+",year);
    if(username.includes("@learner.manipal.edu") === false ){
        appendAlert("Please enter you learner email ID!!");
        setTimeout(() => {
            try {
                const alertParentDiv = document.getElementById("liveAlertPlaceholder");
                const alertChild = document.getElementById("removable");
                alertParentDiv.classList.remove("liveAlertPlaceholder");
                alertChild.remove();
                loginButton.textContent = "Sign Up";
                loginButton.disabled = false;

            } catch (error) {
                console.log("I can't be fkin asked", error.message); 
            }
            
        }, 3000);
        return;
    }
    
    if (password === confPassword) {

        const xhr = new XMLHttpRequest();
        xhr.open("POST", endPoint + "auth/signup");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        const body = JSON.stringify({
            email_id: username,
            password: password,
            phone_number: phone_number,
            branch: branch,
            year: year,
        });
        xhr.onload = () => {
            
            let response = JSON.parse(xhr.responseText);
            if(response.status === "200"){
                createCookie("access_token", response.detail.user_state.access_token);
                createCookie("refresh_token", response.detail.user_state.refresh_token);
                createCookie("supabase_id", response.detail.user_state.supabase_id);

                const xhr2 = new XMLHttpRequest();
                xhr2.open("POST", endPoint + "event/register/1");
                xhr2.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                const body2 = JSON.stringify ({
                    access_token: getCookie("access_token"),
                    refresh_token: getCookie("refresh_token"),
                    supabase_id: getCookie("supabase_id"),
                });
                xhr2.onload = () => {
                    let response = JSON.parse(xhr2.responseText);
                    if (response.status == 200) {
                        console.log (response);
                        createCookie("access_token", response.detail.user_state.access_token);
                        createCookie("refresh_token", response.detail.user_state.refresh_token);
                        createCookie("supabase_id", response.detail.user_state.supabase_id);
                        const qr_text = response.detail.jwt_qr;
                        window.location.replace("events.html");
                        createQRDiv(qr_text, "tempQRCode");
                    }
                    else {
                        console.log("ERROR",response);
                    }
                };
                xhr2.send(body2);

            }
            else {
                // console.log(response);
                console.log("You probably have an account with us already");
                appendAlert(response.detail);
                setTimeout(() => {
                
                    try {
                        const alertParentDiv = document.getElementById("liveAlertPlaceholder");
                        const alertChild = document.getElementById("removable");
                        alertParentDiv.classList.remove("liveAlertPlaceholder");
                        alertChild.remove();
                        loginButton.textContent = "Sign Up";
                        loginButton.disabled = false;

                    } catch (error) {
                       console.log("I can't be fkin asked", error.message); 
                    }
                    
                }, 3000);

            }

        };
        xhr.send(body);


    } else {
        appendAlert("Passwords do not match");
        setTimeout(() => {
                
            try {
                const alertParentDiv = document.getElementById("liveAlertPlaceholder");
                const alertChild = document.getElementById("removable");
                alertParentDiv.classList.remove("liveAlertPlaceholder");
                alertChild.remove();
            } catch (error) {
               console.log("I can't be fkin asked"); 
            }
            
        }, 3000);
    }
}

function signInRequest() {
    const username = document.getElementById("username2").value;
    const password = document.getElementById("password2").value;
    const loginButton = document.getElementById("login");
    loginButton.textContent = "Loading...";
    loginButton.disabled = true;

    if(username.includes("@learner.manipal.edu") === false ){
        appendAlert("Please enter you learner Email ID!!");
        setTimeout(() => {
            try {
                const alertParentDiv = document.getElementById("liveAlertPlaceholder");
                const alertChild = document.getElementById("removable");
                alertParentDiv.classList.remove("liveAlertPlaceholder");
                alertChild.remove();
                loginButton.textContent = "Login";
                loginButton.disabled = false;

            } catch (error) {
                console.log("I can't be fkin asked", error.message); 
            }
            
        }, 3000);
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", endPoint + "auth/signin");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    const body = JSON.stringify({
        email_id: username,
        password: password,
    });
    xhr.onload = () => {
        
        let response = JSON.parse(xhr.responseText);
        if (response.status === "200"){
            createCookie("access_token", response.detail.user_state.access_token);
            createCookie("refresh_token", response.detail.user_state.refresh_token);
            createCookie("supabase_id", response.detail.user_state.supabase_id);
            // console.log(document.cookie);
            loginButton.textContent = "Logged In!"
            window.location.replace("events.html");
            
        }
        else{
            console.log(response.status);
            console.log("INCORRECT PASSWORD");
            appendAlert(response.detail);
            setTimeout(() => {
                
                try {
                    const alertParentDiv = document.getElementById("liveAlertPlaceholder");
                    const alertChild = document.getElementById("removable");
                    alertParentDiv.classList.remove("liveAlertPlaceholder");
                    alertChild.remove();
                    loginButton.textContent = "Login";
                    loginButton.disabled = false;
                    
                } catch (error) {
                   console.log("ALERT PLACEHOLDER NOT FOUND",error.message); 
                }
                
            }, 3000);
        }
        // else {
        //     console.log(response.status);
        //     console.log("Something other than 422");
        //     appendAlert("ERROR");
        //     setTimeout(()=> {
        //         try{
        //             const alertParentDiv = document.getElementById("liveAlertPlaceholder");
        //             const alertChild = document.getElementById("removable");
        //             alertParentDiv.classList.remove("liveAlertPlaceholder");
        //             alertChild.remove();
        //             loginButton.textContent = "Login";
        //             loginButton.disabled = false;
        //         } catch(error){
        //             console.log("ALERT PLACEHOLDER NOT FOUND", error.message);
        //         }
        //     },3000)
        // }
    };
    xhr.send(body);
}

function getQR() {
    const access_token_user = getCookie("access_token");
    const refresh_token_user = getCookie("refresh_token");
    const supabase_id_user = getCookie("supabase_id");
    // console.log(typeof access_token_user,refresh_token_user,supabase_id_user)
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endPoint + "event/fetch_qr");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    const body = JSON.stringify ({
        access_token: access_token_user,
        refresh_token: refresh_token_user,
        supabase_id: supabase_id_user,
    });

    xhr.onload = () => {
        let response = JSON.parse(xhr.responseText);
        if (response.status == 200){
            createCookie("access_token", response.detail.user_state.access_token);
            createCookie("refresh_token", response.detail.user_state.refresh_token);
            createCookie("supabase_id", response.detail.user_state.supabase_id);
            const qr_text = response.detail.jwt_qr;
            
            createQRDiv(qr_text, "tempQRCode");
        }
    }
    xhr.send(body);
}

function checkLoggedIn() {
    const access_token_user = getCookie("access_token");
    const refresh_token_user = getCookie("refresh_token");
    const supabase_id_user = getCookie("supabase_id");
    if (access_token_user && refresh_token_user && supabase_id_user) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", endPoint + "auth/check_state");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        const body = JSON.stringify({
            access_token: access_token_user,
            refresh_token: refresh_token_user,
            supabase_id: supabase_id_user,
        });

        xhr.onload = () => {
            
            let response = JSON.parse(xhr.responseText);
            // console.log(typeof response.status, response.status);
            if (xhr.status == 200) {
                console.log("LOGGED IN!!")
                createCookie("access_token", response.detail.user_state.access_token);
                createCookie("refresh_token", response.detail.user_state.refresh_token);
                createCookie("supabase_id", response.detail.user_state.supabase_id);
                if (!document.URL.includes("events.html")){
                    window.location.replace("events.html");
                }
            } else if (xhr.status == 401) {
                console.log("Cookies have expired");
                window.location.replace("login.html");
            }
            //Implement some logic so that the persons name gets stored(USE COOKIES) and this gets checked only after the initial signUp
            //So that the index page is still initially viewable
            //******** */
            // const linkElement = document.getElementById("interactive-name");
            // if (xhr.status == 200){
            //     linkElement.innerHTML = "Hello!"
            //     linkElement.href = " ";
            // }

        }
        xhr.send(body);

    } else {
        console.log("No Cookies found redirecting");
        window.location.replace("sign-up.html")
    }
}

// setTimeout(getQR,1000);

function createCookie(key,value) { // Can add a 'expires' param here in the future
    document.cookie = key + "=" + value + "; path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      c = c.trimStart();
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function isLearnerEmail(email) {
    return email.includes("@learner.manipal.edu");
}

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
    '<div class="alert" id="removable">',
        `${message}`,
    '</div>'
    ].join('')
    alertPlaceholder.classList.add("liveAlertPlaceholder");
    alertPlaceholder.append(wrapper);
}

const createQRDiv = (content,divId) => {
    var qrcode = new QRCode(document.getElementById(divId),
    {
        text: content,
        width: 300,
        height: 300,
        correctLevel : QRCode.CorrectLevel.M
    });
}

const branchDropdown = document.getElementById("select1");
const yearDropDown = document.getElementById("select2");
let optionDeleted = false;

function blockChoices() {
    if (yearDropDown.value != 1) {
        if (!optionDeleted) {
            const optionToDelete = branchDropdown.querySelector('[value="option4"]');
            if (optionToDelete) {
                branchDropdown.removeChild(optionToDelete);
                optionDeleted = true;
            }
        }
    } else {
        if (optionDeleted) {
            const option = document.createElement("option");
            option.text = "CSE Data Science";
            option.value = "option4"; // Set the value to "option4"
            branchDropdown.appendChild(option);
            optionDeleted = false;
        }
    }
}

blockChoices();
yearDropDown.addEventListener("change", blockChoices);
yearDropDown.dispatchEvent(new Event("change"));

function getNewsArticles() {
    const endPoint = ""
    const xhr = new XMLHttpRequest();
}