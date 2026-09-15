from fastapi import APIRouter
import re
from services.polymarket import get_event

router = APIRouter(prefix="/polymarket", tags=["polymarket"])

SLUG_PATTERN = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")


def is_valid_slug(slug: str) -> bool:
    return bool(SLUG_PATTERN.match(slug))


@router.get("/events/{slug}")
async def events(slug: str):
    '''
    TODO: Make sure to protect these strings from string injection attacks.
    TODO: Add validation to the backend so that only
            verified frontends can connect?

    Parameters:
        slug (str): The ID of the event.

    Returns:
        dict: The event data as a JSON object.
    '''

    if (not is_valid_slug(slug)):
        return "slug not valid."

    event_data = await get_event(slug)
    return event_data
