const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

// Mobile menu open and close
menuBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");

  if (navbar.classList.contains("active")) {
    menuBtn.textContent = "✕";
  } else {
    menuBtn.textContent = "☰";
  }
});

// Close menu after clicking a link
const navLinks = document.querySelectorAll("#navbar a");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navbar.classList.remove("active");
    menuBtn.textContent = "☰";
  });
});

// Membership plan selection
const planButtons = document.querySelectorAll(".plan-btn");
const goalSelect = document.getElementById("goal");
const contactSection = document.getElementById("contact");

planButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedPlan = button.dataset.plan;

    contactSection.scrollIntoView({
      behavior: "smooth",
    });

    document.getElementById("message").value =
      "I am interested in the " + selectedPlan + " membership plan.";

    document.getElementById("formMessage").textContent =
      selectedPlan + " plan selected! Please fill in your details.";

    document.getElementById("name").focus({
      preventScroll: true,
    });
  });
});

// ==========================================
// Contact form (EmailJS Integration)
// ==========================================
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

// Aapki EmailJS Keys
const SERVICE_ID = "service_azkn4th";
const TEMPLATE_ID = "template_8s2p12a";
const PUBLIC_KEY = "8bqu4muEDZifR4s9P";

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const goal = goalSelect.value;
  const message = document.getElementById("message").value.trim();

  if (
    name === "" ||
    email === "" ||
    phone === "" ||
    goal === ""
  ) {
    formMessage.textContent = "Please fill in all required fields.";
    return;
  }

  formMessage.textContent = "Sending your enquiry... Please wait.";

  // EmailJS Template Variables
  const templateParams = {
    from_name: name,
    from_email: email,
    phone: phone,
    goal: goal,
    message: message || "(none)",
  };

  // Send Email
  emailjs
    .send(SERVICE_ID, TEMPLATE_ID, templateParams)
    .then(function (response) {
      console.log("SUCCESS!", response.status, response.text);

      // Form ke niche wala text clear kar dein
      formMessage.textContent = "";

      // Popup mein message set karein
      const popup = document.getElementById("successPopup");
      const popupMessage = document.getElementById("popupMessage");

      popupMessage.textContent =
        "Thank you, " +
        name +
        "! Your enquiry has been sent. We will contact you soon.";

      // Popup show karein
      popup.classList.add("show");

      // Form reset karein
      contactForm.reset();
    })
    .catch(function (error) {
      console.error("FAILED...", error);
      formMessage.textContent =
        "Sorry, something went wrong. Please try again later.";
    });
});

// Automatically update footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Popup close karne ka function
function closePopup() {
    document.getElementById("successPopup").classList.remove("show");
}