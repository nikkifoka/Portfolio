/* ==========================================================
   Nikki Vikas Foka — Portfolio JavaScript

   Handles:
   - Current year
   - Mobile navigation
   - Smooth scrolling
   - Scroll reveal animations
   - Copy email
   - Active navigation
   - Terminal text
   - Back-to-top button

   IMPORTANT:
   The contact form is NOT intercepted here.
   It submits normally to FormSubmit from index.html.
   ========================================================== */


document.addEventListener("DOMContentLoaded", () => {


  /* ========================================================
     CURRENT YEAR
     ======================================================== */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* ========================================================
     MOBILE NAVIGATION
     ======================================================== */

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {

    navToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      navToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    /* Close mobile menu after clicking a link */

    navLinks.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* ========================================================
     SMOOTH SCROLLING
     ======================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#" ||
        targetId === "#top"
      ) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* ========================================================
     SCROLL REVEAL
     ======================================================== */

  const revealElements = document.querySelectorAll(
    "section, .project-card, .exp-card, .hack-card, .skill-group, .learning-chip"
  );

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.08
      }
    );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach((element) => {

      element.classList.add("visible");

    });

  }


  /* ========================================================
     COPY EMAIL
     ======================================================== */

  const copyEmailBtn =
    document.getElementById("copyEmailBtn");

  const emailLink =
    document.getElementById("emailLink");


  if (copyEmailBtn && emailLink) {

    copyEmailBtn.addEventListener("click", async () => {

      const email =
        emailLink.textContent.trim();


      try {

        await navigator.clipboard.writeText(email);

        copyEmailBtn.textContent =
          "✓ Email copied";

        copyEmailBtn.classList.add("copied");


        setTimeout(() => {

          copyEmailBtn.textContent =
            "📋 Copy email";

          copyEmailBtn.classList.remove("copied");

        }, 2000);


      } catch (error) {

        /* Fallback for older browsers */

        const temporaryInput =
          document.createElement("input");

        temporaryInput.value = email;

        document.body.appendChild(
          temporaryInput
        );

        temporaryInput.select();

        document.execCommand("copy");

        temporaryInput.remove();


        copyEmailBtn.textContent =
          "✓ Email copied";

        copyEmailBtn.classList.add("copied");


        setTimeout(() => {

          copyEmailBtn.textContent =
            "📋 Copy email";

          copyEmailBtn.classList.remove("copied");

        }, 2000);

      }

    });

  }


  /* ========================================================
     ACTIVE NAVIGATION
     ======================================================== */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navItems = document.querySelectorAll(
    ".nav-links a"
  );


  if (
    "IntersectionObserver" in window &&
    sections.length > 0
  ) {

    const navObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }


            const currentId =
              entry.target.getAttribute("id");


            navItems.forEach((item) => {

              const href =
                item.getAttribute("href");

              item.classList.toggle(
                "active",
                href === `#${currentId}`
              );

            });

          });

        },
        {
          rootMargin: "-25% 0px -65% 0px",
          threshold: 0
        }
      );


    sections.forEach((section) => {

      navObserver.observe(section);

    });

  }


  /* ========================================================
     TERMINAL TEXT
     ======================================================== */

  const terminalTyped =
    document.getElementById("terminalTyped");


  if (terminalTyped) {

    const text =
      terminalTyped.dataset.text ||
      "nikki --curious --building";


    let index = 0;


    const typeText = () => {

      if (index < text.length) {

        terminalTyped.textContent +=
          text.charAt(index);

        index++;

        setTimeout(typeText, 55);

      }

    };


    typeText();

  }


  /* ========================================================
     BACK TO TOP
     ======================================================== */

  const backToTop =
    document.getElementById("backToTop");


  if (backToTop) {

    const toggleBackToTop = () => {

      if (window.scrollY > 500) {

        backToTop.classList.add("show");

      } else {

        backToTop.classList.remove("show");

      }

    };


    window.addEventListener(
      "scroll",
      toggleBackToTop,
      { passive: true }
    );


    toggleBackToTop();


    backToTop.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /* ========================================================
     PROJECT CARD TILT EFFECT
     ======================================================== */

  const projectCards =
    document.querySelectorAll(".project-card");


  projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

      if (
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      ) {
        return;
      }


      const rect =
        card.getBoundingClientRect();


      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;


      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;


      const rotateX =
        ((y - centerY) / centerY) * -2;

      const rotateY =
        ((x - centerX) / centerX) * 2;


      card.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

      card.style.transform = "";

    });

  });


  /* ========================================================
     CONTACT FORM

     IMPORTANT:
     There is intentionally NO submit listener here.

     The form in index.html uses:

     action="https://formsubmit.co/fokanikki4@gmail.com"

     Therefore the browser submits the form directly to
     FormSubmit instead of opening the visitor's email app.
     ======================================================== */


  /* ========================================================
     CONSOLE MESSAGE
     ======================================================== */

  console.log(
    "Hi! I'm Nikki 👋"
  );

  console.log(
    "B.Tech IT Student | Java | Web Development"
  );

  console.log(
    "Current focus: Java, FSJP project work, React & Web Development"
  );


});