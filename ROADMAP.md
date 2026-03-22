# SignBridge Roadmap

This document outlines the planned trajectory and future milestones for SignBridge.

## Phase 1: Foundation (Completed)
- [x] Basic Chrome extension capturing highlighted text.
- [x] Backend API built with FastAPI.
- [x] NLP text-to-gloss translation pipeline via spaCy.
- [x] Dynamic backend scraper connecting Gloss words to real streaming ASL videos.

## Phase 2: Refinement & Advanced NLP
- [ ] Implement true ASL grammatical parsing (Time-Topic-Comment) instead of basic word dropping.
- [ ] Add support for "fingerspelling" fallback: If a word is not found in the dictionary, sequence short videos of letters spelling out the word.
- [ ] Introduce caching mechanisms on the backend to avoid re-scraping the same common words repeatedly.
- [ ] Make the overlay window fully draggable by the user.

## Phase 3: AI & 3D Integration Options
- [ ] Provide an alternative option to utilize AI-generated 3D avatars via SMPL-X integrations for platforms lacking high-speed internet.
- [ ] Integrate a Deep Learning Sequence-to-Sequence translation model for English-to-ASL.

## Phase 4: Widespread Accessibility
- [ ] Port the extension to Firefox Add-ons and Safari Extensions.
- [ ] Release SignBridge as a standalone library that web developers can integrate directly into their own websites.
