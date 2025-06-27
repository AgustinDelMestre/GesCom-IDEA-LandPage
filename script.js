// Mobile menu functionality
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobile-nav")
  const menuIcon = document.getElementById("menu-icon")

  if (mobileNav.classList.contains("active")) {
    mobileNav.classList.remove("active")
    mobileNav.style.display = "none"
    menuIcon.className = "fas fa-bars"
  } else {
    mobileNav.classList.add("active")
    mobileNav.style.display = "flex"
    menuIcon.className = "fas fa-times"
  }
}

function closeMobileMenu() {
  const mobileNav = document.getElementById("mobile-nav")
  const menuIcon = document.getElementById("menu-icon")

  mobileNav.classList.remove("active")
  mobileNav.style.display = "none"
  menuIcon.className = "fas fa-bars"
}

// Scroll to services section
function scrollToServices() {
  const servicesSection = document.getElementById("servicios")
  if (servicesSection) {
    const headerOffset = 100
    const elementPosition = servicesSection.offsetTop
    const offsetPosition = elementPosition - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 100
      const elementPosition = target.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Close mobile menu if open
      closeMobileMenu()
    }
  })
})

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.15)"
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)"
  }
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-desktop a[href^='#'], .nav-mobile a[href^='#']")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  // Animate elements on scroll
  const animatedElements = document.querySelectorAll(".feature-card, .service-card, .client-logo, .timeline-item")

  animatedElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`
    observer.observe(el)
  })

  // Handle logo loading errors
  const logoImages = document.querySelectorAll(".client-logo img")
  logoImages.forEach((img) => {
    img.addEventListener("error", function () {
      this.style.display = "none"
      const placeholder = this.nextElementSibling
      if (placeholder && placeholder.classList.contains("logo-placeholder")) {
        placeholder.style.display = "flex"
      }
    })
  })

  // Add loading animation to hero
  const heroElements = document.querySelectorAll(".hero-text .hero-logos, .hero-text h1, .hero-text p, .hero-buttons")
  heroElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`
  })

  // Stats counter animation
  const stats = document.querySelectorAll(".stat-number")
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target
        const finalValue = target.textContent

        if (finalValue.includes("+")) {
          const numValue = Number.parseInt(finalValue.replace("+", ""))
          animateCounter(target, 0, numValue, "+")
        } else if (finalValue.includes("%")) {
          const numValue = Number.parseInt(finalValue.replace("%", ""))
          animateCounter(target, 0, numValue, "%")
        } else if (!isNaN(finalValue)) {
          animateCounter(target, 0, Number.parseInt(finalValue), "")
        }

        statsObserver.unobserve(target)
      }
    })
  })

  stats.forEach((stat) => {
    statsObserver.observe(stat)
  })
})

// Counter animation function
function animateCounter(element, start, end, suffix) {
  const duration = 2000
  const increment = (end - start) / (duration / 16)
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= end) {
      current = end
      clearInterval(timer)
    }
    element.textContent = Math.floor(current) + suffix
  }, 16)
}

// WhatsApp button tracking (optional)
document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
  link.addEventListener("click", () => {
    // You can add analytics tracking here
    console.log("WhatsApp button clicked:", link.href)
  })
})

// Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          imageObserver.unobserve(img)
        }
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Smooth scroll polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const smoothScrollPolyfill = () => {
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(link.getAttribute("href"))
        if (target) {
          const headerOffset = 100
          const elementPosition = target.offsetTop
          const offsetPosition = elementPosition - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  }
  smoothScrollPolyfill()
}
