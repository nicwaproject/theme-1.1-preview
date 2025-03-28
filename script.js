document.addEventListener("DOMContentLoaded", function() {
    // Function to get URL parameters
    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Set couple names from URL parameter or use default
    const coupleNames = getQueryParameter('couple');
    document.getElementById('coupleNames').textContent = coupleNames || 'Imam & Ainun'; // Default names

    // Set guest name from URL parameter or use default
    const guestName = getQueryParameter('guest');
    document.getElementById('guestName').textContent = guestName || 'Guest';

    //Lottie Files
    lottie.loadAnimation({
        container: document.getElementById("lottie-animation"), // Target elemen
        renderer: "svg", // Bisa juga "canvas" atau "html"
        loop: true, // Animasi akan terus berulang
        autoplay: true, // Mulai otomatis
        path: "snow2.json" // Ganti dengan path file Lottie kamu
    });

    lottie.loadAnimation({
        container: document.getElementById("birds-animation"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "birds.json" // Ganti dengan path file JSON animasi burung kamu
    });

    lottie.loadAnimation({
        container: document.getElementById("dot-animation"), // Target elemen
        renderer: "svg", // Bisa juga "canvas" atau "html"
        loop: true, // Animasi akan terus berulang
        autoplay: true, // Mulai otomatis
        path: "white-dot.json" // Ganti dengan path file Lottie kamu
    });

    // Variables for the invitation and music
    const openButton = document.getElementById('openButton');
    const invitationCover = document.getElementById('invitationCover');
    const invitationContent = document.getElementById('invitationContent');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playPauseButton = document.getElementById('playPauseButton');
    const audioControls = document.querySelector('.audio-controls');
    
    // Get the modal
    var modal1 = document.getElementById("myModal");

    // Get the modal content and caption
    var modalImg1 = document.getElementById("img01");
    var captionText1 = document.getElementById("caption");

    // Get navigation buttons
    var prevModalBtn1 = document.querySelector(".prev");
    var nextModalBtn1 = document.querySelector(".next");

    var images1 = document.querySelectorAll(".gallery img");
    var currentIndex1 = 0;

    // Function to open modal with specific image
    function openModal1(index1) {
        modal1.style.display = "block";
        modalImg1.src = images1[index1].src;
        captionText1.innerHTML = images1[index1].alt;
        currentIndex1 = index1;
    }

    // Loop through images and add click event
    images1.forEach((img1, index1) => {
        img1.onclick = function() {
            openModal1(index1);
        };
    });

    // Function to show next image
    nextModalBtn1.onclick = function() {
        currentIndex1 = (currentIndex1 + 1) % images1.length; // Loop back to first image
        openModal1(currentIndex1);
    };

    // Function to show previous image
    prevModalBtn1.onclick = function() {
        currentIndex1 = (currentIndex1 - 1 + images1.length) % images1.length; // Loop to last image
        openModal1(currentIndex1);
    };

    // Close modal when clicking the close button
    document.querySelector(".close").onclick = function() {
        modal1.style.display = "none";
    };

    // Event listener to open the invitation and start music
    openButton.addEventListener('click', function() {
        invitationCover.style.display = 'none';
        invitationContent.style.display = 'flex';
        audioControls.style.display = 'block'; // Show the audio controls
        togglePlayPause();
    });

    // Function to toggle play/pause for the music
    let isPlaying = false;

    function togglePlayPause() {
        if (isPlaying) {
            backgroundMusic.pause();
        } else {
            backgroundMusic.play();
        }
        isPlaying = !isPlaying;
        playPauseButton.src = isPlaying ? 'pause.png' : 'play.png'; // Change this to the path of your play and pause button images
    }

    // Event listener for the play/pause button
    playPauseButton.addEventListener('click', togglePlayPause);

    // Countdown Timer
    function calculateCountdown() {
        const weddingDate = new Date('2024-09-25T09:30:00'); // Set your wedding date and time here (e.g., 3:00 PM)
        const currentDate = new Date();
        let timeRemaining = weddingDate - currentDate;

        if (timeRemaining <= 0) {
            clearInterval(intervalId);
            timeRemaining = 0;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

    const intervalId = setInterval(calculateCountdown, 1000);
    calculateCountdown();


    // Function to copy account details
    function copyAccountDetails(event) {
        const button = event.target; // Get the clicked button
        const accountDetails = button.previousElementSibling.innerText; // Get the account number
        navigator.clipboard.writeText(accountDetails)
            .then(() => {
                alert('Account details copied!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }

    // Attach event listener to all copy buttons
    const copyButtons = document.querySelectorAll('.copyButton');
    copyButtons.forEach(button => {
        button.addEventListener('click', copyAccountDetails);
    });


    // function to show animation 
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elements = document.querySelectorAll('.fade-in, .fade-slide');
    elements.forEach(element => {
        observer.observe(element);
    });


    // messages handler
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('formGuestName').value;
            const message = document.getElementById('guestMessage').value;

            fetch('https://theme-1-message-handler.glitch.me/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, message })
            })
            .then(response => response.json())
            .then(data => {
                loadMessages();
                messageForm.reset();
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Function to load messages
function loadMessages() {
    fetch('https://theme-1-message-handler.glitch.me/messages')
        .then(response => response.json())
        .then(data => {
            const messageList = document.getElementById('messageList');
            if (messageList) {
                messageList.innerHTML = '';
                data.forEach(msg => {
                    const messageItem = document.createElement('div');
                    messageItem.classList.add('message'); // Add 'message' class

                    // Font Awesome Icon
                    const iconElement = document.createElement('i');
                    iconElement.classList.add('fas', 'fa-user-circle', 'message-icon');

                    // Element for the author
                    const authorElement = document.createElement('div');
                    authorElement.classList.add('message-author');
                    authorElement.appendChild(iconElement); // Append icon before name
                    authorElement.appendChild(document.createTextNode(` ${msg.name}`));

                    // Element for the content
                    const contentElement = document.createElement('div');
                    contentElement.classList.add('message-content');
                    contentElement.textContent = msg.message;

                    // Element to contain both the author and the content
                    const bodyElement = document.createElement('div');
                    bodyElement.classList.add('message-body');
                    bodyElement.appendChild(authorElement);
                    bodyElement.appendChild(contentElement);

                    // Append the bodyElement to the messageItem
                    messageItem.appendChild(bodyElement);

                    // Append the messageItem to the messageList
                    messageList.appendChild(messageItem);
                });
            }
        })
        .catch(error => console.error('Error:', error));
}


    window.onload = loadMessages;
});
