from pprint import pprint
from datetime import datetime
import sys
import yfinance as yf;
# from scipy import solve_ivp;
import pandas as pd;
import numpy as np;

def get_expected_constant_growth_rate(dividends, num__yearly_dividends) -> float:
	"""
	Calculate the expected constant growth rate of dividends based on the provided dividends.
	Assumes that there are no outliers in the dividend data.

	Parameters:
	dividends : pd.Series
		A pandas Series containing dividend values.
	num_yearly_dividends : int
		The number of yearly dividends (1, 2, or 4).

	Returns:
	float
		The expected constant growth rate of dividends as an average of the last 5 years.
	"""
	if dividends.empty:
		return 0.0
	else:
		if len(dividends) < 2:
			print("Not enough dividend data to calculate growth rate.")
			return 0.0

		# Take out this year as it is incomplete and will skew the growth rate.
		for indx, d in dividends.items():
			if indx.date().year == datetime.now().year:
				dividends = dividends.drop(indx)

		# Calculate the yearly dividends by summing the dividends for each year.
		yearly_dividends = dividends.groupby(dividends.index.year).sum().sort_index(ascending=True)
		# print(f"Yearly Dividends: {yearly_dividends}")

		# Calculate the growth rates for each year.
		dividend_growth_rates = yearly_dividends.diff()

		last_five_years_growth_rates = dividend_growth_rates[-5:]
		print(f"Dividend Growth Rates: {last_five_years_growth_rates}\n")
		return last_five_years_growth_rates.mean()

def get_annualized_dividends(dividends) -> tuple[float, float]:
	"""
	Calculate the dividend growth rate based on the provided dividends. Annualizes the ttm if dividens are not annual.

	-- Display the last 8 dividends along with this incase there are outliers that influence the growth rate.

	Parameters:
	dividends : pd.Series
		A pandas Series containing dividend values.

	Returns:
	tuple[float, float]
		A tuple containing:
			- The number of yearly dividends (1, 2, or 4)
			- The trailing twelve months (ttm) dividend
	"""
	if dividends.empty:
		return 0.0
	else:
		# Find the number of dividends that pay each year.
		last_years_dividends = []
		last_year = datetime.now().year - 1
		for indx, d in dividends.items():
			if indx.date().year == last_year:
				last_years_dividends.append({"date": indx, "dividend": d})
		num_dividends = len(last_years_dividends)
		# print(f"Last Year's Dividends: {last_years_dividends}\nNum Dividends: {num_dividends}")

		'''
			Get the ttm by getting the last num dividends. Done this way because dividends aren't given on the same day each year, 
			so we can't just get the 12 months of dividends and assume there are 4 dividends. 

		'''

		print(f"Last 8 Dividends: {dividends.iloc[-8:]}\n\n")

		ttm_dividends = 0.0
		if (num_dividends == 4):
			ttm_dividends = dividends.iloc[-4:].sum()
			print(f"Trailing Twelve Months Dividends (Quarterly): {ttm_dividends}\n")
			return (num_dividends, ttm_dividends)
		
		elif (num_dividends == 1):
			ttm_dividends = dividends.iloc[-1]
			print(f"Trailing Twelve Months Dividends (Annual): {ttm_dividends}\n")
			return (num_dividends, ttm_dividends)
		
		elif (num_dividends == 2):
			ttm_dividends = dividends.iloc[-2:].sum()
			print(f"Trailing Twelve Months Dividends (Bi-annual): {ttm_dividends}\n")
			return (num_dividends, ttm_dividends)

		else:
			print(f"Unexpected number of dividends found: {num_dividends}.\n")
			ttm_dividends = dividends.iloc[-4:].sum()
			print(f"Trailing Twelve Months Dividends (Assumed Quarterly): {ttm_dividends}\n")
			return (-1, ttm_dividends)

def gordon_growth_model(ticker, ke):
	"""
	Gordon Growth Model for stock pricing.

	g is expected to be less than ke, otherwise the model will not be valid.

	Parameters:
	p0 : float
		Current stock price.
	g : float
		Expected growth rate of dividends.
	d : float
		Dividend expected in the next period.
	ke : float
		Required rate of return (cost of equity).

	Returns:
	float
		Theoretical stock price based on the Gordon Growth Model.
	"""

	data = yf.Ticker(ticker)
	if(data.info): # Accessing the info attribute to ensure data is fetched
		p0 = data.info.get('currentPrice', None)
		p1 = data.get_analyst_price_targets().get('median')

		dividends = data.get_dividends()
		annualized_div_tuple = get_annualized_dividends(dividends)
		print(f"Current Price: {p0}, Analyst Price Target: {p1}\n")
		num_annual_dividends = annualized_div_tuple[0]
		# print(f"Dividends expected each year: {num_annual_dividends}\n")
		g = get_expected_constant_growth_rate(dividends, annualized_div_tuple[0])

		start_date = datetime(datetime.now().year-1, 1, 1)
		dividends_last_year = dividends[dividends.index.year >= start_date.date().year]
		# print(f"Dividends last year: {dividends_last_year}")

		d = annualized_div_tuple[1]

		print(f"Expected Growth Rate: {g}, Dividend Expected Next Period: {d}, Required Rate of Return: {ke}\n")
		print(f"Theoretical Stock Price: {(p1 + d) / (1 + ke)}\n")

		return (p1 + d) / (1 + ke)
	else:
		print(f"Failed to fetch data for ticker: {ticker}")
		return None

def get_chain(ticker, expiry):
	return yf.Ticker(ticker).option_chain(expiry)

def main():
	script_name = sys.argv[0]
	args = sys.argv[1:]

	ke = float(args[0]) if len(args) > 0 else 0.1
	# chain = get_chain("APPL", "2026-07-30")
	# print(chain.calls.head())
	
	dat = yf.Ticker("MSFT")
	pprint(f"{dat}\n")
	# print(f"{dat.info}\n")
	# pprint(f"{dat.calendar}\n")
	# print(f"{dat.get_analyst_price_targets()['median']}\n")
	print(f"{dat.get_dividends()[70:90]}\n")
	
	# print(f"{dat.quarterly_income_stmt}\n")
	# print(f"{dat.history(period='1mo')}\n")

	one_period_valuation = gordon_growth_model(
		ticker="MSFT",
		ke=ke)


if __name__ == "__main__":
	main()





