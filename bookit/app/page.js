import React from 'react';
import RoomCard from '../components/RoomCard';
import getAllRooms from './actions/getAllrooms';

export const metadata = {
  title: 'Book IT - Find and Book Conference Rooms',
  description: 'Find and book the perfect conference room for your meetings, presentations, and events.'
};

export default async function Home() {
  const rooms = await getAllRooms();
  
  if (!Array.isArray(rooms) || rooms.length === 0) {
    return (
      <main>
        <div className="container mx-auto px-4 py-8">
          <section className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Find Your Perfect Conference Room</h1>
            <p className="text-gray-600">No rooms available at the moment.</p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <section className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Conference Room</h1>
          <p className="text-gray-600">Browse our selection of premium conference rooms and meeting spaces</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6">Available Rooms</h2>
          <div className="space-y-6">
            {rooms.map(room => (
              <RoomCard key={room.$id} room={room} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
