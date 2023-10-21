"use client";

import React from "react";
import { useState } from "react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import CurrencyConvertor from "./CurrencyConvertor";

type CountryType = {
  name: {
    common: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  message: string;
};

type ErrorResponse = {
  message: string;
  _links: {
    self: {
      href: string;
      templated: boolean;
    };
  };
};

export default function CountrySearch() {
  const [searchCountry, setSearchCountry] = useState("");
  const [includedCurrencies, setIncludedCurrencies] = useState<string[]>([]);
  const [showCurrencies, setShowCurrencies] = useState(false);

  const onAddCurrency = (newCurrency: string) => {
    if (!includedCurrencies.includes(newCurrency)) {
      setIncludedCurrencies((prevState) => [newCurrency, ...prevState]);
    }
  };

  const { data: countries, isLoading } = useSWR<CountryType[]>(
    `https://restcountries.com/v3.1/name/${
      searchCountry ? searchCountry : "pakistan"
    }?fields=name,currencies`,
    fetcher
  );

  return (
    <div>
      <input
        className="px-2 py-1 border-black border my-2"
        value={searchCountry}
        onChange={(e) => setSearchCountry(e.target.value)}
        placeholder="Country name"
        type="text"
        name="Country search"
        required
      />
      <div onClick={() => setSearchCountry("")} className="p-2 bg-red-300 my-2">
        X Clear Search
      </div>

      <div className="py-2">
        <p className=" text-lg font-bold">Selected Currencies:</p>
        <div className="flex">
          {includedCurrencies.length < 1
            ? "Please select a currency to convert!"
            : includedCurrencies.map((currency) => (
                <div key={currency}>
                  <div className={`p-1 bg-slate-200 rounded-sm m-1`}>
                    {currency}
                  </div>
                </div>
              ))}
        </div>
      </div>

      {isLoading && <div>loading...</div>}
      {countries?.map((country, index) => (
        <div key={index}>
          <div className="text-lg font-bold">{country.name.common} </div>
          <div className="flex">
            {" "}
            <p className="font-semibold">Currencies: </p>
            {country &&
              Object.keys(country.currencies).map((currency) => (
                <div
                  key={currency}
                  onClick={() => onAddCurrency(currency)}
                  className="rounded p-1 bg-green-200 m-1"
                >
                  {currency} +
                </div>
              ))}{" "}
          </div>
        </div>
      ))}

      {/*  */}
      <button
        onClick={() => {
          if (includedCurrencies.length > 0) {
            setShowCurrencies(true);
          }
        }}
      >
        Convert Currencies
      </button>
      {showCurrencies && (
        <CurrencyConvertor base={"EUR"} symbols={includedCurrencies} />
      )}
    </div>
  );
}
