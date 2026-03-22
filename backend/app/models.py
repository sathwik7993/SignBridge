from pydantic import BaseModel
from typing import List

class TranslationRequest(BaseModel):
    text: str

class TranslationResponse(BaseModel):
    gloss: str
    animations: List[str]
