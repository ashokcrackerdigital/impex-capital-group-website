import { useEffect } from "react";

import "./Contact.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FooterCTA from "../../components/Footer/FooterCTA";
import StructuredData from "../../components/StructuredData";
import SEO from "../../components/SEO";

const Contact = () => {
  /* Scroll Reveal Animation */
  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", reveal);
    reveal();

    return () => window.removeEventListener("scroll", reveal);
  }, []);

  /* Form Submission Handler */
  useEffect(() => {
    const form = document.getElementById("vboutEmbedForm-182767");
    const responseBox = document.getElementById("vboutEmbedFormResponse-182767");

    if (!form || !responseBox) return;

    // Initialize phone field country selector to India (+91)
    const initPhoneField = () => {
      const phoneInput = form.querySelector('input[type="tel"][name="vbout_EmbedForm[field][631386]"]');
      if (!phoneInput) return;

      if (phoneInput && false) {
        // Disabled pre-filling +91 so HTML5/VBOUT required validation can trigger
        phoneInput.value = '+91';
      }

      // Wait for VBOUT to initialize the country selector
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds max

      const checkCountrySelector = setInterval(() => {
        attempts++;
        const phoneRow = phoneInput.closest('.vboutEmbedFormRow');
        if (!phoneRow) {
          if (attempts >= maxAttempts) clearInterval(checkCountrySelector);
          return;
        }

        // Find country selector (could be select, div with class, etc.)
        const countrySelect = phoneRow.querySelector('select, [class*="country"], [class*="flag"], [data-country], [class*="phone-country"]');

        if (countrySelect) {
          clearInterval(checkCountrySelector);

          // Set to India (+91)
          if (countrySelect.tagName === 'SELECT') {
            // Try to find India option
            const indiaOption = Array.from(countrySelect.options).find(opt =>
              opt.value.toLowerCase() === 'in' ||
              opt.value === '91' ||
              opt.value === '+91' ||
              opt.textContent.toLowerCase().includes('india') ||
              opt.textContent.includes('+91') ||
              opt.getAttribute('data-code') === '91'
            );
            if (indiaOption) {
              countrySelect.value = indiaOption.value;
              const changeEvent = new Event('change', { bubbles: true });
              countrySelect.dispatchEvent(changeEvent);
            }
          } else {
            // For div-based selectors, try to set data attributes
            if (countrySelect.setAttribute) {
              countrySelect.setAttribute('data-country', 'in');
              countrySelect.setAttribute('data-code', '91');
            }
          }

          // Let the native VBOUT/intl-tel-input script handle its own country dropdown state
        } else if (attempts >= maxAttempts) {
          clearInterval(checkCountrySelector);
        }
      }, 100);

      // Keep India +91 prefilled visually
      if (phoneInput && phoneInput.value.trim() === '') {
        phoneInput.value = '+91';
      }

      // Add mousedown intercept on submit to clear +91 precisely before VBOUT validation
      // This ensures "required" validation still catches it if they didn't type a number
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn && !submitBtn.dataset.phoneIntercepted) {
        submitBtn.dataset.phoneIntercepted = 'true';
        submitBtn.addEventListener('mousedown', () => {
          if (phoneInput && phoneInput.value.trim() === '+91') {
            phoneInput.value = ''; // temporarily clear it so validation fails

            // Restore it a short time later in case the observer misses it
            setTimeout(() => {
              if (phoneInput.value === '') {
                phoneInput.value = '+91';
              }
            }, 500);
          }
        });
      }
    };

    // Initialize phone field after form loads (multiple attempts)
    setTimeout(initPhoneField, 300);
    setTimeout(initPhoneField, 1000);
    setTimeout(initPhoneField, 2000);


    // Hide errors when user starts typing
    const hideErrorOnTyping = (e) => {
      const field = e.target;
      field.classList.remove("field-error", "requiredError");

      const row = field.closest(".vboutEmbedFormRow");
      if (row) {
        // Remove error classes from ALL inputs in the row
        // (handles intl-tel-input wrapped phone field where e.target may differ)
        row.querySelectorAll("input, textarea").forEach(input => {
          input.classList.remove("field-error", "requiredError");
        });

        // Hide VBOUT's generated error labels
        // Use setProperty with "important" to override CSS !important rules
        const errorLabels = row.querySelectorAll(".vfb-error, label.error, span.error, .vbout-error");
        errorLabels.forEach(label => {
          label.style.setProperty("display", "none", "important");
        });

        // Clear custom error message if it exists
        const msgBox = row.querySelector(".field-error-msg");
        if (msgBox) {
          msgBox.textContent = "";
        }
      }
    };

    form.addEventListener("input", hideErrorOnTyping);
    form.addEventListener("keydown", hideErrorOnTyping);
    form.addEventListener("change", hideErrorOnTyping);

    const observer = new MutationObserver(() => {
      // 2. Check for JSON errors in the original response box
      const html = responseBox.innerHTML;
      const jsonMatch = html.match(/\{[\s\S]*"errorList"[\s\S]*?\}/);
      if (!jsonMatch) return;

      const data = JSON.parse(jsonMatch[0]);

      if (data.errorList && data.errorMessages) {
        data.errorList.forEach((fieldName, index) => {
          const field = form.querySelector(`[name="${fieldName}"]`);
          if (!field) return;

          field.classList.add("field-error");

          // Show the error label if it was hidden previously
          const row = field.closest(".vboutEmbedFormRow");
          if (row) {
            const errorLabel = row.querySelector("label.vfb-error");
            if (errorLabel) {
              errorLabel.style.display = ""; // Reset display
            }
          }

          const msgBox = field
            .closest(".vboutEmbedFormRow")
            .querySelector(".field-error-msg");

          if (msgBox) {
            msgBox.textContent = data.errorMessages[index];
          }
        });

        // scroll to first error
        const first = form.querySelector(".field-error");
        if (first) {
          first.scrollIntoView({ behavior: "smooth", block: "center" });
          first.focus();
        }

        // Restore +91 if we temporarily cleared it for validation
        const phoneInput = form.querySelector('input[type="tel"]');
        if (phoneInput && phoneInput.value.trim() === '') {
          phoneInput.value = '+91';
        }
      }
    });

    observer.observe(responseBox, {
      childList: true,
      subtree: true,
    });
    observer.observe(form, {
      childList: true,
      subtree: true,
    });

    return () => {
      form.removeEventListener("input", hideErrorOnTyping);
      form.removeEventListener("keydown", hideErrorOnTyping);
      form.removeEventListener("change", hideErrorOnTyping);
      observer.disconnect();
    };
  }, []);



  return (
    <>
      <SEO
        title="Contact Us | Impex Capital Group"
        description="Get in touch with Impex Capital Group for investment opportunities, strategic partnerships, or general inquiries. Our team is here to assist you."
        canonical="https://impexcapitalgroup.com/contact"
      />
      <StructuredData
        breadcrumbs={[
          { name: "Home", url: "https://impexcapitalgroup.com" },
          { name: "Contact Us", url: "https://impexcapitalgroup.com/contact" }
        ]}
        faqs={[
          {
            question: "How can I contact Impex Capital Group?",
            answer:
              "You can contact Impex Capital Group by calling 1-833-467-3924 or emailing investor_relations@impexcapitalgroup.com."
          },
          {
            question: "Where is Impex Capital Group located?",
            answer:
              "Impex Capital Group is located at 5251 Westheimer Suite 925, Houston, TX 77056."
          }
        ]}
      />

      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== HERO ===== */}
      <header className="contact-hero">
        <div className="contact-hero-bg"></div>
        <div className="contact-hero-content">
          <span className="hero-subtitle">Get In Touch</span>
          <h1>Contact Us</h1>
        </div>
      </header>

      {/* ===== CONTACT INFO SECTION ===== */}
      <section className="contact-info-section reveal">
        <div className="contact-info-grid">
          <div className="contact-info-card">
            <i className="fas fa-map-marker-alt contact-icon"></i>
            <h3>Visit Us</h3>
            <p>
              <a
                href="https://www.google.com/maps/place/Impex+Capital+Group/@29.7398124,-95.4676206,20.67z/data=!3m1!5s0x8640c1660088901f:0x27ab5d914c39924f!4m6!3m5!1s0x8640b7d5c58b68a1:0x94eb814eccad0500!8m2!3d29.7398767!4d-95.4671945!16s%2Fg%2F11p17yth42?authuser=0&entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                5251&nbsp;Westheimer&nbsp;Suite&nbsp;925<br />
                Houston, TX 77056
              </a>
            </p>
          </div>
          <div className="contact-info-card">
            <i className="fas fa-phone contact-icon"></i>
            <h3>Call Us</h3>
            <p>1-833-IMPEX-CG</p>
            <p>
              <a href="tel:+18334673924">(1-833-467-3924)</a>
            </p>
          </div>
          <div className="contact-info-card">
            <i className="fas fa-envelope contact-icon"></i>
            <h3>Email Us</h3>
            <p>General Enquiry</p>
            <p>
              <a href="mailto: ">
                investor_relations@impexcapitalgroup.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM SECTION ===== */}
      <section id="contact-form-section" className="contact-form-section reveal">
        <div className="contact-form-container">
          <div className="form-header">
            <h2>Contact Us</h2>
            <h4>Fill below form field for general enquiry</h4>
          </div>

          <div className="contact-form-wrapper">
            {/* VBOUT Script */}
            <script
              async
              src="https://www.vbt.io/ext/vbtforms.js?lang=en"
              charSet="utf-8"
            ></script>

            {/* VBOUT CONFIG */}
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(t){
            var n="_vbtefso";
            t[n]=t[n]||{};
            t[n][182767]="eyJkZXBlbmRlbnRGaWVsZHMiOltdLCJlcnJvck1lc3NhZ2VzIjp7ImVycm9ycyI6IlBsZWFzZSBjaGVjayB0aGUgZXJyb3JzIGluIHRoZSBmb3JtLiIsInJlcXVpcmVkIjoiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC4iLCJpbnZhbGlkX2VtYWlsIjoiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcyEifX0=";
          })(window);`,
              }}
            />

            {/* VBOUT FORM */}
            <div id="vboutEmbedFormWrapper-182767" className="contact-form">
              <div
                id="vboutEmbedFormResponse-182767"
                className="vbout-response"
                style={{ display: "none" }}
              ></div>
              <form
                action="https://www.vbt.io/embedcode/submit/182767/?_format=page&_vbtRef="
                method="post"
                id="vboutEmbedForm-182767"
                data-vboutform="182767"
              >
                <fieldset>
                  <div className="vboutEmbedFormRow">
                    <label htmlFor="field-631383">First Name</label>
                    <input type="text" id="field-631383" name="vbout_EmbedForm[field][631383]" required />
                  </div>

                  <div className="vboutEmbedFormRow">
                    <label htmlFor="field-631384">Last Name</label>
                    <input type="text" id="field-631384" name="vbout_EmbedForm[field][631384]" required />
                  </div>

                  <div className="vboutEmbedFormRow">
                    <label htmlFor="field-631406">Company</label>
                    <input type="text" id="field-631406" name="vbout_EmbedForm[field][631406]" />
                  </div>

                  <div className="vboutEmbedFormRow">
                    <label htmlFor="field-631385">Email</label>
                    <input type="email" id="field-631385" name="vbout_EmbedForm[field][631385]" required />
                  </div>

                  <div className="vboutEmbedFormRow">
                    <label htmlFor="field-631386">Phone</label>
                    <input type="tel" id="field-631386" name="vbout_EmbedForm[field][631386]" required />
                  </div>

                  <div className="vboutEmbedFormRow">
                    <label htmlFor="field-631398">Your Message</label>
                    <textarea id="field-631398" name="vbout_EmbedForm[field][631398]" required />
                  </div>

                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA (scroll to form) + FOOTER ===== */}
      <FooterCTA
        heading="Partner With Our Team"
        text="For co‑investment opportunities, strategic partnerships, or speaking engagements with our leadership, please contact our investor relations team."
        onClick={() => {
          const formSection = document.getElementById("contact-form-section");
          if (formSection) {
            const yOffset = -120; // navbar offset so heading is fully visible
            const y =
              formSection.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }}
      />
      <Footer />
    </>
  );
};

export default Contact;

