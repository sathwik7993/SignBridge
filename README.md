# SignBridge: Real-Time Sign Language Translation System

SignBridge is a robust browser extension and backend API system that translates any selected English text on a webpage into real, streaming American Sign Language (ASL) videos.

## Features
- **Real-Time Text Selection**: Highlight text on any webpage and right-click to instantly translate.
- **NLP Gloss Generation**: Uses `spaCy` to pre-process English sentences into ASL 'Gloss' format (removing stop words, isolating root lemmas).
- **Dynamic Web Scraping**: The FastAPI backend asynchronously scrapes real human ASL `.mp4` videos from the web on-the-fly, ensuring maximum vocabulary coverage without bloated local storage.
- **Non-Intrusive Overlay**: Injects a sleek HTML5 video player overlay into the webpage to sequence the translations seamlessly without conflicting with the website's styles.

## Prerequisites
- **Python 3.9+**
- **Google Chrome**

## Backend Setup (Required)
1. Open a terminal and navigate to the `backend/` directory.
2. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Download the spaCy English language model:
   ```bash
   python -m spacy download en_core_web_sm
   ```
4. Start the FastAPI translation server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   *(Ensure the server stays running on port 8000 while using the Chrome extension).*

## Extension Installation
1. Open Google Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** using the toggle in the top right corner.
3. Click the **Load unpacked** button.
4. Select the `extension/` folder from this repository.

## How to Use
1. Ensure the Python backend server is actively running.
2. Navigate to any website (e.g., Wikipedia).
3. Highlight a sentence or phrase with your mouse.
4. Right-click the highlighted text and select **Translate to Sign Language**.
5. The SignBridge overlay will appear in the bottom-right corner and immediately stream the real ASL videos corresponding to your sentence!
