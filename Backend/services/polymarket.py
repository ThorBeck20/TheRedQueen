import httpx
from core.config import settings

# client = PolymarketUS(
#     key_id=settings.POLYMARKET_KEY_ID,
#     secret_key=settings.POLYMARKET_API_KEY,
#     timeout=30.0
# )


async def get_event(slug: str):
    '''
        Goes through the Polymarket API and uses the 'slugs' to find a specific
        event contract.

        Parameters:
            slug (str): a URL-friendly identifier
        Returns:
            dict: The event data as a JSON object

        JSON structure example:
            https://gateway.polymarket.us/v1/events/slug/usfed-fomc-2026-09-16
    '''
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(
            f"https://gateway.polymarket.us/v1/events/slug/{slug}"
        )
        response.raise_for_status()
        return response.json()


# try:
#     order = client.orders.create({"marketSlug": "..."})
# except AuthenticationError as e:
#     print(f"Invalid credentials: {e.message}")
# except BadRequestError as e:
#     print(f"Invalid parameters: {e.message}")
# except RateLimitError as e:
#     print(f"Rate limited: {e.message}")
# except NotFoundError as e:
#     print(f"Not found: {e.message}")
