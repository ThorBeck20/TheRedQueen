from fastapi import APIRouter
from services.fred_bonds import get_series, get_series_observations


router = APIRouter(prefix="/bonds", tags=["bonds"])


@router.get("/series/{series_id}")
async def series(
    series_id: str,
    ob_start: str,
    ob_end: str,
    frequency: str,
    units: str
):
    '''
    TODO: Make sure to protect these strings from string injection attacks.
    TODO: Add validation to the backend so that only verified frontends can connect?

    Takes the series ID, and retrieves the series headers, and data and returns
    a compiled json dict with both of them.

    Parameters:
        series_id (str): The ID of the series to retrieve.
        observation_start (str): The start of the observation.
            - Format: "YYYY-MM-DD" (Default: 9999-12-31)
        observation_end (str): The end of the observation.
            - Format: "YYYY-MM-DD" (Default: 1776-07-04)
        frequency (str): The frequency of the series.
        units (str): The units of the series. (E.g. percent, log, levels, etc.)


    Returns:
        dict: The series data as a JSON object.

    '''

    series_headers = await get_series(series_id)
    series_data = await get_series_observations(
        series_id,
        ob_start,
        ob_end,
        frequency,
        units
    )

    full_series = {
        "headers": series_headers,
        "data": series_data
    }


    return full_series
