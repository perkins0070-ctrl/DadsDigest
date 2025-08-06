// Birthday and date utilities
const BIRTHDAY = new Date('1969-08-07T00:00:00');
const TODAY = new Date();

// Golf facts array
const GOLF_FACTS = [
    "The longest golf drive ever recorded was 515 yards by Mike Austin in 1974!",
    "Golf balls have between 300-500 dimples on their surface for optimal aerodynamics.",
    "The word 'golf' comes from the Scottish word 'gouf' meaning 'to strike'.",
    "A regulation golf hole is 4.25 inches in diameter and at least 4 inches deep.",
    "The oldest golf course still in use today is The Old Links at Musselburgh Racecourse in Scotland, dating back to 1672.",
    "Tiger Woods was the youngest Masters winner at age 21 in 1997.",
    "The fastest recorded golf ball speed is 217.1 mph.",
    "St. Andrews Golf Course in Scotland is known as 'The Home of Golf'.",
    "A 'birdie' gets its name from the American slang 'bird' meaning something excellent.",
    "The green jacket awarded to Masters winners has been a tradition since 1949."
];

// 1969 facts array
const YEAR_1969_FACTS = [
    "Apollo 11 landed on the moon on July 20, 1969 - just weeks before Dad was born!",
    "Woodstock Music Festival took place in August 1969, the same month Dad was born!",
    "The first episode of Scooby-Doo aired in 1969.",
    "The Beatles released 'Abbey Road' in 1969, their final studio album.",
    "ARPANET, the precursor to the internet, was established in 1969.",
    "The first ATM in the United States was installed in 1969.",
    "Sesame Street premiered on PBS in November 1969.",
    "The Concorde supersonic jet made its first flight in 1969.",
    "The movie 'Easy Rider' starring Dennis Hopper was released in 1969.",
    "The New York Mets won their first World Series in 1969, earning the nickname 'Miracle Mets'."
];

// Dad jokes array
const DAD_JOKES = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "I invented a new word: Plagiarism!",
    "Why did the golfer wear two pairs of pants? In case he got a hole in one!",
    "What do you call a fake noodle? An impasta!",
    "Why don't eggs tell jokes? They'd crack each other up!",
    "I used to hate facial hair, but then it grew on me.",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why can't a bicycle stand up by itself? It's two tired!",
    "What did the ocean say to the beach? Nothing, it just waved!",
    "Why did the coffee file a police report? It got mugged!",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
    "Why don't scientists trust stairs? Because they're always up to something!",
    "What do you call a dinosaur that crashes his car? Tyrannosaurus Wrecks!",
    "I'm reading a book about anti-gravity. It's impossible to put down!"
];

// DOM elements
const currentDateElement = document.getElementById('current-date');
const yearsLivedElement = document.getElementById('years-lived');
const daysLivedElement = document.getElementById('days-lived');
const hoursLivedElement = document.getElementById('hours-lived');
const minutesLivedElement = document.getElementById('minutes-lived');
const factDisplayElement = document.getElementById('fact-display');
const golfFactsBtn = document.getElementById('golf-facts-btn');
const year1969Btn = document.getElementById('year-1969-btn');
const dadJokesBtn = document.getElementById('dad-jokes-btn');

// Utility functions
function formatNumber(num) {
    return num.toLocaleString();
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function updateCurrentDate() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    currentDateElement.textContent = now.toLocaleDateString('en-US', options);
}

function calculateTimeMetrics() {
    const now = new Date();
    const timeDiff = now - BIRTHDAY;
    
    // Calculate different time units
    const years = Math.floor(timeDiff / (365.25 * 24 * 60 * 60 * 1000));
    const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
    const hours = Math.floor(timeDiff / (60 * 60 * 1000));
    const minutes = Math.floor(timeDiff / (60 * 1000));
    
    return { years, days, hours, minutes };
}

function updateMetrics() {
    const metrics = calculateTimeMetrics();
    
    // Animate the numbers
    animateNumber(yearsLivedElement, metrics.years);
    animateNumber(daysLivedElement, metrics.days);
    animateNumber(hoursLivedElement, metrics.hours);
    animateNumber(minutesLivedElement, metrics.minutes);
}

function animateNumber(element, targetNumber) {
    const currentNumber = parseInt(element.textContent.replace(/,/g, '')) || 0;
    const increment = Math.ceil((targetNumber - currentNumber) / 50);
    
    if (currentNumber < targetNumber) {
        element.textContent = formatNumber(currentNumber + increment);
        setTimeout(() => animateNumber(element, targetNumber), 20);
    } else {
        element.textContent = formatNumber(targetNumber);
    }
}

function displayFact(fact, category) {
    factDisplayElement.classList.remove('active');
    
    setTimeout(() => {
        factDisplayElement.innerHTML = `
            <div class="fact-content">
                <div class="fact-category">${category}</div>
                <div class="fact-text">${fact}</div>
            </div>
        `;
        factDisplayElement.classList.add('active', 'fade-in');
    }, 150);
}

// Button event handlers
function showGolfFact() {
    const fact = getRandomItem(GOLF_FACTS);
    displayFact(fact, "⛳ Golf Fact");
    
    // Add visual feedback to button
    golfFactsBtn.classList.add('pulse');
    setTimeout(() => golfFactsBtn.classList.remove('pulse'), 600);
}

function show1969Fact() {
    const fact = getRandomItem(YEAR_1969_FACTS);
    displayFact(fact, "📅 1969 Fact");
    
    // Add visual feedback to button
    year1969Btn.classList.add('pulse');
    setTimeout(() => year1969Btn.classList.remove('pulse'), 600);
}

function showDadJoke() {
    const joke = getRandomItem(DAD_JOKES);
    displayFact(joke, "😂 Dad Joke");
    
    // Add visual feedback to button
    dadJokesBtn.classList.add('pulse');
    setTimeout(() => dadJokesBtn.classList.remove('pulse'), 600);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    updateCurrentDate();
    updateMetrics();
    
    // Update metrics every minute
    setInterval(updateMetrics, 60000);
    
    // Update date every minute
    setInterval(updateCurrentDate, 60000);
    
    // Button event listeners
    golfFactsBtn.addEventListener('click', showGolfFact);
    year1969Btn.addEventListener('click', show1969Fact);
    dadJokesBtn.addEventListener('click', showDadJoke);
    
    // Add smooth scrolling for better navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Add some birthday-specific functionality
function isBirthdayToday() {
    const today = new Date();
    return today.getMonth() === BIRTHDAY.getMonth() && today.getDate() === BIRTHDAY.getDate();
}

function addBirthdayEffects() {
    if (isBirthdayToday()) {
        // Add special birthday effects if it's actually his birthday
        document.body.classList.add('birthday-today');
        
        // Create confetti effect or special styling
        const style = document.createElement('style');
        style.textContent = `
            .birthday-today .hero-section {
                animation: birthday-glow 2s infinite alternate;
            }
            
            @keyframes birthday-glow {
                from {
                    box-shadow: 0 0 20px rgba(0, 122, 255, 0.3);
                }
                to {
                    box-shadow: 0 0 40px rgba(0, 122, 255, 0.6);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize birthday effects
document.addEventListener('DOMContentLoaded', addBirthdayEffects);

// Weather functionality
async function fetchWeatherData() {
    try {
        // Using wttr.in API for Miller Place, NY (free, no API key required)
        const response = await fetch('https://wttr.in/Miller%20Place,NY?format=j1');
        
        if (!response.ok) {
            throw new Error('Weather API not available');
        }
        
        const data = await response.json();
        const current = data.current_condition[0];
        const weatherData = {
            main: {
                temp: Math.round((parseInt(current.temp_F))),
                feels_like: Math.round((parseInt(current.FeelsLikeF))),
                humidity: parseInt(current.humidity)
            },
            weather: [{
                main: current.weatherDesc[0].value,
                description: current.weatherDesc[0].value.toLowerCase()
            }]
        };
        updateWeatherDisplay(weatherData);
    } catch (error) {
        // If weather API fails, show current realistic weather for Long Island in August
        const mockWeatherData = {
            main: {
                temp: 78,
                feels_like: 82,
                humidity: 68
            },
            weather: [{
                main: 'Partly Cloudy',
                description: 'partly cloudy'
            }]
        };
        updateWeatherDisplay(mockWeatherData);
    }
}

function updateWeatherDisplay(data) {
    document.getElementById('weather-temp').textContent = `${Math.round(data.main.temp)}°F`;
    document.getElementById('weather-desc').textContent = data.weather[0].description;
    document.getElementById('weather-feels').textContent = `${Math.round(data.main.feels_like)}°F`;
    document.getElementById('weather-humidity').textContent = `${data.main.humidity}%`;
}

// Initialize weather on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchWeatherData();
    // Update weather every 10 minutes
    setInterval(fetchWeatherData, 600000);
});

// Add CSS for fact display styling
const factStyles = document.createElement('style');
factStyles.textContent = `
    .fact-content {
        text-align: center;
    }
    
    .fact-category {
        font-size: 1.2rem;
        color: #007AFF;
        font-weight: bold;
        margin-bottom: 15px;
    }
    
    .fact-text {
        font-size: 1.1rem;
        line-height: 1.6;
        color: #ffffff;
    }
`;
document.head.appendChild(factStyles);
