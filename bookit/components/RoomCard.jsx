"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const RoomCard = ({ room }) => {
  const {
    $id,
    name,
    address,
    city,
    state,
    zipCode,
    images,
    price_per_hour,
    availability,
  } = room;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Room Image */}
        <div className="md:w-1/3 h-48 md:h-full relative">
          <div className="w-full h-full relative">
            <Image 
              src={images?.[0] || "/images/default-room.jpg"} 
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        {/* Room Information */}
        <div className="p-4 md:w-2/3 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-gray-600 mb-2">
              {address}, {city}, {state} {zipCode}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              Availability: {availability}
            </p>
            <div className="flex items-center text-gray-600 text-sm">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.171-.879-1.172-2.303 0-3.182C10.536 9.219 11.768 9 12 9c.725 0 1.45.22 2.003.659" />
                </svg>
                ${price_per_hour}/hour
              </div>
            </div>
          </div>
          <div className="mt-4 text-right">
            <Link href={`/rooms/${$id}`} passHref>
              <span className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded inline-block">
                View Room
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
