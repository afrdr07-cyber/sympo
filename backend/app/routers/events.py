from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/events", tags=["Events"])

EVENTS_DATABASE: List[Dict[str, Any]] = [
    {
        "id": "rev_coding",
        "name": "Reverse Coding",
        "category": "Technical",
        "type": "Individual",
        "fee": 150.0,
        "description": "Decompile the executable or analyze output patterns to reconstruct the original logic and source code.",
        "rules": [
            "Individual event only.",
            "Time limit: 45 minutes.",
            "Allowed languages: C, C++, Java, Python.",
            "Decisions of judges are final."
        ],
        "fields": ["preferredLanguage"],
        "icon": "Code2",
        "coordinator": "Dr.Nelu / Student Co: Vignesh (9876543210)"
    },
    {
        "id": "paper_pres",
        "name": "Paper Presentation",
        "category": "Technical",
        "type": "Team",
        "fee": 150.0,  # ₹150 per participant
        "description": "Showcase your novel research ideas, AI advancements, and data science solutions before our panel of expert judges.",
        "rules": [
            "Team size: 1 to 3 members.",
            "Every member must register individually (₹150 per member).",
            "Abstract must be submitted in PDF format (max 5MB).",
            "Presentation time: 8 mins + 2 mins Q&A."
        ],
        "fields": ["teamName", "teamLeaderName", "presentationTitle", "abstractUrl", "teamSize"],
        "icon": "FileText",
        "coordinator": "Prof. S. Kavitha / Student Co: Priyadarshini (9876543211)"
    },
    {
        "id": "tech_quiz",
        "name": "Technical Quiz",
        "category": "Technical",
        "type": "Individual",
        "fee": 150.0,
        "description": "Test your expertise in Artificial Intelligence, Machine Learning, Data Structures, and trending Tech facts.",
        "rules": [
            "Individual participation only.",
            "Round 1: Preliminary MCQ quiz.",
            "Round 2: Rapid fire buzzer round."
        ],
        "fields": [],
        "icon": "Brain",
        "coordinator": "Prof. M. Anand / Student Co: Karthik (9876543212)"
    },
    {
        "id": "mem_challenge",
        "name": "Memory Challenge",
        "category": "Non Technical",
        "type": "Individual",
        "fee": 150.0,
        "description": "Test your cognitive recall! Memorize visual sequences, patterns, and object arrays within limited seconds.",
        "rules": [
            "Individual participation.",
            "3 progressive rounds of increasing difficulty.",
            "No electronic devices or notes allowed during recall."
        ],
        "fields": [],
        "icon": "Eye",
        "coordinator": "Prof. R. Devi / Student Co: Sweety (9876543213)"
    },
    {
        "id": "photography",
        "name": "Photography",
        "category": "Non Technical",
        "type": "Individual",
        "fee": 150.0,
        "description": "Capture the campus life, architecture, and mood under the theme revealed on the spot.",
        "rules": [
            "Individual participation.",
            "All photos MUST be captured strictly within P.S.V College campus.",
            "Basic color correction allowed; heavy manipulation disqualified."
        ],
        "fields": ["cameraType", "campusDeclaration"],
        "icon": "Camera",
        "coordinator": "Prof. K. Ramesh / Student Co: Rahul (9876543214)"
    },
    {
        "id": "free_fire",
        "name": "E-Sports (Free Fire)",
        "category": "Non Technical",
        "type": "Team",
        "fee": 150.0,  # ₹150 per player
        "description": "Battle Royale showdown! Coordinate with your squad to survive and achieve Booyah!",
        "rules": [
            "Squad size: 4 players.",
            "Every player must register individually (₹150 per player).",
            "CRITICAL: Selecting Free Fire prohibits registering for ANY other event.",
            "Emulators strictly prohibited; Mobile devices only."
        ],
        "fields": ["teamName", "captainName", "freeFireUid", "inGameName", "teamPosition"],
        "icon": "Gamepad2",
        "coordinator": "Prof. P. Suresh / Student Co: Dinesh (9876543215)"
    }
]

@router.get("", response_model=List[Dict[str, Any]])
async def get_events():
    """Retrieve all symposium technical & non-technical events."""
    return EVENTS_DATABASE

@router.get("/{event_id}", response_model=Dict[str, Any])
async def get_event_by_id(event_id: str):
    """Retrieve event details by ID."""
    for event in EVENTS_DATABASE:
        if event["id"] == event_id:
            return event
    return {}
