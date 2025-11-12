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

    // Floating Button
    var btn = document.createElement("button");
    btn.innerHTML = "💬 <span>Feedback</span>";
    Object.assign(btn.style, {
      position: "fixed",
      bottom: "30px",
      right: "30px",
      zIndex: "9999",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      padding: "14px 24px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    });
    btn.onmouseover = () => {
      btn.style.transform = "translateY(-3px)";
      btn.style.boxShadow = "0 12px 28px rgba(102, 126, 234, 0.6)";
    };
    btn.onmouseout = () => {
      btn.style.transform = "translateY(0)";
      btn.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.4)";
    };
    document.body.appendChild(btn);

    var modal = document.createElement("div");
    Object.assign(modal.style, {
      display: "none",
      position: "fixed",
      bottom: "100px",
      right: "30px",
      zIndex: "9999",
      width: "380px",
      maxWidth: "calc(100vw - 60px)",
      background: "rgba(255, 255, 255, 0.98)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
      padding: "0",
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      animation: "slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    });

    modal.innerHTML = `
      <div style="padding: 30px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;">
          <h3 style="margin:0;font-size:24px;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-weight:700;">Feedback</h3>
          <button id="closeBtn" style="background:none;border:none;font-size:24px;cursor:pointer;color:#999;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:all 0.3s ease;">&times;</button>
        </div>
        <form id="feedbackForm" style="display:flex;flex-direction:column;gap:16px; color:#000;">
          <div style="display:flex;flex-direction:column;gap:6px;">
            <label style="font-size:13px;font-weight:500;color:#333;">Full Name</label>
            <input type="text" placeholder="Ayush Saini" id="name" required style="padding:12px 16px;border-radius:10px;border:2px solid #e5e7eb;font-size:14px;transition:all 0.3s ease;font-family:inherit;background:#fff;" />
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <label style="font-size:13px;font-weight:500;color:#333;">Email Address</label>
            <input type="email" placeholder="you@example.com" id="email" required style="padding:12px 16px;border-radius:10px;border:2px solid #e5e7eb;font-size:14px;transition:all 0.3s ease;font-family:inherit;background:#fff;" />
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <label style="font-size:13px;font-weight:500;color:#333;">Your Feedback</label>
            <textarea placeholder="Tell us what you think..." id="text" rows="3" required style="padding:12px 16px;border-radius:10px;border:2px solid #e5e7eb;font-size:14px;transition:all 0.3s ease;resize:vertical;min-height:80px;font-family:inherit;background:#fff;"></textarea>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <label style="font-size:13px;font-weight:500;color:#333;text-align:center;">Rate Your Experience</label>
            <div id="stars" style="display:flex;justify-content:center;gap:8px;padding:8px 0;">
              <span class="star" data-value="1" style="font-size:32px;cursor:pointer;color:#ddd;transition:all 0.2s ease;user-select:none;">★</span>
              <span class="star" data-value="2" style="font-size:32px;cursor:pointer;color:#ddd;transition:all 0.2s ease;user-select:none;">★</span>
              <span class="star" data-value="3" style="font-size:32px;cursor:pointer;color:#ddd;transition:all 0.2s ease;user-select:none;">★</span>
              <span class="star" data-value="4" style="font-size:32px;cursor:pointer;color:#ddd;transition:all 0.2s ease;user-select:none;">★</span>
              <span class="star" data-value="5" style="font-size:32px;cursor:pointer;color:#ddd;transition:all 0.2s ease;user-select:none;">★</span>
            </div>
            <input type="hidden" id="rating" value="0" />
          </div>
          <button type="submit" style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:#fff;padding:14px;border:none;border-radius:10px;cursor:pointer;font-size:15px;font-weight:600;transition:all 0.3s ease;margin-top:6px;box-shadow:0 4px 15px rgba(102, 126, 234, 0.4);">Send Feedback</button>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    // Toggle Modal
    btn.onclick = () => {
      modal.style.display = "block";
    };

    var closeBtn = modal.querySelector("#closeBtn");
    closeBtn.onclick = () => {
      modal.style.display = "none";
    };
    closeBtn.onmouseover = () => {
      closeBtn.style.background = "rgba(0, 0, 0, 0.05)";
      closeBtn.style.color = "#333";
      closeBtn.style.transform = "rotate(90deg)";
    };
    closeBtn.onmouseout = () => {
      closeBtn.style.background = "none";
      closeBtn.style.color = "#999";
      closeBtn.style.transform = "rotate(0deg)";
    };

    // Star Rating Logic
    var stars = modal.querySelectorAll(".star");
    var ratingInput = modal.querySelector("#rating");
    var selectedRating = 0;

    function updateStars() {
      stars.forEach((star, index) => {
        if (index < selectedRating) {
          star.style.color = "#fbbf24";
          star.style.transform = "scale(1.1)";
        } else {
          star.style.color = "#ddd";
          star.style.transform = "scale(1)";
        }
      });
    }

    stars.forEach((star) => {
      star.onclick = () => {
        selectedRating = parseInt(star.dataset.value);
        ratingInput.value = selectedRating;
        updateStars();
        star.style.animation = "pulse 0.3s ease";
        setTimeout(() => (star.style.animation = ""), 300);
      };

      star.onmouseenter = () => {
        var hoverValue = parseInt(star.dataset.value);
        stars.forEach((s, index) => {
          if (index < hoverValue) {
            s.style.color = "#fbbf24";
          } else {
            s.style.color = selectedRating > index ? "#fbbf24" : "#ddd";
          }
        });
      };
    });

    modal.querySelector("#stars").onmouseleave = () => {
      updateStars();
    };

    // Input Focus Effects
    var inputs = modal.querySelectorAll("input[type='email'], textarea");
    inputs.forEach((input) => {
      input.onfocus = () => {
        input.style.borderColor = "#667eea";
        input.style.boxShadow = "0 0 0 4px rgba(102, 126, 234, 0.1)";
      };
      input.onblur = () => {
        input.style.borderColor = "#e5e7eb";
        input.style.boxShadow = "none";
      };
    });

    // Submit Button Hover
    var submitBtn = modal.querySelector("button[type='submit']");
    submitBtn.onmouseover = () => {
      submitBtn.style.transform = "translateY(-2px)";
      submitBtn.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
    };
    submitBtn.onmouseout = () => {
      submitBtn.style.transform = "translateY(0)";
      submitBtn.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
    };

    // Form Submission
    var form = modal.querySelector("#feedbackForm");
    var emailInput = modal.querySelector("#email");
    var textInput = modal.querySelector("#text");
    var nameInput = modal.querySelector("#name")

    if (!form || !emailInput || !textInput || !ratingInput || !nameInput) {
      console.error("Form elements not found in widget.");
      return;
    }

    form.onsubmit = async function (e) {
      e.preventDefault();

      if (selectedRating === 0) {
        alert("Please select a rating!");
        return;
      }

      var email = emailInput.value;
      var name = nameInput.value;
      var text = textInput.value;
      var rating = Number(ratingInput.value);

      try {
        var response = await fetch("http://localhost:3001/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            siteId: siteId,
            email: email,
            name: name,
            text: text,
            rating: rating,
          }),
        });

        if (!response.ok) throw new Error("Failed to submit feedback");

        alert("Thank you for your feedback! 🎉");
        modal.style.display = "none";
        form.reset();
        selectedRating = 0;
        updateStars();
      } catch (err) {
        console.error(err);
        alert("Error submitting feedback. Please try again.");
      }
    };

    // Animations
    var style = document.createElement("style");
    style.innerHTML = `
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes pulse {
        0%, 100% {
          transform: scale(1.1);
        }
        50% {
          transform: scale(1.3);
        }
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
