# RAW — Campus Unfiltered

## About

RAW is a web project built around making college fest information easier to explore and access. It brings event details, registrations, and ticket information together in one place, with a website designed to feel as lively as the fest itself.

## The Problem

College fests usually have multiple events happening across different categories, each with its own details, schedules, venues, and registration requirements. Finding the right event and keeping track of registrations can become confusing when information is scattered across different posts, forms, and links.

A basic event listing also doesn't always capture the excitement of a fest. The website should be more than a place to read information — it should make exploring events feel engaging.

## The Solution

RAW brings the main parts of the fest experience into a single interactive website. Students can explore events, filter them based on their interests, register for events, and keep track of their registrations through their digital passes.

The interface uses a bold visual style, animations, and interactive elements to make browsing feel less like filling out a form and more like exploring the fest.

## Features

* **Event discovery:** Browse events across different categories, including tech, culture, music, dance, literature, and art.
* **Search and filters:** Find events based on their names, categories, venues, or descriptions.
* **Event registration:** Enter the required details to register for an event.
* **Digital passes:** View registered events and their ticket IDs in the My Events section.
* **Seat availability:** Track available seats and update counts when registrations are made or cancelled.
* **Fest countdown:** Keep track of the time remaining until the event.
* **Theme switching:** Switch between light and dark modes.
* **Interactive design:** Animated sections, event cards, modals, a preloader, and a floating mascot make the experience more engaging.
* **Fest information:** Dedicated sections for the introduction, sponsors, and other event details.

## Tech Stack

* Angular 18
* TypeScript
* HTML
* CSS
* RxJS

## Running Locally

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm.

### Setup

Clone the repository:

```bash
git clone https://github.com/nandaaa23/bid-to-build.git
cd bid-to-build
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open `http://localhost:4200/` in your browser.

### Build

To create a production build, run:

```bash
npm run build
```

## Implementation Notes

The project uses Angular components to organise the different sections of the website and services to manage shared application data.

Registration details, seat counts, and theme preferences are stored in browser LocalStorage. This allows the information to persist across page reloads in the same browser, but it is not a shared database across users or devices.

## Future Scope

* Add backend integration for persistent registration management.
* Support real-time seat availability across users.
* Add a central dashboard for managing events and registrations.
* Improve the registration process with stronger validation and confirmation.

## Author

[Nanda](https://github.com/nandaaa23)

[GitHub Repository](https://github.com/nandaaa23/bid-to-build)
