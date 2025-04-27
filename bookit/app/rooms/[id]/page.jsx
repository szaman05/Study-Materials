import Image from 'next/image';
import getSingleRoom from '@/app/actions/getSingleRoom';

export default async function RoomDetails({ params: { id } }) {
  if (!id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Invalid room ID</h1>
      </div>
    );
  }

  const room = await getSingleRoom(id);

  if (!room) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Room not found</h1>
      </div>
    );
  }

  // Ensure all required properties have fallback values
  const {
    name = 'Untitled Room',
    image = '/images/placeholder.jpg',
    address = 'Address not available',
    location = 'Location not specified',
    availability = 'Not specified',
    capacity = 0,
    price_per_hour = 0,
    description = 'No description available',
    amenities = ''
  } = room;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Image and Basic Info */}
        <div>
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
            <Image
              src={image || '/images/placeholder.jpg'}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold mb-4">{name}</h1>
            <p className="text-gray-600 mb-4">{address}</p>
            <p className="text-gray-600 mb-4">{location}</p>
            <div className="flex items-center text-gray-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Available: {availability}
            </div>
            <div className="flex items-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Capacity: {capacity} people
            </div>
          </div>
        </div>

        {/* Right Column - Booking and Details */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
            <div className="text-3xl font-bold text-blue-600 mb-4">
              ${price_per_hour}/hour
            </div>
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
              Book Now
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">About this room</h2>
            <p className="text-gray-600 mb-6">{description}</p>
            
            <h3 className="text-xl font-semibold mb-3">Amenities</h3>
            <ul className="grid grid-cols-2 gap-2">
              {amenities && amenities.split(', ').filter(Boolean).map((amenity, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
