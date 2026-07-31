import yfinance as yf;
import pandas as pd;
import numpy as np;


def get_chain(ticker, expiry):
	return yf.Ticker(ticker).option_chain(expiry)

def main():
	# chain = get_chain("APPL", "2026-07-30")
	# print(chain.calls.head())
	
	dat = yf.Ticker("MSFT")
	# print(f"{dat.info}\n")
	# print(f"{dat.calendar}\n")
	# print(f"{dat.analyst_price_targets}\n")
	# print(f"{dat.quarterly_income_stmt}\n")
	# print(f"{dat.history(period='1mo')}\n")
	print(f"{dir(dat.option_chain(dat.options[0]).calls)}\n")
	print(f"{dat.news[0]}\n")

if __name__ == "__main__":
	main()

