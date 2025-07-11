document.addEventListener('DOMContentLoaded', () => {
    // Set body overflow hidden initially for the terminal screen
    document.body.style.overflow = 'hidden';

    // --- Terminal Boot Sequence Elements ---
    const terminalContent = document.getElementById('terminal-content');
    const countdownElement = document.getElementById('countdown');
    const terminalScreen = document.getElementById('terminal');
    const mainPortfolioContent = document.getElementById('main-content');

    const bootMessages = [
        "Checking hardware... OK",
        "Memory test... 16384MB OK",
        "CPU initialization... OK",
        "Storage devices detected... 2",
        "Network interface up... 192.168.1.100",
        "Loading system libraries...",
        "Starting daemons...",
        "System time synchronized",
        "Security protocols enabled",
        "User session starting..."
    ];

    let bootMessageIndex = 0;
    let countdown = 3;

    // Function to display boot messages sequentially
    function displayBootMessage() {
        if (bootMessageIndex < bootMessages.length) {
            const p = document.createElement('p');
            p.textContent = `> ${bootMessages[bootMessageIndex]}`;
            terminalContent.appendChild(p);
            terminalContent.scrollTop = terminalContent.scrollHeight; // Scroll to bottom
            bootMessageIndex++;
            setTimeout(displayBootMessage, 300); // Delay for next message
        } else {
            // All boot messages displayed, start countdown
            const p = document.createElement('p');
            p.innerHTML = `> System ready in <span id="countdown">3</span>...`;
            terminalContent.appendChild(p);
            countdownElement.textContent = countdown; // Initialize countdown display
            terminalContent.scrollTop = terminalContent.scrollHeight; // Scroll to bottom
            const finalP = terminalContent.querySelector('p:last-child');
            if (finalP) {
                finalP.classList.remove('hidden'); // Make the countdown visible
            }
            startCountdown();
        }
    }

    // Function to handle countdown before revealing main content
    function startCountdown() {
        const countdownInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                fadeTerminalOut();
            }
        }, 1000);
    }

    // Function to fade out terminal and reveal main content
    function fadeTerminalOut() {
        terminalScreen.style.opacity = '0';
        terminalScreen.style.transition = 'opacity 1s ease-out';
        setTimeout(() => {
            terminalScreen.style.display = 'none';
            mainPortfolioContent.classList.remove('hidden');
            mainPortfolioContent.style.opacity = '0';
            setTimeout(() => {
                mainPortfolioContent.style.opacity = '1';
                mainPortfolioContent.style.transition = 'opacity 1s ease-in';
                document.body.style.overflow = ''; // Allow scrolling again
                initializeMainPortfolio(); // Initialize main portfolio elements
            }, 50); // Small delay to ensure display:none is applied before transition
        }, 1000); // Match transition duration
    }

    // Start the boot sequence when the page loads
    displayBootMessage();

    // --- Typewriter effect for hero subtitle ---
    const typewriterTextElement = document.getElementById('typewriter-text');
    const phrases = [
        "coding... building... debugging...",
        "crafting digital experiences.",
        "innovating with purpose."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // milliseconds per character

    function typeWriterEffect() {
        const currentPhrase = phrases[phraseIndex];
        let displayText = '';

        if (isDeleting) {
            displayText = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        typewriterTextElement.textContent = displayText;

        let currentTypingSpeed = typingSpeed;
        if (isDeleting) {
            currentTypingSpeed /= 2; // Faster deletion
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            currentTypingSpeed = 1500; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            currentTypingSpeed = 500; // Pause before typing new phrase
        }

        setTimeout(typeWriterEffect, currentTypingSpeed);
    }

    // --- Typewriter effect for header logo ---
    const headerTypewriterLogoElement = document.getElementById('header-typewriter-logo');
    const logoText = "RAONAR OS";
    let logoCharIndex = 0;
    let headerTypingSpeed = 150;

    function headerTypeWriterEffect() {
        if (logoCharIndex < logoText.length) {
            headerTypewriterLogoElement.textContent += logoText.charAt(logoCharIndex);
            logoCharIndex++;
            setTimeout(headerTypeWriterEffect, headerTypingSpeed);
        }
    }

    // --- Dynamic Time Display ---
    function updateTimeDisplay() {
        const timeDisplay = document.getElementById('time-display');
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const formattedTime = now.toLocaleTimeString('en-US', options);
        timeDisplay.textContent = formattedTime;
    }

    // --- Update Current Year for Footer ---
    function updateCurrentYear() {
        const currentYearElement = document.getElementById('current-year');
        currentYearElement.textContent = new Date().getFullYear();
    }

    // --- Hamburger Menu Functionality ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const closeMobileNav = document.getElementById('close-mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    hamburgerMenu.addEventListener('click', () => {
        mobileNavOverlay.classList.add('open');
    });

    closeMobileNav.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('open');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('open');
        });
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a.nav-link[href^="#"], a.mobile-nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Update active state for desktop nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // --- Water-like Background Effect ---
    const waterCanvas = document.getElementById('water-canvas');
    const waterCtx = waterCanvas.getContext('2d');
    let waterWidth, waterHeight;
    const waterParticles = [];
    const numWaterParticles = 200; // Increased for more density
    const waterParticleSize = 2;
    const waterParticleSpeed = 0.5;

    function resizeWaterCanvas() {
        waterWidth = window.innerWidth;
        waterHeight = document.body.scrollHeight; // Make canvas height match total scrollable height
        waterCanvas.width = waterWidth;
        waterCanvas.height = waterHeight;
    }

    function createWaterParticles() {
        waterParticles.length = 0; // Clear existing particles
        for (let i = 0; i < numWaterParticles; i++) {
            waterParticles.push({
                x: Math.random() * waterWidth,
                y: Math.random() * waterHeight,
                speedX: (Math.random() - 0.5) * waterParticleSpeed,
                speedY: (Math.random() - 0.5) * waterParticleSpeed,
                radius: Math.random() * waterParticleSize + 1,
                color: `rgba(0, 255, 209, ${0.1 + Math.random() * 0.4})` // Varying opacity
            });
        }
    }

    function updateWaterParticles() {
        waterCtx.clearRect(0, 0, waterWidth, waterHeight);
        waterCtx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Subtle fade effect
        waterCtx.fillRect(0, 0, waterWidth, waterHeight);

        for (let i = 0; i < numWaterParticles; i++) {
            const p = waterParticles[i];

            p.x += p.speedX;
            p.y += p.speedY;

            // Bounce off edges
            if (p.x < 0 || p.x > waterWidth) p.speedX *= -1;
            if (p.y < 0 || p.y > waterHeight) p.speedY *= -1;

            // Draw particle
            waterCtx.beginPath();
            waterCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            waterCtx.fillStyle = p.color;
            waterCtx.shadowColor = p.color;
            waterCtx.shadowBlur = p.radius * 2; // Glow effect
            waterCtx.fill();
        }
    }

    function renderWater() {
        updateWaterParticles();
        requestAnimationFrame(renderWater);
    }

    // --- Scroll Reveal Animation ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const scrollRevealOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const scrollRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                // For sections, update active nav link
                if (entry.target.tagName === 'SECTION') {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            } else {
                entry.target.classList.remove('reveal'); // Optional: reset on scroll out
            }
        });
    }, scrollRevealOptions);

    // --- Audio Control ---
    const backgroundAudio = document.getElementById('background-audio');
    const audioToggleButton = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    let isAudioPlaying = false; // Track audio state

    // --- Robot Head JavaScript (Integrated) ---
    const robotHead = document.getElementById('robot-head');
    const leftEye = document.getElementById('left-eye');
    const rightEye = document.getElementById('right-eye');
    const leftPupil = leftEye ? leftEye.querySelector('.pupil') : null; // Add null check
    const rightPupil = rightEye ? rightEye.querySelector('.pupil') : null; // Add null check

    function movePupil(eyeElement, pupilElement, mouseX, mouseY) {
        if (!eyeElement || !pupilElement) return; // Ensure elements exist

        const eyeRect = eyeElement.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);

        const maxPupilMoveDistance = (eyeRect.width / 2) - (pupilElement.offsetWidth / 2) - 2;

        const pupilX = maxPupilMoveDistance * Math.cos(angle);
        const pupilY = maxPupilMoveDistance * Math.sin(angle);

        pupilElement.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    }

    document.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        movePupil(leftEye, leftPupil, mouseX, mouseY);
        movePupil(rightEye, rightPupil, mouseX, mouseY);

        if (robotHead) {
            const headRect = robotHead.getBoundingClientRect();
            const headCenterX = headRect.left + headRect.width / 2;
            const headCenterY = headRect.top + headRect.height / 2;

            const diffX = mouseX - headCenterX;
            const diffY = mouseY - headCenterY;

            robotHead.style.transform = `translate(${diffX / 20}px, ${diffY / 20}px)`;
        }
    });

    document.addEventListener('mouseleave', () => {
        if (robotHead) {
            robotHead.style.transform = `translate(0px, 0px)`;
        }
        if (leftPupil) {
            leftPupil.style.transform = `translate(0px, 0px)`;
        }
        if (rightPupil) {
            rightPupil.style.transform = `translate(0px, 0px)`;
        }
    });

    // Removed the line that hides the cursor: document.body.style.cursor = 'none';


    // --- Main Initialization Function ---
    function initializeMainPortfolio() {
        audioToggleButton.addEventListener('click', () => {
            if (!isAudioPlaying) {
                backgroundAudio.play().then(() => {
                    isAudioPlaying = true;
                    audioIcon.classList.remove('fa-volume-mute');
                    audioIcon.classList.add('fa-volume-up');
                    audioToggleButton.title = 'Mute Background Music';
                }).catch(error => {
                    console.error("Audio playback failed:", error);
                });
            } else {
                backgroundAudio.pause();
                isAudioPlaying = false;
                audioIcon.classList.remove('fa-volume-up');
                audioIcon.classList.add('fa-volume-mute');
                audioToggleButton.title = 'Play Background Music';
            }
        });

        // --- Initializations for Main Portfolio ---
        updateCurrentYear();
        updateTimeDisplay();
        setInterval(updateTimeDisplay, 1000);
        typeWriterEffect();
        headerTypeWriterEffect();

        // Initialize water canvas
        resizeWaterCanvas();
        createWaterParticles(); // Initialize particles
        renderWater(); // Start water effect for main portfolio

        // Note: The initCube() call is removed here as the 3D cube is replaced.
        // if (window.THREE) { // Ensure THREE.js is loaded
        //     initCube();
        // } else {
        //     console.error("THREE.js not loaded, cannot initialize cube.");
        // }

        // Observe sections and individual items for scroll reveal
        sections.forEach(section => {
            scrollRevealObserver.observe(section);
        });
        document.querySelectorAll('.scroll-reveal-item').forEach(item => {
            scrollRevealObserver.observe(item);
        });

        // Re-calculate water canvas height on window resize and also update particles
        window.addEventListener('resize', () => {
            resizeWaterCanvas();
            createWaterParticles(); // Recreate particles for new dimensions
        });
    }
});
