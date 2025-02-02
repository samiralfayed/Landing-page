document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript Loaded");
    renderAnalytics();
});

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(user => alert("User signed up successfully!"))
        .catch(error => alert(error.message));
}

function logIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(user => alert("User logged in!"))
        .catch(error => alert(error.message));
}

function logOut() {
    auth.signOut().then(() => alert("User logged out!"));
}

const stripe = Stripe("your-stripe-public-key");
document.getElementById("checkout-button").addEventListener("click", async () => {
    const response = await fetch("/create-checkout-session", { method: "POST" });
    const session = await response.json();
    stripe.redirectToCheckout({ sessionId: session.id });
});

function renderAnalytics() {
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    const analyticsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Transactions ($)',
                data: [1200, 1900, 3000, 5000, 2500, 4500],
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
