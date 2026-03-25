# Maor Zemach - Personal IT Portfolio

**To see the protfolio enter the following url in your browser:**
https://maor-zemach.netlify.app/

## 🚀 About The Project
This is my personal portfolio website, built to showcase my experience, technical skills, and projects as an IT Specialist and System Administrator. The site is designed with a modern, dark-themed UI to reflect a technical workspace and is fully responsive across all devices. 

Beyond the frontend, this project demonstrates modern web hosting, CI/CD practices, and security hardening.

## ✨ Key Features
* **Single-Page Architecture:** Smooth scrolling navigation for a seamless user experience.
* **Responsive Design:** Mobile-first approach ensuring the site looks great on desktops, tablets, and smartphones.
* **Modern UI:** "Dark Mode" aesthetic with a clean, tech-focused feel.
* **Dedicated Sections:** * Professional Background & Career Journey
  * Technical Expertise (OS, Networking, Cloud, Scripting)
  * Featured Projects (Focusing on Automation & AI tools)
* **Downloadable CV:** Direct link to download my latest PDF resume.

## 🛡️ Security & Infrastructure (DevOps Approach)
* **Automated CI/CD:** Fully integrated with GitHub. Every commit to the `main` branch triggers an automatic build and deployment via **Netlify**.
* **Serverless Contact Form:** Integrated **Netlify Forms** to handle contact requests without exposing email addresses in the source code, inherently protecting against spam bots and web scrapers.
* **Security Hardening:** Implemented custom HTTP security headers via Netlify's `_headers` configuration to mitigate common web vulnerabilities:
  * `X-Frame-Options: DENY` (Anti-Clickjacking)
  * `X-Content-Type-Options: nosniff` (MIME-sniffing protection)
  * `X-XSS-Protection` (Cross-Site Scripting protection)
  * `Referrer-Policy: strict-origin-when-cross-origin`

## 🛠️ Built With
* HTML5 (Semantic Structure)
* CSS3 (Flexbox/Grid, Custom Properties)
* Vanilla JavaScript (Smooth scrolling, DOM manipulation)
* **Hosting & CI/CD:** Netlify
* **Version Control:** Git & GitHub

