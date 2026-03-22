import spacy

try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("Downloading en_core_web_sm...")
    spacy.cli.download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

def text_to_gloss(text: str) -> str:
    """
    Converts English text to simplified ASL-like Gloss structure.
    Simplified approach: 
    - Time words moved to front (basic rule)
    - Stop words removed (a, an, the, is, are etc.)
    - Lemmatized verbs and nouns
    - Output in uppercase
    """
    doc = nlp(text)
    
    time_words = []
    other_words = []
    
    for token in doc:
        # Stop words to remove
        if token.is_stop and token.pos_ not in ['PRON']:
            if token.text.lower() in ['a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being']:
                continue
                
        # Basic time detection
        is_time = False
        if token.ent_type_ in ['DATE', 'TIME']:
            is_time = True
        elif token.text.lower() in ['today', 'tomorrow', 'yesterday', 'now', 'later']:
            is_time = True
            
        # Basic error handling: if lemma is -PRON-, output text instead
        lemma = token.lemma_.upper()
        if lemma == "-PRON-":
            lemma = token.text.upper()
            
        if is_time:
            time_words.append(lemma)
        else:
            if not token.is_punct:
                other_words.append(lemma)
                
    gloss_words = time_words + other_words
    return " ".join(gloss_words)
