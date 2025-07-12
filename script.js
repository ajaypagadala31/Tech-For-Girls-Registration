let count = parseInt(localStorage.getItem('shareCount')) || 0;
const counterDisplay = document.getElementById("counter");
const shareBtn = document.getElementById("whatsappBtn");
const shareMsg = document.getElementById("shareCompleteMsg");
const form = document.getElementById("registrationForm");
const successMsg = document.getElementById("successMsg");

if (localStorage.getItem("formSubmitted")) {
  form.style.display = "none";
  successMsg.style.display = "block";
}

function updateCounter() {
  counterDisplay.innerText = `Click count: ${count}/5`;
  if (count >= 5) {
    shareBtn.disabled = true;
    shareMsg.style.display = "block";
  }
}

shareBtn.addEventListener("click", () => {
  if (count < 5) {
    count++;
    localStorage.setItem("shareCount", count);
    updateCounter();
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community");
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;

  if (count < 5) {
    alert("Please complete WhatsApp sharing (5/5) before submitting.");
    submitButton.disabled = false;
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const file = document.getElementById("screenshot").files[0];

  const reader = new FileReader();
  reader.onloadend = async function () {
    const base64File = reader.result.split(',')[1];
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("college", college);
    formData.append("screenshot", base64File);

    const scriptURL = "https://script.google.com/macros/s/AKfycbwiJ19c8eUjgEJqVYKz0q1aQOVa5xALWDmDbSr8qu3LyLh2IlwmnIanBalRsXBVQc1l/exec";

    try {
      await fetch(scriptURL, { method: 'POST', body: formData });
      form.reset();
      form.style.display = "none";
      successMsg.style.display = "block";
      localStorage.setItem("formSubmitted", "true");
    } catch (error) {
      alert("There was an error submitting your form. Please try again later.");
      console.error("Error:", error);
      submitButton.disabled = false;
    }
  };

  reader.readAsDataURL(file);
});


updateCounter();
