export const rooms = [
  {
    $id: '1',
    user_id: '1',
    name: 'Grand Conference Hall',
    description: 'A spacious room with modern amenities, suitable for large conferences and events.',
    sqft: 3000,
    capacity: 100,
    location: 'Building A, 3rd Floor',
    address: '555 California St, San Francisco, CA 94104',
    amenities: 'Projector, Whiteboard, Video Conferencing, Wi-Fi, Sound System',
    availability: '9 AM – 5 PM',
    price_per_hour: 150,
    image: 'room-1.jpg',
  },
  {
    $id: '2',
    user_id: '2',
    name: 'Executive Meeting Room',
    description: 'Professional meeting room ideal for board meetings, client pitches, and team discussions.',
    sqft: 500,
    capacity: 12,
    location: 'Building B, 2nd Floor',
    address: '123 Market St, San Francisco, CA 94105',
    amenities: 'Video Conferencing, Large Display, Coffee Service, Wi-Fi, Ergonomic Chairs',
    availability: '8 AM – 6 PM',
    price_per_hour: 75,
    image: 'room-2.jpg',
  },
  // ...additional rooms...
];

export const getRoom = (id) => {
  return rooms.find((room) => room.$id === id);
};

export const getAllRooms = () => {
  return rooms;
};
