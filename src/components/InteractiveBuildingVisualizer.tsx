import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Phone, Mail, CheckCircle, AlertCircle } from "lucide-react";

interface Occupant {
  name: string;
  email: string;
  phone?: string;
  rentPaid: boolean;
}

interface Room {
  roomNo: string;
  occupants: Occupant[];
}

interface Floor {
  floorNo: number;
  rooms: Room[];
}

interface BuildingData {
  floors: Floor[];
}

interface InteractiveBuildingVisualizerProps {
  buildingData: BuildingData;
}

const InteractiveBuildingVisualizer = ({ buildingData }: InteractiveBuildingVisualizerProps) => {
  const [hoveredRoom, setHoveredRoom] = useState<{ room: Room; position: { x: number; y: number } } | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const getRoomStatus = (room: Room) => {
    if (room.occupants.length === 0) return 'vacant';
    const paidCount = room.occupants.filter(o => o.rentPaid).length;
    if (paidCount === room.occupants.length) return 'paid';
    if (paidCount === 0) return 'pending';
    return 'partial';
  };

  const getRoomColor = (status: string) => {
    switch (status) {
      case 'vacant': return 'bg-gray-200 border-gray-300';
      case 'paid': return 'bg-green-400 border-green-600';
      case 'partial': return 'bg-yellow-400 border-yellow-600';
      case 'pending': return 'bg-red-400 border-red-600';
      default: return 'bg-gray-200 border-gray-300';
    }
  };

  const handleRoomHover = (room: Room, event: React.MouseEvent) => {
    setHoveredRoom({ room, position: { x: event.clientX, y: event.clientY } });
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setHoveredRoom(null);
  };

  const markPaymentReceived = (roomNo: string, occupantEmail: string) => {
    // In real app, this would call API to update payment status
    console.log(`Marking payment received for ${occupantEmail} in room ${roomNo}`);
  };

  if (!buildingData || buildingData.floors.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No building data available</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex gap-4 justify-center mb-4 flex-wrap">
        <Badge className="bg-green-400 text-green-900">All Paid</Badge>
        <Badge className="bg-yellow-400 text-yellow-900">Partially Paid</Badge>
        <Badge className="bg-red-400 text-red-900">Pending</Badge>
        <Badge className="bg-gray-200 text-gray-700">Vacant</Badge>
      </div>

      {/* Building Visualization */}
      <Card className="p-6 bg-gradient-to-b from-blue-50 to-teal-50">
        <div className="relative">
          {buildingData.floors.map((floor, floorIndex) => {
            const maxRoomsPerFloor = Math.max(...buildingData.floors.map(f => f.rooms.length));
            
            return (
              <div key={floor.floorNo} className="mb-8">
                {/* Floor Label */}
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded font-semibold mr-4">
                    Floor {floor.floorNo}
                  </div>
                </div>
                
                {/* Rooms */}
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${maxRoomsPerFloor}, 1fr)` }}>
                  {Array.from({ length: maxRoomsPerFloor }, (_, roomIndex) => {
                    const room = floor.rooms[roomIndex];
                    
                    if (!room) {
                      return <div key={roomIndex} className="w-16 h-16" />;
                    }
                    
                    const status = getRoomStatus(room);
                    const colorClass = getRoomColor(status);
                    
                    return (
                      <div
                        key={room.roomNo}
                        className={`w-16 h-16 border-2 rounded cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg flex items-center justify-center ${colorClass}`}
                        onMouseEnter={(e) => handleRoomHover(room, e)}
                        onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
                        onMouseLeave={() => setHoveredRoom(null)}
                        onClick={() => handleRoomClick(room)}
                      >
                        <span className="text-xs font-bold text-gray-800">{room.roomNo}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Hover Tooltip */}
      {hoveredRoom && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 pointer-events-none"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="text-sm font-semibold mb-1">Room {hoveredRoom.room.roomNo}</div>
          <div className="text-xs text-gray-600 mb-1">
            Occupants: {hoveredRoom.room.occupants.length}
          </div>
          {hoveredRoom.room.occupants.length > 0 && (
            <div className="text-xs">
              {hoveredRoom.room.occupants.filter(o => o.rentPaid).length}/{hoveredRoom.room.occupants.length} paid
            </div>
          )}
        </div>
      )}

      {/* Room Details Modal */}
      <Dialog open={!!selectedRoom} onOpenChange={() => setSelectedRoom(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Room {selectedRoom?.roomNo}
              <Button variant="ghost" size="sm" onClick={() => setSelectedRoom(null)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedRoom?.occupants.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Room is vacant</p>
            ) : (
              selectedRoom?.occupants.map((occupant, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{occupant.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-3 w-3" />
                        {occupant.email}
                      </div>
                      {occupant.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {occupant.phone}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {occupant.rentPaid ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Paid
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {!occupant.rentPaid && (
                    <Button
                      size="sm"
                      onClick={() => markPaymentReceived(selectedRoom.roomNo, occupant.email)}
                      className="w-full mt-2"
                    >
                      Mark Payment Received
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InteractiveBuildingVisualizer;