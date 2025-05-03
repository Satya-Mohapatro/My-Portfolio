// Tab switching
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, event) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Side menu open/close
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

// Google Sheet form submit
const scriptURL = 'https://script.google.com/macros/s/AKfycbxDlEu1T1np49YEXnwhUm5tpwn1JNxmSOC7zEQZCOusk1ShxgYkxOZ8LR0OELVT7w8/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");
const loadingSpinner = document.getElementById('loading-spinner');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        loadingSpinner.style.display = 'block';
        form.querySelector('button[type="submit"]').disabled = true;

        // Send form data using fetch
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                // Show success message
                msg.innerHTML = "Message sent successfully!";
                setTimeout(function () {
                    msg.innerHTML = "";
                }, 5000);

                // Hide the loading spinner, reset the form and enable the submit button
                loadingSpinner.style.display = 'none'; // Hide the spinner
                form.reset();
                form.querySelector('button[type="submit"]').disabled = false; // Enable submit button
            })
            .catch(error => {
                // Show error message
                msg.innerHTML = "Error! Please try again later.";
                setTimeout(function () {
                    msg.innerHTML = "";
                }, 5000);

                // Hide the loading spinner and re-enable the submit button on error
                loadingSpinner.style.display = 'none'; // Hide the spinner
                form.querySelector('button[type="submit"]').disabled = false; // Enable submit button
                console.error('Error!', error.message);
            });
    });
}

