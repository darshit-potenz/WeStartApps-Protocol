var messageContainers = document.querySelectorAll(".messages-container");
var typingIndicators = document.querySelectorAll(".typing");
var messageTone = document.getElementById("messageTone");
// Array of arrays of messages
var messagesArrays = [
    ["So you found us.",
        "Congrats!",
        "Welcome to the end of your nightmares.",
        "Unfortunately, 90% of our clients come to us for fixes!",
        "Well, ok, so who are we?",
        "weStartapps is an unlimited design subscription agency.",
        "Basically, we offer you unlimited design requests and revisions for a flat monthly fee.",
        "You make as many design requests as you want and we complete them one by one, within 2-3 business days on average.",
        "No wasting time finding an unreliable freelancer.",
        "Just instant access to stunning designs."],
    [
        "Lucky you, we have just 1 spot remaining.",
        "Scroll to the right to see exactly what we do."
    ],
    [
        "We know, it’s pretty phat!",
        "How can you get in? Stupid easy!",
        "Once you subscribe, you’ll get invited to connect with one of our top designers in a private Slack channel.",
        "Get to make friends, then boom! you’re ready!",
        "Start making your design requests.",
        "After a couple of days, time to enjoy! You’ll get a notification to come and review the work!",
        "We know you’ll love it! If you want changes, no worries!",
        "We’ll revise it until you think it’s juuust right!",
        "Once you’re happy, we’re ready for your next request."
    ],
    [
        "What all we design?",
        "Thought you’d never ask!",
        "Although we can do anything... really! We tend to love these:",
        "Logos",
        "Brand Guides",
        "Visual Identities",
        "Web and mobile apps",
        "Design systems",
        "High-converting landing pages and so much more..."
    ],
    [
        "What’s the cost?",
        "Simple. $6,995 a month.",
        "Yeah yeah yeah, I’m sure Lucie the designer who’s been at it for the past 4 years can do it for much less!",
        "The thing is, we’ve been at this since 1996.",
        "Different ball game.",
        "We know what it takes to make great designs.",
        "Not just eye candy, but brand aware, smart, utilitarian and user centric designs.",
        "The cheapest options is always costly in the end.",
        "When it goes wrong—and it will—you are left with a design which not only looks janky, but doesn't get you the results you wanted.",
        "So what’s your next move?",
        "You hire us and join the 90% who wish they found us earlier."
    ],
    [
        "You are not alone?",
        "No worries. Bring your entire team on board.",
        "We communicate through slack and manage all requests and tasks through Trello.",
        "So we’ll never stick you with annoying calls!",
        "In fact, we won’t even annoy you with contracts either!",
        "You can pause or cancel anytime."
    ],
    [
        "Oh here are our plans 😉"
    ],
    [
        "28 years of doing this, surely we have a ton of fans!",
        "Check out how they rave about us.",
        "Jazze Reppert (Spartan Radar), your two cents?"
    ],
    [
        "You guys are snipers!!!"
    ],
    [
        "Aaaw! We’ll take it!",
        "Kaseem Penn (Fun Comp), share your feelings pls..."
    ],
    [
        "I was initially skeptical of Design-as-a-subscription , but working with Westartapps was an absolute dream.",
        "They nailed pretty much everything from social assets to an entire UX redesign first time, with no revisions needed.",
        "I was extremely impressed with both the quantity and quality of work that was completed."
    ],
    [
        "Good enough for us!",
        "One more?",
        "Tara Baten (John Lewis Foundation), drop some knowledge!"
    ],
    [
        "Absolutely amazing to work with so far."
    ],
    [
        "Umm, if you had time, we’d bug all 100+ of our friends.",
        "Folks like Jayesh Dave (Ripple IT), Judge Elizabeth Ray (Yes, an actual judge yo!), Terrance Bey (Exec at Google), Sibyl Caldwell (Tuskegee University), even contacts at NASA and more.",
        "Yeah, 28 years... and counting!",
        "Instead, let’s focus on you!",
        "Pick a plan above, let’s rock n’ roll!",
    ],
    [
        "We’re no psychics, but...",
        "Here are answers to a few questions we’ve heard before:",
        "Or you could always hit us up.",
        "Click or tap here, let’s chat!"
    ],
    [
        "Take your time, it’s a first date!",
        "Scroll back up, review our plans and subscribe!",
        "There’s no scenario where you regret it, nobody has in 28years.",
        "See you in Slack?"
    ]
];

// Function to add a message
function addMessage(container, message, callback) {
    // Create a new message element
    var newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.textContent = message;

    // Append the new message to the container
    container.appendChild(newMessage);

    // Trigger the animation and play the tone
    setTimeout(function () {
        newMessage.style.opacity = "1";
        newMessage.style.transform = "translateY(0)";
        playMessageTone();

        // Call the callback function when animation is complete
        if (typeof callback === 'function') {
            callback();
        }

        // Auto-scroll the entire page to the bottom
        window.scrollTo(0, document.body.scrollHeight);
    }, 100);
}

// Function to play the message tone
function playMessageTone() {
    messageTone.currentTime = 0; // Reset audio to start
    messageTone.play().catch(function (error) {
        // Handle error, if any
        console.error('Error playing audio:', error);
    });
}


// Function to toggle typing indicator and frame
function toggleTypingIndicatorAndFrame(containerIndex, show) {
    for (var i = 0; i < typingIndicators.length; i++) {
        typingIndicators[i].style.display = i === containerIndex && show ? "block" : "none";
    }

    // Show frame when typing indicator is hidden
    var frameId = "#framer" + (containerIndex + 1); // Assuming framer IDs follow the pattern #framer1, #framer2, ...
    var frameElement = document.querySelector(frameId);

    if (!show && frameElement) {
        frameElement.style.display = "flex";
    }
}

// Initially hide the frames
for (var i = 0; i < messageContainers.length; i++) {
    var frameId = "#framer" + (i + 1);
    var frameElement = document.querySelector(frameId);

    if (frameElement) {
        frameElement.style.display = "none";
    }
}
// Function to display messages
function displayMessages(container, messagesArray, containerIndex, messageIndex, callback) {
    if (messageIndex < messagesArray.length) {
        var message = messagesArray[messageIndex];
        var nextMessage = messageIndex < messagesArray.length - 1 ? messagesArray[messageIndex + 1] : '';
        var delay = calculateDynamicDelay(message, nextMessage);

        // Show typing indicator for the current container
        toggleTypingIndicatorAndFrame(containerIndex, true);

        addMessage(container, message, function () {
            setTimeout(function () {
                displayMessages(container, messagesArray, containerIndex, messageIndex + 1, callback);

                // Check if the current container is #messages7
                if (containerIndex === 6 && messageIndex === messagesArray.length - 1) {
                    // Animation for #messages7 is complete
                    // Show all elements with classes like ".plans-details-wrap1", ".plans-details-wrap2", ".plans-details-wrap3"
                    var plansDetailsWraps = document.querySelectorAll(".plans-details-wrap1, .plans-details-wrap2, .plans-details-wrap3");

                    // Function to reveal elements with a scroll effect
                    function revealElementsWithScroll(index) {
                        if (index < plansDetailsWraps.length) {
                            plansDetailsWraps[index].style.display = "block";
                            plansDetailsWraps[index].scrollIntoView({ behavior: "smooth" });

                            setTimeout(function () {
                                revealElementsWithScroll(index + 1);
                            }, 1000); // Adjust the delay between elements as needed (in milliseconds)
                        }
                    }

                    // Start revealing elements with a scroll effect
                    revealElementsWithScroll(0);
                }
            }, delay);
        });
    } else {
        // All messages in the current container are displayed
        // Hide typing indicator and show frame for this container
        toggleTypingIndicatorAndFrame(containerIndex, false);

        // Call the callback function when all messages are displayed
        if (typeof callback === 'function') {
            setTimeout(callback, 1000);
        }
    }
}





// Function to calculate dynamic time delay based on current and next messages
function calculateDynamicDelay(currentMessage, nextMessage) {
    // You can adjust this factor based on your preference
    var baseDelay = 100; // Base delay in milliseconds
    var additionalDelayPerChar = 20; // Additional delay per character in milliseconds

    // Calculate the dynamic delay based on the length of the next message
    var dynamicDelay = baseDelay + additionalDelayPerChar * nextMessage.length;

    return dynamicDelay;
}

function startAnimation() {
    document.getElementById("startAnimationButton").style.display = "none";

    function displayWithDelay(containerIndex) {
        setTimeout(function () {
            displayMessages(
                messageContainers[containerIndex],
                messagesArrays[containerIndex],
                containerIndex,
                0,
                function () {
                    if (containerIndex < messageContainers.length - 1) {
                        displayWithDelay(containerIndex + 1);
                    }
                }
            );
        }, 1000); // Add a delay of 1000 milliseconds (1 second)
    }
    displayWithDelay(0);
}
// Event listener for button click
document.getElementById("startAnimationButton").addEventListener("click", startAnimation);