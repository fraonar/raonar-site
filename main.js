document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const sections = document.querySelectorAll('section');
    const currentYearSpan = document.getElementById('current-year');

    // --- Header & Navigation ---
    const header = document.querySelector('.header');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const closeMobileNavButton = document.getElementById('close-mobile-nav');

    // --- Header Typewriter Logo ---
    const headerTypewriterLogoElement = document.getElementById('header-typewriter-logo');
    const headerTypewriterPhrases = ["coding...", "building...", "debugging..."];
    let headerPhraseIndex = 0;
    let headerCharIndex = 0;
    let isHeaderDeleting = false;
    const headerTypingSpeed = 100; // Speed for header text
    const headerDeletingSpeed = 50; // Speed for header text deleting
    const headerPauseBeforeDelete = 1000; // Pause before deleting header text
    const headerPauseBeforeType = 500; // Pause before typing next header text

    // --- Hero Section Typewriter ---
    const typewriterTextElement = document.getElementById('typewriter-text');
    const typewriterPhrases = ["Passionate about Web Dev", "Dedicated to Embedded Systems", "Exploring OS Design", "Building Innovative Solutions"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80; // Faster typing for sleek feel
    const deletingSpeed = 40; // Faster deleting
    const pauseBeforeDelete = 1200; // Shorter pause
    const pauseBeforeType = 400; // Shorter pause

    // --- Time Display ---
    const timeDisplay = document.getElementById('time-display');

    // --- Audio Control ---
    const backgroundAudio = document.getElementById('background-audio');
    const audioToggleButton = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    let isAudioPlaying = false; // Track audio state

    // --- Water Background Effect ---
    const waterCanvas = document.getElementById('water-canvas');
    const ctx = waterCanvas.getContext('2d');
    let rafIdWater; // For requestAnimationFrame for water

    const ripples = [];
    const maxRipples = 15; // Allow more ripples
    const rippleRadiusStart = 0;
    const rippleMaxRadius = 250; // Larger max radius for more impact
    const rippleSpeed = 3; // Faster expansion
    const rippleAlphaDecay = 0.008; // Faster fade out for new ripples, but still visible

    // Set canvas size
    function resizeWaterCanvas() {
        waterCanvas.width = window.innerWidth;
        waterCanvas.height = window.innerHeight;
    }
    resizeWaterCanvas();
    window.addEventListener('resize', resizeWaterCanvas);

    // Main render loop for water effect
    function renderWater() {
        ctx.clearRect(0, 0, waterCanvas.width, waterCanvas.height); // Clear canvas

        for (let i = 0; i < ripples.length; i++) {
            const ripple = ripples[i];
            ripple.radius += rippleSpeed;
            ripple.alpha -= rippleAlphaDecay; // Fade out

            if (ripple.alpha <= 0 || ripple.radius > rippleMaxRadius) {
                ripples.splice(i, 1); // Remove faded ripples
                i--;
                continue;
            }

            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 255, 209, ${ripple.alpha})`; // Use accent color
            ctx.lineWidth = 3; // Thicker lines for more visibility
            ctx.stroke();
        }
        rafIdWater = requestAnimationFrame(renderWater);
    }
    renderWater(); // Start the water animation loop

    // Add new ripple on mouse move
    waterCanvas.addEventListener('mousemove', (e) => {
        if (ripples.length < maxRipples) {
            ripples.push({
                x: e.clientX,
                y: e.clientY,
                radius: rippleRadiusStart,
                alpha: 1
            });
        }
    });

    // --- 3D Cube Logo Setup ---
    let cubeRenderer, cubeScene, cubeCamera, cubeMesh; // Define globally for potential external access/debugging

    function initCube() {
        const canvas = document.getElementById('cubeCanvas');
        if (!canvas) {
            console.error("Cube canvas not found!");
            return;
        }

        const container = canvas.parentElement; // Get the parent container for sizing

        // Renderer
        cubeRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        cubeRenderer.setPixelRatio(window.devicePixelRatio);

        // Scene
        cubeScene = new THREE.Scene();

        // Camera
        // Use container's dimensions for aspect ratio
        cubeCamera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
        cubeCamera.position.set(2, 2, 4);
        cubeScene.add(cubeCamera);

        // Lights
        const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
        hemi.position.set(0, 5, 0);
        cubeScene.add(hemi);

        const dir = new THREE.DirectionalLight(0xffffff, 0.8);
        dir.position.set(5, 10, 7);
        cubeScene.add(dir);

        // Cube creation
        const size = 1;
        const geo = new THREE.BoxGeometry(size, size, size);
        const mats = [];

        // Define colors for cube faces using accent colors
        const colors = [
            new THREE.Color(0x00FFD1), // Accent
            new THREE.Color(0xFF3CAC), // Alt Accent
            new THREE.Color(0x00FFD1).multiplyScalar(0.8),
            new THREE.Color(0xFF3CAC).multiplyScalar(0.8),
            new THREE.Color(0x00FFD1).multiplyScalar(0.6),
            new THREE.Color(0xFF3CAC).multiplyScalar(0.6)
        ];

        for (let i = 0; i < 6; i++) {
            mats.push(new THREE.MeshStandardMaterial({ color: colors[i] }));
        }

        cubeMesh = new THREE.Mesh(geo, mats);
        cubeScene.add(cubeMesh);

        // Animation loop for cube
        function animateCube() {
            requestAnimationFrame(animateCube);
            cubeMesh.rotation.x += 0.005;
            cubeMesh.rotation.y += 0.01;
            cubeRenderer.render(cubeScene, cubeCamera);
        }

        // Handle resizing of the cube canvas
        function resizeCubeCanvas() {
            // Get actual computed dimensions of the canvas element
            const rect = canvas.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            // Crucial: Explicitly set canvas HTML attributes to match CSS size
            canvas.width = w;
            canvas.height = h;

            if (w === 0 || h === 0) {
                console.warn("Cube canvas has zero dimensions. Cannot resize renderer. Current dimensions (getBoundingClientRect):", w, h);
                return;
            }
            cubeRenderer.setSize(w, h);
            cubeCamera.aspect = w / h;
            cubeCamera.updateProjectionMatrix();
        }

        resizeCubeCanvas(); // Initial resize call immediately after renderer creation
        animateCube(); // Start cube animation
        window.addEventListener('resize', resizeCubeCanvas); // Listen for window resize
    }

    // Call initCube after the window has fully loaded to ensure canvas dimensions are ready
    window.addEventListener('load', () => {
        if (window.THREE) {
            initCube();
        } else {
            console.error("THREE.js not loaded, cannot initialize cube.");
        }
    });


    // --- Initializations (Other parts of the site) ---
    updateCurrentYear();
    updateTimeDisplay();
    setInterval(updateTimeDisplay, 1000); // Update time every second
    typeWriterEffect(); // Start hero typewriter animation
    headerTypeWriterEffect(); // Start header typewriter animation

    // --- Event Listeners ---

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            // Update active class for desktop nav
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Mobile nav toggle
    hamburgerMenu.addEventListener('click', () => {
        mobileNavOverlay.classList.add('active');
        hamburgerMenu.classList.add('active'); // Animate hamburger to X
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    closeMobileNavButton.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
        hamburgerMenu.classList.remove('active'); // Animate X back to hamburger
        document.body.style.overflow = ''; // Restore scrolling
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            closeMobileNav(); // Close mobile menu after clicking a link
        });
    });

    function closeMobileNav() {
        mobileNavOverlay.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Audio toggle for background music
    audioToggleButton.addEventListener('click', () => {
        if (backgroundAudio.paused) {
            backgroundAudio.play().then(() => {
                isAudioPlaying = true;
                audioIcon.classList.remove('fa-volume-mute');
                audioIcon.classList.add('fa-volume-up');
                audioToggleButton.title = 'Mute Background Music';
            }).catch(error => {
                console.error("Audio playback failed:", error);
                // Inform user if autoplay is blocked (e.g., if audio isn't user-initiated)
                // Removed formStatus reference as form is removed.
                // You might want a small, temporary message box here if needed.
            });
        } else {
            backgroundAudio.pause();
            isAudioPlaying = false;
            audioIcon.classList.remove('fa-volume-up');
            audioIcon.classList.add('fa-volume-mute');
            audioToggleButton.title = 'Play Background Music';
        }
    });

    // --- Functions ---

    // Update current year in footer
    function updateCurrentYear() {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Update time display
    function updateTimeDisplay() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Typewriter effect for hero subtitle
    function typeWriterEffect() {
        const currentPhrase = typewriterPhrases[phraseIndex];
        if (isDeleting) {
            // Delete characters
            typewriterTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
                setTimeout(typeWriterEffect, pauseBeforeType);
            } else {
                setTimeout(typeWriterEffect, deletingSpeed);
            }
        } else {
            // Type characters
            typewriterTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(typeWriterEffect, pauseBeforeDelete);
            } else {
                setTimeout(typeWriterEffect, typingSpeed);
            }
        }
    }

    // Typewriter effect for header logo
    function headerTypeWriterEffect() {
        const currentPhrase = headerTypewriterPhrases[headerPhraseIndex];
        if (isHeaderDeleting) {
            // Delete characters
            headerTypewriterLogoElement.textContent = currentPhrase.substring(0, headerCharIndex - 1);
            headerCharIndex--;
            if (headerCharIndex === 0) {
                isHeaderDeleting = false;
                headerPhraseIndex = (headerPhraseIndex + 1) % headerTypewriterPhrases.length;
                setTimeout(headerTypeWriterEffect, headerPauseBeforeType);
            } else {
                setTimeout(headerTypeWriterEffect, headerDeletingSpeed);
            }
        } else {
            // Type characters
            headerTypewriterLogoElement.textContent = currentPhrase.substring(0, headerCharIndex + 1);
            headerCharIndex++;
            if (headerCharIndex === currentPhrase.length) {
                isHeaderDeleting = true;
                setTimeout(headerTypeWriterEffect, headerPauseBeforeDelete);
            } else {
                setTimeout(headerTypeWriterEffect, headerTypingSpeed);
            }
        }
    }


    // Intersection Observer for Scroll Reveal Animations
    const scrollRevealOptions = {
        threshold: 0.1, // Element is 10% visible
        rootMargin: '0px 0px -80px 0px' // Start animation a bit earlier
    };

    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply active class to trigger animation
                entry.target.classList.add('active');

                // If it's a scroll-reveal-item, apply staggered delay
                if (entry.target.classList.contains('scroll-reveal-item')) {
                    const delay = parseFloat(entry.target.dataset.scrollDelay || 0);
                    entry.target.style.transitionDelay = `${delay}s`;
                }
                // observer.unobserve(entry.target); // Uncomment to animate only once
            } else {
                // entry.target.classList.remove('active'); // Uncomment to re-trigger animation on scroll back up
                // Reset transition delay when out of view
                if (entry.target.classList.contains('scroll-reveal-item')) {
                    entry.target.style.transitionDelay = '0s';
                }
            }
        });
    }, scrollRevealOptions);

    // Observe sections and individual items
    sections.forEach(section => {
        scrollRevealObserver.observe(section);
    });
    document.querySelectorAll('.scroll-reveal-item').forEach(item => {
        scrollRevealObserver.observe(item);
    });

    // Removed Contact Form Validation as the form is removed.
});
