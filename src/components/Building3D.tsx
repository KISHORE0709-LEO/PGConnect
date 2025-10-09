import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Suspense } from 'react';

interface Room {
  id: string;
  number: string;
  sharing: number;
  rent: number;
  isOccupied?: boolean;
}

interface Floor {
  id: string;
  number: number;
  rooms: Room[];
}

interface Building3DProps {
  floors: Floor[];
}

const Room3D = ({ position, room, floorNumber }: { position: [number, number, number], room: Room, floorNumber: number }) => {
  const color = room.isOccupied ? '#ef4444' : '#22c55e';
  
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.8, 2, 1.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Html position={[0, 1.2, 0]} center>
        <div className="bg-white px-2 py-1 rounded shadow text-xs font-semibold text-center">
          <div>{room.number}</div>
          <div className="text-gray-600">{room.sharing}-sharing</div>
        </div>
      </Html>
    </group>
  );
};

const Floor3D = ({ floor, floorIndex }: { floor: Floor, floorIndex: number }) => {
  const floorY = floorIndex * 2.5;
  const roomsPerRow = Math.ceil(Math.sqrt(floor.rooms.length));
  
  return (
    <group position={[0, floorY, 0]}>
      {/* Floor base */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <boxGeometry args={[roomsPerRow * 2.2, 0.1, roomsPerRow * 2.2]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      
      {/* Rooms */}
      {floor.rooms.map((room, roomIndex) => {
        const row = Math.floor(roomIndex / roomsPerRow);
        const col = roomIndex % roomsPerRow;
        const x = (col - (roomsPerRow - 1) / 2) * 2.2;
        const z = (row - (Math.ceil(floor.rooms.length / roomsPerRow) - 1) / 2) * 2.2;
        
        return (
          <Room3D
            key={room.id}
            position={[x, 0, z]}
            room={room}
            floorNumber={floor.number}
          />
        );
      })}
      
      {/* Floor label */}
      <Html position={[-roomsPerRow * 1.3, 0, 0]} center>
        <div className="bg-blue-600 text-white px-3 py-1 rounded font-semibold">
          Floor {floor.number}
        </div>
      </Html>
    </group>
  );
};

const Building3D = ({ floors }: Building3DProps) => {
  if (!floors || floors.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Configure your building to see 3D visualization</p>
      </div>
    );
  }

  return (
    <div className="w-full h-96 bg-gradient-to-b from-blue-50 to-teal-50 rounded-lg overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [10, 8, 10], fov: 60 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          {/* Building */}
          <group>
            {floors.map((floor, index) => (
              <Floor3D key={floor.id} floor={floor} floorIndex={index} />
            ))}
          </group>
          
          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Building3D;