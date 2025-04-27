import getAllRooms from 'app/actions/getAllRooms';

const RoomsPage = async () => {
  try {
    const rooms = await getAllRooms();

    if (!Array.isArray(rooms) || rooms.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">No Rooms Available</h1>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Available Rooms</h1>
        <ul className="space-y-4">
          {rooms.map((room) => (
            <li key={room.id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{room.name}</h2>
              <p>{room.description}</p>
              <p>
                <strong>Location:</strong> {room.location}
              </p>
              <p>
                <strong>Address:</strong> {room.address}
              </p>
              <p>
                <strong>Capacity:</strong> {room.capacity} people
              </p>
              <p>
                <strong>Size:</strong> {room.sqft} sqft
              </p>
              <p>
                <strong>Amenities:</strong> {room.amenities}
              </p>
              <p>
                <strong>Availability:</strong> {room.availability}
              </p>
              <p>
                <strong>Price:</strong> ${room.price_per_hour}/hour
              </p>
              <img
                src={`/images/${room.image}`}
                alt={room.name}
                className="w-full h-48 object-cover rounded"
              />
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Failed to load rooms</h1>
      </div>
    );
  }
};

export default RoomsPage;
