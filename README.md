<p align="center">
  <img src="assets/image.png" alt="Dynamic Family Tree Logo" width="150" height="auto">
    <br />
</p>



<p align="center">
  <strong>A Modern, Interactive Family Tree Web Application</strong>
  <br />
  Built with HTML, CSS, and Vanilla JavaScript
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="https://devmaster1987.github.io/dynamic-family-tree/">Live Demo</a> •
  <a href="#-technologies">Technologies</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-documentation">Documentation</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/status-stable-brightgreen.svg" alt="Status">
</p>

---

## 📖 Overview

**Dynamic Family Tree** is a fully responsive, client-side web application that enables users to:

- 👨‍👩‍👧‍👦 **Create** and **manage** family members
- 🔗 **Organize** relationships across multiple generations
- 🌳 **Visualize** interactive family trees
- 🔍 **Search** and **filter** family members
- 💾 **Preserve** data locally using **LocalStorage**

Perfect for genealogy enthusiasts, family historians, or anyone interested in documenting their family lineage. No backend or database required – everything runs directly in your browser.

---

## ✨ Features

### Core Functionality

| Feature | Description |
|---------|-------------|
| ➕ **Add Members** | Add family members with name, photo, DOB, gender, and biography |
| ✏️ **Edit Members** | Update existing member details effortlessly |
| 🗑️ **Delete Members** | Remove members with confirmation to prevent accidental deletion |
| 👤 **Profile View** | View detailed member profiles with all information |
| 🌳 **Tree View** | Interactive visualization of family relationships |
| 🔗 **Relationships** | Define relationships like Father, Mother, Spouse, Siblings, etc. |
| 🔍 **Search** | Fast member search by name or relationship |
| 🎯 **Filter** | Filter members by relationship type |
| 📊 **Statistics** | View family stats: total members, generations, branches, oldest member |
| 📸 **Photo Upload** | Upload profile images using FileReader API |
| 💾 **Auto-Save** | All data persists automatically in LocalStorage |

### Supported Relationships

### Data Management

- ✅ **No Database Required** – Everything stored in browser
- ✅ **Persistent Storage** – Data survives page refreshes
- ✅ **Instant Updates** – Changes reflect immediately
- ✅ **Export Ready** – Data can be extracted for backup

---

## 📊 Dynamic Statistics Dashboard

The application automatically calculates and displays:

| Statistic | Description |
|-----------|-------------|
| 👨‍👩‍👧‍👦 **Total Members** | Complete family count |
| 📈 **Generations** | Number of family generations |
| 🌿 **Branches** | Distinct family branches |
| 🧓 **Oldest Member** | Age of the eldest family member |

> **Note:** Statistics update in real-time when members are added, edited, or removed.

---

## 🛠️ Technologies

### Frontend Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic, accessible page structure |
| **CSS3** | Responsive layouts, animations, tree styling |
| **Vanilla JavaScript** | Application logic, DOM manipulation, events |
| **LocalStorage API** | Client-side data persistence |
| **FileReader API** | Profile image upload and preview |

### Key Features

- ✅ **No Frameworks** – Pure vanilla JavaScript
- ✅ **No Dependencies** – Zero external libraries
- ✅ **Lightweight** – Fast load times
- ✅ **Cross-Browser** – Works on all modern browsers

---

## 📁 Project Structure

```text
dynamic-family-tree/
│
├── index.html              # Main application page
│
├── css/
│   └── style.css           # Complete application styles
│
├── js/
│   └── app.js              # All application logic
│
├── assets/
│   ├── images/             # Profile images and icons
│   ├── project-preview.png # Project screenshot
│   └── logo.png            # Brand logo
│
├── README.md               # Project documentation (this file)
└── LICENSE                 # MIT License
