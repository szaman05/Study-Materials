"use client";
import { useState } from "react";
import { Feature } from "./Feature";

interface PriceTableProps {
  name: string;
  price: number;
  yearlyPrice?: number;
  period: string;
  features: Array<{
    text: string;
    included: boolean;
  }>;
  showSale?: boolean;
}

export const PriceTable = ({
  name,
  price,
  yearlyPrice = price * 10, // Default yearly price with 2 months free
  period,
  features,
  showSale,
}: PriceTableProps) => {
  const [isYearly, setIsYearly] = useState(false);

  const handlePeriodChange = (yearly: boolean) => {
    setIsYearly(yearly);
  };

  const currentPrice = isYearly ? yearlyPrice : price;
  const currentPeriod = isYearly ? "year" : period;

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="tabs tabs-boxed justify-center p-2">
        <input
          type="radio"
          name="price"
          className="tab"
          aria-label="Monthly"
          onChange={() => handlePeriodChange(false)}
          checked={!isYearly}
        />
        <input
          type="radio"
          name="price"
          className="tab"
          aria-label="Yearly"
          onChange={() => handlePeriodChange(true)}
          checked={isYearly}
        />
      </div>
      <div className="card-body items-center text-center">
        <div className="flex flex-col gap-2">
          <h2 className="card-title">{name}</h2>
          <p className="text-3xl font-bold">
            ${currentPrice}
            <span className="text-sm font-normal">/{currentPeriod}</span>
          </p>
        </div>
        <div className="divider"></div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <Feature
              key={index}
              text={feature.text}
              included={feature.included}
            />
          ))}
        </ul>
        <div className="card-actions">
          <button className="btn btn-primary">Choose plan</button>
        </div>
      </div>
      {showSale && (
        <div className="absolute -top-2 right-2">
          <div className="badge badge-warning">SALE</div>
        </div>
      )}
    </div>
  );
};
