(function () {
  function initWidget() {
    var currentScript = document.currentScript;
    var siteId = currentScript
      ? new URL(currentScript.src).searchParams.get("site")
      : null;

    if (!siteId) {
      console.error("Site ID is missing in widget script.");
      return;
    }

    var btn = document.createElement("button");
    btn.innerText = "💬 Feedback";
    Object.assign(btn.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: "9999",
      backgroundColor: "#4f46e5",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      padding: "12px 20px",
      fontSize: "16px",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      transition: "transform 0.2s",
    });
    btn.onmouseover = () => (btn.style.transform = "scale(1.05)");
    btn.onmouseout = () => (btn.style.transform = "scale(1)");
    document.body.appendChild(btn);

    var modal = document.createElement("div");
    Object.assign(modal.style, {
      display: "none",
      position: "fixed",
      bottom: "70px",
      right: "20px",
      zIndex: "9999",
      width: "300px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      animation: "fadeIn 0.3s ease",
    });

    modal.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <h3 style="margin:0;color:#4f46e5;">Feedback</h3>
        <button id="closeBtn" style="background:none;border:none;font-size:18px;cursor:pointer;">&times;</button>
      </div>
      <form id="feedbackForm" style="display:flex;flex-direction:column;gap:10px;">
        <input type="email" placeholder="Your email" id="email" style="padding:8px;border-radius:5px;border:1px solid #ccc;" />
        <textarea placeholder="Your feedback" id="text" rows="3" style="padding:8px;border-radius:5px;border:1px solid #ccc;"></textarea>
        <input type="number" min="1" max="5" id="rating" placeholder="Rating 1-5" style="padding:8px;border-radius:5px;border:1px solid #ccc;" />
        <button type="submit" style="background-color:#4f46e5;color:#fff;padding:10px;border:none;border-radius:5px;cursor:pointer;">Send</button>
      </form>
    `;

    document.body.appendChild(modal);

    btn.onclick = () => {
      modal.style.display = "block";
    };
    modal.querySelector("#closeBtn").onclick = () => {
      modal.style.display = "none";
    };

    // --- Form Submission ---
    var form = document.getElementById("feedbackForm");
    var emailInput = document.getElementById("email");
    var textInput = document.getElementById("text");
    var ratingInput = document.getElementById("rating");

    if (!form || !emailInput || !textInput || !ratingInput) {
      console.error("Form elements not found in widget.");
      return;
    }

    form.onsubmit = async function (e) {
      e.preventDefault();

      var email = emailInput.value;
      var text = textInput.value;
      var rating = Number(ratingInput.value);

      try {
        var response = await fetch("http://localhost:3003/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            siteId: siteId,
            email: email,
            text: text,
            rating: rating,
          }),
        });

        if (!response.ok) throw new Error("Failed to submit feedback");

        alert("Thank you for your feedback!");
        modal.style.display = "none";
        form.reset();
      } catch (err) {
        console.error(err);
        alert("Error submitting feedback");
      }
    };

    var style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn {
        from {opacity:0; transform: translateY(10px);}
        to {opacity:1; transform: translateY(0);}
      }
    `;
    document.head.appendChild(style);
  }

  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    initWidget();
  } else {
    document.addEventListener("DOMContentLoaded", initWidget);
  }
})();
