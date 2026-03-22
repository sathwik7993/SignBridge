import requests
from bs4 import BeautifulSoup
import concurrent.futures

def fetch_video_url(word: str) -> str:
    """
    Scrapes signasl.org to find the first real ASL .mp4 video for the requested word.
    """
    url = f"https://www.signasl.org/sign/{word.lower()}"
    try:
        response = requests.get(url, timeout=3)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "html.parser")
            
            # Find the video element
            video_tag = soup.find("video")
            if video_tag:
                source_tag = video_tag.find("source")
                if source_tag and source_tag.has_attr("src"):
                    return source_tag["src"]
                    
            # Fallback tag search
            source_tag = soup.find("source", type="video/mp4")
            if source_tag and source_tag.has_attr("src"):
                return source_tag["src"]
    except Exception as e:
        print(f"Error fetching video for {word}: {e}")
        pass
        
    return None

def gloss_to_animations(gloss: str) -> list[str]:
    """
    Fetches real ASL video URLs for each word in the gloss.
    Using concurrent threads to make scraping extremely fast.
    """
    words = gloss.split()
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        results = list(executor.map(fetch_video_url, words))
    
    # Filter out missing words and return the valid remote MP4 URLs
    valid_urls = [r for r in results if r]
    return valid_urls
