from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import TranslationRequest, TranslationResponse
from .nlp_engine import text_to_gloss
from .mapper import gloss_to_animations

app = FastAPI(title="SignBridge API (Video Version)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/translate", response_model=TranslationResponse)
async def translate_text(request: TranslationRequest):
    gloss = text_to_gloss(request.text)
    # This now returns a list of remote MP4 URLs scraped directly from the web
    video_urls = gloss_to_animations(gloss)
    return TranslationResponse(
        gloss=gloss,
        animations=video_urls
    )

@app.get("/health")
async def health_check():
    return {"status": "ok"}
