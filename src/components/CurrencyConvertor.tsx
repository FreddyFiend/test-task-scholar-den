import fetcher from "@/lib/fetcher";
import React from "react";
import useSWR from "swr";

const CurrencyConvertor = ({
  base,
  symbols,
}: {
  base: string;
  symbols: string[];
}) => {
  const {
    data: currencies,
    error,
    isLoading,
  } = useSWR(
    `http://data.fixer.io/api/latest?access_key=ac804a13fa75bb231363ca117296991d&base=${base}&symbols=${symbols.join(
      ","
    )}`,
    fetcher
  );

  return (
    <div className="pt-2">
      {isLoading && <div className="p-4">Loading...</div>}

      <div className="font-semibold text-lg">
        Base Currency: <span className="font-bold"> {currencies?.base}</span>{" "}
      </div>
      <div>Date: {currencies?.date} </div>
      <div>
        {symbols.map((symbol, index) => (
          <p key={index}>
            <span> {symbol}:</span>
            <span className="font-semibold">
              {" "}
              {currencies?.rates[symbol]
                ? currencies?.rates[symbol]
                : "Not available"}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default CurrencyConvertor;
