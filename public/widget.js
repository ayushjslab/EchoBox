(function () {
function showToast(message, type = "info") {
  const toast = document.createElement("div");

  // SVG icons for types
  const icons = {
    success: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
    <path fill="#ffffff" fill-rule="evenodd" d="M256 42.667C138.18 42.667 42.667 138.18 42.667 256S138.18 469.334 256 469.334S469.334 373.82 469.334 256S373.821 42.667 256 42.667m0 384c-94.105 0-170.666-76.561-170.666-170.667S161.894 85.334 256 85.334S426.667 161.894 426.667 256S350.106 426.667 256 426.667m80.336-246.886l30.167 30.167l-131.836 132.388l-79.083-79.083l30.166-30.167l48.917 48.917z"/>
  </svg>`,

    error: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
    <path fill="#ffffff" fill-rule="evenodd" d="M8 14.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13ZM8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm1-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-.25-6.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5Z" clip-rule="evenodd"/>
  </svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z" />
    </svg>`,
  };

  toast.innerHTML = `<div style="display:flex;align-items:center;gap:10px;">${
    icons[type] || icons.info
  }<span>${message}</span></div>`;

  Object.assign(toast.style, {
    position: "fixed",
    bottom: "50px",
    right: "30px",
    padding: "14px 22px",
    borderRadius: "16px",
    background:
      type === "error" ? "rgba(220,38,38,0.85)" : "rgba(16,185,129,0.85)", // glassy
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "600",
    boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
    backdropFilter: "blur(10px)", // glass effect
    zIndex: "99999",
    opacity: "0",
    transform: "translateY(20px) scale(0.95)",
    transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
  });

  document.body.appendChild(toast);

  // Fade in & pop
  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0) scale(1)";
  }, 50);

  // Fade out & remove
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-20px) scale(0.9)";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

  async function initWidget() {
   var siteId = null;

   if (document.currentScript) {
     siteId = new URL(document.currentScript.src).searchParams.get("siteId");
   }

   if (!siteId && window.WIDGET_SITE_ID) {
     siteId = window.WIDGET_SITE_ID;
   }

   console.log(siteId);

   if (!siteId) {
     console.error("Site ID is missing in widget script.");
     return;
   }


    try {
      const res = await fetch(`https://echomark.vercel.app/api/validate-site`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId }),
      });

      if (!res.ok) throw new Error("Failed to validate site ID");

      const data = await res.json();
      console.log(data)
     const allowedDomain = new URL(data.domain).hostname;
      if (window.location.hostname !== allowedDomain) {
         showToast("Domain is not correct", "error");
        return;
      }
      console.log("Domain validated. Initializing widget...");
    } catch (error) {
      console.log(error);
    }

    // Floating Button
    var btn = document.createElement("button");
    btn.innerHTML = "💬";
   Object.assign(btn.style, {
     position: "fixed",
     bottom: "30px",
     right: "30px",
     zIndex: "9999",
     background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", // Emerald gradient
     color: "#fff",
     border: "1px solid rgba(255,255,255,0.3)", // subtle white border
     borderRadius: "20px",
     padding: "6px 10px",
     fontSize: "22px",
     fontWeight: "700",
     cursor: "pointer",
    boxShadow: "0 10px 25px rgba(16, 185, 129, 0.35)", // softer emerald shadow
     transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
     gap: "8px",
     fontFamily:
       "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
     backdropFilter: "blur(6px)", // glassy effect
   });

   btn.onmouseover = () => {
     btn.style.transform = "translateY(-3px)";
     btn.style.boxShadow = "0 15px 35px rgba(16, 185, 129, 0.5)";
   };
   btn.onmouseout = () => {
     btn.style.transform = "translateY(0)";
     btn.style.boxShadow = "0 10px 25px rgba(16, 185, 129, 0.35)";
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
      padding: "0",
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      animation: "slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    });

   modal.innerHTML = `
<div style="
  padding:18px;
  max-width:380px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(12px);
  border-radius:18px;
  box-shadow: 0 16px 50px rgba(0,0,0,0.18);
  font-family:'Inter',sans-serif;
  border:1px solid rgba(16,185,129,0.2);
">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
    <h3 style="
      margin:0;
      font-size:22px;
      background: linear-gradient(135deg,#10b981 0%,#059669 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight:700;
    ">Feedback</h3>
    <button id="closeBtn" style="
      background:none;
      border:none;
      font-size:22px;
      cursor:pointer;
      color:#6b7280;
      width:32px;
      height:32px;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:50%;
      transition:all 0.3s ease;
    ">&times;</button>
  </div>
  <form id="feedbackForm" style="display:flex;flex-direction:column;gap:10px;color:#111;">
    <div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:12px;font-weight:500;color:#374151;">Full Name</label>
      <input type="text" placeholder="Ayush Saini" id="name" required style="
        padding:10px 14px;
        border-radius:12px;
        border:1.5px solid rgba(16,185,129,0.3);
        font-size:14px;
        transition:all 0.3s ease;
        font-family:inherit;
        background:#ffffffcc;
        outline:none;
      " />
    </div>
    <div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:12px;font-weight:500;color:#374151;">Email Address</label>
      <input type="email" placeholder="ayush.jslab@gmail.com" id="email" required style="
        padding:10px 14px;
        border-radius:12px;
        border:1.5px solid rgba(16,185,129,0.3);
        font-size:14px;
        transition:all 0.3s ease;
        font-family:inherit;
        background:#ffffffcc;
        outline:none;
      " />
    </div>
    <div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:12px;font-weight:500;color:#374151;">Your Feedback</label>
      <textarea placeholder="Tell us what you think..." id="text" rows="2" required style="
        padding:10px 14px;
        border-radius:12px;
        border:1.5px solid rgba(16,185,129,0.3);
        font-size:14px;
        transition:all 0.3s ease;
        resize:vertical;
        min-height:60px;
        font-family:inherit;
        background:#ffffffcc;
        outline:none;
      "></textarea>
    </div>
    <div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:12px;font-weight:500;color:#374151;text-align:center;">Rate Your Experience</label>
      <div id="stars" style="display:flex;justify-content:center;gap:6px;padding:4px 0;">
        <span class="star" data-value="1" style="font-size:26px;cursor:pointer;color:#d1d5db;transition:all 0.2s ease;user-select:none;">★</span>
        <span class="star" data-value="2" style="font-size:26px;cursor:pointer;color:#d1d5db;transition:all 0.2s ease;user-select:none;">★</span>
        <span class="star" data-value="3" style="font-size:26px;cursor:pointer;color:#d1d5db;transition:all 0.2s ease;user-select:none;">★</span>
        <span class="star" data-value="4" style="font-size:26px;cursor:pointer;color:#d1d5db;transition:all 0.2s ease;user-select:none;">★</span>
        <span class="star" data-value="5" style="font-size:26px;cursor:pointer;color:#d1d5db;transition:all 0.2s ease;user-select:none;">★</span>
      </div>
      <input type="hidden" id="rating" value="0" />
    </div>
    <button type="submit" style="
      background: linear-gradient(135deg,#10b981 0%,#059669 100%);
      color: #fff;
      padding:12px;
      border:none;
      border-radius:14px;
      cursor:pointer;
      font-size:14px;
      font-weight:600;
      transition:all 0.3s ease;
      box-shadow:0 6px 18px rgba(16,185,129,0.35);
      margin-top:4px;
    ">Send Feedback</button>
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
    var nameInput = modal.querySelector("#name");

    if (!form || !emailInput || !textInput || !ratingInput || !nameInput) {
      console.error("Form elements not found in widget.");
      return;
    }

    form.onsubmit = async function (e) {
      e.preventDefault();

      if (selectedRating === 0) {
        showToast("Please select a rating!", "error");
        return;
      }

      var email = emailInput.value;
      var name = nameInput.value;
      var text = textInput.value;
      var rating = Number(ratingInput.value);

      try {
        var response = await fetch(`https://echomark.vercel.app/api/feedback`, {
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

        console.log(response)

        if (!response.ok) throw new Error("Failed to submit feedback");

        showToast("Thank you for your feedback! 🎉", "success");
        modal.style.display = "none";
        form.reset();
        selectedRating = 0;
        updateStars();
      } catch (err) {
        console.error(err);
        showToast("Error submitting feedback. Please try again.", "error");
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
