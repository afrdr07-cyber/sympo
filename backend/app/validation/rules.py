from typing import List, Tuple
from app.schemas.registration import SelectedEventDetails, ParticipantInfo

def validate_event_combination(events: List[SelectedEventDetails]) -> Tuple[bool, str]:
    if not events:
        return False, "At least one event must be selected for registration."
    
    event_names = [e.eventName for e in events]
    tech_count = sum(1 for e in events if e.category.lower() in ["technical", "tech"])
    non_tech_count = sum(1 for e in events if e.category.lower() in ["non technical", "non-technical", "non_technical", "nontech"])

    # Check Free Fire Exclusivity Rule
    if "Free Fire" in event_names or "E-Sports (Free Fire)" in event_names:
        if len(events) > 1:
            return False, "Free Fire is an exclusive event and cannot be combined with any other event!"

    # Maximum 2 events allowed total
    if len(events) > 2:
        return False, "Maximum 2 events can be selected per registration."

    # Validate combination rules
    # Allowed: 2 Tech OR 2 Non-Tech OR 1 Tech + 1 Non-Tech
    if tech_count > 2:
        return False, "You can select a maximum of 2 Technical events."
    if non_tech_count > 2:
        return False, "You can select a maximum of 2 Non-Technical events."

    return True, "Valid event combination"

def validate_event_specific_fields(events: List[SelectedEventDetails]) -> Tuple[bool, str]:
    for e in events:
        ev_name = e.eventName
        if ev_name == "Paper Presentation":
            if not e.presentationTitle or not e.presentationTitle.strip():
                return False, "Paper Presentation requires a Presentation Title."
            if not e.teamName or not e.teamName.strip():
                return False, "Paper Presentation requires a Team Name."
        elif ev_name == "Photography":
            if not e.campusDeclaration:
                return False, "Photography registration requires confirming the campus-only photo declaration."
        elif ev_name in ["Free Fire", "E-Sports (Free Fire)"]:
            if not e.freeFireUid or not e.freeFireUid.strip():
                return False, "Free Fire registration requires your Free Fire UID."
            if not e.inGameName or not e.inGameName.strip():
                return False, "Free Fire registration requires your In Game Name (IGN)."
            if not e.teamName or not e.teamName.strip():
                return False, "Free Fire registration requires a Team Name."

    return True, "Valid event details"
