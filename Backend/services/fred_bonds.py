import httpx
from core.config import settings

'''
    Remember to read the terms of service and follow instructions.
    For example, remember to include the following statement:
      "This product uses the FRED® API but is not endorsed or certified by the
      Federal Reserve Bank of St. Louis."
'''


async def get_series(series_id: str):
    '''
    TODO: Add error handling as well as think about implementing threading.


    Get the series headers from the FRED API using the provided series_id.
    Returns the series data as a JSON object.


    Parameters:
        series_id (str): The ID of the series to retrieve.
    Returns:
        dict: The series data as a JSON object.
    '''
    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(
            "https://api.stlouisfed.org/fred/series",
            params={
                "series_id": series_id,
                "api_key": settings.FRED_API_KEY,
                "file_type": "json"
            },
        )
        response.raise_for_status()
        return response.json()


async def get_series_observations(
        series_id: str,
        observation_start="1776-07-04",
        observation_end="9999-12-31",
        frequency="d",
        units="lin"
        ):

    '''
    TODO: Add error handling as well as think about implementing threading.


    Get the series data from the FRED API using the provided series_id.
    Returns the series data as a JSON object.

    View the FRED docs for more specifics:
        https://fred.stlouisfed.org/docs/api/fred/series_observations.html

    Parameters:
        series_id (str): The ID of the series to retrieve.
        observation_start (str): The start of the observation.
            - Format: "YYYY-MM-DD" (Default: 1776-07-04)
        observation_end (str): The end of the observation.
            - Format: "YYYY-MM-DD" (Default: 9999-12-31)
        frequency (str): The frequency of the series.
        units (str): The units of the series. (E.g. percent, log, levels, etc.)


    Returns:
        dict: The series data as a JSON object.
    '''
    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(
            "https://api.stlouisfed.org/fred/series/observations",
            params={
                "series_id": series_id,
                "observation_start": observation_start,
                "observation_end": observation_end,
                "frequency": frequency,
                "units": units,
                "api_key": settings.FRED_API_KEY,
                "file_type": "json"
            },
        )
        response.raise_for_status()
        return response.json()
