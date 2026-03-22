# SignBridge

## Overview
SignBridge is a robust browser extension and backend API system that translates any selected English text on a webpage into real, streaming American Sign Language (ASL) videos. It seamlessly bridges the gap between written content and accessible sign language on the web.

## Problem
Deaf and hard-of-hearing individuals often face digital accessibility barriers, as most textual content on the web lacks sign language translations. Traditional translation tools rely on text-to-text or text-to-speech, completely ignoring the visual modality of sign language.

## Solution
SignBridge solves this by providing an on-demand, in-browser ASL translator. Users can highlight any text, right-click, and instantly view a sequence of genuine ASL videos demonstrating the translated words. Instead of relying on rigid, pre-downloaded 3D models, SignBridge dynamically scrapes real human sign language videos from the web on-the-fly.

## Features
- **Real-Time Text Selection**: Highlight text on any webpage and right-click to instantly translate.
- **NLP Gloss Generation**: Uses `spaCy` to pre-process English sentences into simplified ASL 'Gloss' format (removing stop words, isolating root lemmas).
- **Dynamic Web Scraping**: The FastAPI backend asynchronously scrapes real human ASL `.mp4` videos from open dictionaries to ensure maximum vocabulary coverage.
- **Non-Intrusive Overlay**: Injects an isolated HTML5 video player overlay into the webpage so it never conflicts with the host site's styling.

## System Architecture
See [ARCHITECTURE.md](ARCHITECTURE.md) for an in-depth dive into the extension flow, backend scraping design, and diagrams.

## Tech Stack
- **Frontend**: Standard HTML5, Vanilla JavaScript, CSS, Chrome Manifest V3 API
- **Backend API**: Python 3.9+, FastAPI, Uvicorn
- **NLP Engine**: spaCy (English core model)
- **Web Scraping**: Requests, BeautifulSoup4

## Project Structure
- `/backend`: Contains the Python FastAPI server, NLP translation engine, and web scraper logic.
- `/extension`: Contains the Google Chrome extension files, context menu integration, and the floating video player UI.

## Installation
### Backend Setup
1. Open a terminal and navigate to the `backend/` directory.
2. Install dependencies: `pip install -r requirements.txt`
3. Download the spaCy model: `python -m spacy download en_core_web_sm`
4. Start the server: `uvicorn app.main:app --reload --port 8000`

### Extension Installation
1. Open Google Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** in the top right.
3. Click **Load unpacked** and select the `extension/` folder in this repository.

## Usage
1. Ensure the backend server is running on port 8000.
2. Navigate to your favorite website.
3. Highlight a sentence or phrase with your mouse.
4. Right-click the highlighted text and select **Translate to Sign Language**.
5. The SignBridge overlay will appear in the bottom-right corner and immediately stream the ASL videos!

## Roadmap
See [ROADMAP.md](ROADMAP.md) for our future development plans and milestones.

## Contributing
We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.

## License
Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
