// ----------------------------------------------
//  AOS INIT
// ----------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        duration: 700,
        easing: "ease-in-out",
        once: true,
        offset: 100
    });
});

// ----------------------------------------------
// DOM ELEMENTS
// ----------------------------------------------
const themeToggle = document.getElementById("themeToggle");
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const deviceTiles = document.querySelectorAll(".device-tile, .device-card");
const modal = document.getElementById("projectsModal");
const modalClose = document.getElementById("modalClose");
const modalGrid = document.getElementById("modalGrid");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");


// ----------------------------------------------
// THEME SYSTEM (FIXED)
// ----------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

    // Load saved theme or fallback to dark
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);

    updateThemeIcon(savedTheme);

    themeToggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);

        updateThemeIcon(next);

        // mini rotation effect
        gsap.to(themeToggle, { rotation: 360, duration: 0.5, ease: "power2.out" });
    });
});

// Update theme icon safely
function updateThemeIcon(theme) {
    let icon = themeToggle.querySelector("i");
    if (!icon) {
        icon = document.createElement("i");
        themeToggle.appendChild(icon);
    }
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}


// ----------------------------------------------
// MOBILE NAV
// ----------------------------------------------
if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        navToggle.classList.toggle("active");
    });
}


// ----------------------------------------------
// PROJECT DATA
// ----------------------------------------------
const projectsByDevice = {
    jetson: {
        title: "Jetson Nano Projects",
        subtitle: "High-performance, real-time AI on Jetson Nano (Yolo/TensorRT/DeepStream/ROS).",
        projects: [
            {
                name: "Real-Time Object Detection System",
                desc: "YOLOv5 + TensorRT for 30+ FPS on Jetson Nano.",
                tags: ["YOLOv5", "TensorRT", "CUDA", "Python"],
                github: "#"
            },
            {
                name: "Edge Video Analytics Platform",
                desc: "DeepStream video analytics with tracking & counting.",
                tags: ["DeepStream", "OpenCV", "Python", "MQTT"],
                github: "#"
            },
            {
                name: "Autonomous Navigation Robot",
                desc: "SLAM + DL obstacle avoidance using ROS.",
                tags: ["ROS", "SLAM", "PyTorch", "LiDAR"],
                github: "#"
            },
            {
                name: "AI-Powered Security Camera",
                desc: "Face recognition, motion detection & alerts.",
                tags: ["Face Recognition", "MTCNN", "FastAPI", "Docker"],
                github: "#"
            }
        ]
    },

    raspberry: {
        title: "Raspberry Pi Projects",
        subtitle: "Low-cost scalable edge deployments.",
        projects: [
            {
                name: "Home Surveillance System",
                desc: "Motion + face detection with cloud sync.",
                tags: ["OpenCV", "Motion", "Python", "MQTT"],
                github: "#"
            },
            {
                name: "Face Recognition Door Lock",
                desc: "FaceNet + GPIO hardware lock system.",
                tags: ["FaceNet", "GPIO", "FastAPI", "SQLite"],
                github: "#"
            },
            {
                name: "Smart Retail Shelf Monitoring",
                desc: "Product detection using TFLite.",
                tags: ["TensorFlow Lite", "Camera", "Python", "Quantization"],
                github: "#"
            },
            {
                name: "Environmental Monitor",
                desc: "Sensor data + anomaly detection.",
                tags: ["DHT11", "MQTT", "TinyML", "Python"],
                github: "#"
            },
            {
                name: "Edge Gateway / MQTT Broker",
                desc: "Local data aggregation + buffering.",
                tags: ["Docker", "Mosquitto", "Node-RED", "Linux"],
                github: "#"
            }
        ]
    },

    nano: {
        title: "Nano BLE Sense Projects",
        subtitle: "TinyML inference on embedded hardware.",
        projects: [
            {
                name: "Wake-Word Detector",
                desc: "TF-Lite Micro speech keyword spotting.",
                tags: ["TensorFlow Lite", "Edge Impulse", "Quantization", "C++"],
                github: "#"
            },
            {
                name: "Gesture Recognition",
                desc: "IMU-based gesture classifier.",
                tags: ["IMU", "Edge Impulse", "FFT", "TinyML"],
                github: "#"
            },
            {
                name: "Sound Anomaly Detection",
                desc: "Acoustic anomaly alerts.",
                tags: ["Audio", "TinyML", "MQTT", "C++"],
                github: "#"
            }
        ]
    },

    arduino: {
        title: "Arduino UNO Projects",
        subtitle: "Microcontroller-based edge solutions.",
        projects: [
            {
                name: "Smart Street Light System",
                desc: "Adaptive LED brightness control.",
                tags: ["LDR", "Relay", "C/C++", "Power"],
                github: "#"
            },
            {
                name: "Ultrasonic Obstacle Detection",
                desc: "HC-SR04 safety detection.",
                tags: ["Ultrasonic", "GPIO", "C++", "Embedded"],
                github: "#"
            },
            {
                name: "IoT Weather Station",
                desc: "Temp & humidity to cloud.",
                tags: ["DHT11", "MQTT", "ESP8266", "Sensors"],
                github: "#"
            },
            {
                name: "Sensor Fusion Anomaly Detector",
                desc: "Multi-sensor industrial monitoring.",
                tags: ["IMU", "Gas Sensor", "C++", "MQTT"],
                github: "#"
            }
        ]
    }
};


// ----------------------------------------------
// MODAL HANDLING
// ----------------------------------------------
function openDeviceModal(key) {
    const data = projectsByDevice[key];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDescription.textContent = data.subtitle;
    modalGrid.innerHTML = "";

    data.projects.forEach(proj => {
        const card = document.createElement("div");
        card.className = "project-card fade-in";
        card.innerHTML = `
            <h4>${proj.name}</h4>
            <p>${proj.desc}</p>
            <div class="tag-list">${proj.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
            <a class="github-btn" href="${proj.github}" target="_blank">
                <i class="fab fa-github"></i> View on GitHub
            </a>
        `;
        modalGrid.appendChild(card);
    });

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");

    gsap.fromTo(".modal-content", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" });
    gsap.from(".project-card", { opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: "power2.out" });
}

deviceTiles.forEach(el => {
    el.addEventListener("click", () => {
        const device = el.getAttribute("data-device");
        openDeviceModal(device);
    });
});

modalClose.addEventListener("click", closeModal);
modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
window.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    modalGrid.innerHTML = "";
}


// ----------------------------------------------
// NAVBAR ACTIVE LINK ON SCROLL
// ----------------------------------------------
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
    let current = "";
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (scrollY >= top) current = sec.id;
    });

    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}

window.addEventListener("scroll", updateActiveNav);


// ----------------------------------------------
// LOGO SCROLL TO TOP
// ----------------------------------------------
const logo = document.querySelector(".nav-logo");
logo.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
);


// ----------------------------------------------
console.log("Edge Portfolio (EC) initialized ✅");
