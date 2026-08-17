# TheRedQueen

The idea of this website is to pull all the resources I know about into a central location for the betterment of my investments.
In version 1, I will pull the fundamentals from yfinance and display them in an organized, but ugly way.

Backend - Python, specifically to be able to use pandas, numpy, and scipy.
Frontend - React, node.js
    - Using Echarts for graphing.

Startup Instructions:

To start the front end, navigate to the TRQ-frontend folder. Then simply run the command:
    - npm run dev

To startup the backend, navigate to the Backend folder, and activate the virtual environment.
This can be done with the command:
    - source venv/Scripts/Activate

Then, spin up the backend using:
    - uvicorn main:app --reload

