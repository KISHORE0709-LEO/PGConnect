import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Phone, Mail, CheckCircle, AlertCircle, UserPlus } from "lucide-react";
import { useTenantData } from "@/hooks/useTenantData";
import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import AddTenantModal from "@/components/AddTenantModal";
import { sendRentReminder, makePhoneCall, sendWhatsAppMessage, generateRentReminderMessage } from "@/utils/notifications";

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
  buildingData?: BuildingData;
  pgId?: string;
  onDataChange?: () => void;
}

const InteractiveBuildingVisualizer = ({ buildingData, pgId, onDataChange }: InteractiveBuildingVisualizerProps) => {
  const { buildingData: fetchedData, loading, error } = useTenantData(pgId);
  const [currentData, setCurrentData] = useState<BuildingData | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<{ room: Room; position: { x: number; y: number } } | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const [selectedRoomForTenant, setSelectedRoomForTenant] = useState<string | null>(null);

  useEffect(() => {
    setCurrentData(fetchedData || buildingData || null);
  }, [fetchedData, buildingData]);

  const getRoomStatus = (room: Room) => {
    if (room.occupants.length === 0) return 'vacant';
    const paidCount = room.occupants.filter(o => o.rentPaid).length;
    if (paidCount === room.occupants.length) return 'paid';
    if (paidCount === 0) return 'pending';
    return 'partial';
  };

  const getRoomCapacityInfo = (room: Room) => {
    const capacity = 3; // Assume triple sharing
    const occupied = room.occupants.length;
    const available = capacity - occupied;
    return { capacity, occupied, available };
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

  const markPaymentReceived = async (roomNo: string, occupantEmail: string) => {
    if (!pgId) return;
    try {
      // Update local state
      setCurrentData(prev => {
        if (!prev) return prev;
        const updatedFloors = prev.floors.map(floor => ({
          ...floor,
          rooms: floor.rooms.map(room => {
            if (room.roomNo === roomNo) {
              return {
                ...room,
                occupants: room.occupants.map(occ =>
                  occ.email === occupantEmail ? { ...occ, rentPaid: true } : occ
                )
              };
            }
            return room;
          })
        }));
        return { floors: updatedFloors };
      });

      // Update Firestore
      const roomRef = doc(db, 'pgs', pgId, 'rooms', roomNo);
      const roomData = currentData?.floors.flatMap(f => f.rooms).find(r => r.roomNo === roomNo);
      if (roomData) {
        const updatedOccupants = roomData.occupants.map(occ =>
          occ.email === occupantEmail ? { ...occ, rentStatus: true } : occ
        );
        await updateDoc(roomRef, { occupants: updatedOccupants });
      }
    } catch (err) {
      console.error('Error updating payment status:', err);
    }
  };

  if (loading) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Loading building data...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <p className="text-red-500">{error}</p>
      </Card>
    );
  }

  if (!currentData || currentData.floors.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No building data available</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex gap-4 justify-center mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 border border-green-600 rounded"></div>
          <span className="text-sm font-medium">All Paid</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 border border-yellow-600 rounded"></div>
          <span className="text-sm font-medium">Partially Paid</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-400 border border-red-600 rounded"></div>
          <span className="text-sm font-medium">Rent Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded"></div>
          <span className="text-sm font-medium">Vacant</span>
        </div>
      </div>

      {/* Building Visualization */}
      <Card className="p-6 bg-gradient-to-b from-blue-50 to-teal-50">
        <div className="relative">
          {currentData.floors.map((floor, floorIndex) => {
            const maxRoomsPerFloor = Math.max(...currentData.floors.map(f => f.rooms.length));
            
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
                    
                    const { capacity, occupied, available } = getRoomCapacityInfo(room);
                    
                    return (
                      <div
                        key={room.roomNo}
                        className={`w-20 h-20 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg flex flex-col items-center justify-center relative ${colorClass}`}
                        onMouseEnter={(e) => handleRoomHover(room, e)}
                        onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
                        onMouseLeave={() => setHoveredRoom(null)}
                        onClick={() => handleRoomClick(room)}
                      >
                        <span className="text-xs font-bold text-gray-800 mb-1">{room.roomNo}</span>
                        <div className="text-xs text-gray-600 font-medium">
                          {occupied}/{capacity}
                        </div>
                        {occupied > 0 && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-bold">{occupied}</span>
                          </div>
                        )}
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
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 pointer-events-none max-w-xs"
          style={{
            left: mousePosition.x + 15,
            top: mousePosition.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="text-sm font-semibold mb-2 text-gray-800">Room {hoveredRoom.room.roomNo} — Triple Sharing</div>
          
          {hoveredRoom.room.occupants.length === 0 ? (
            <div className="text-xs text-gray-500">
              <div className="mb-1">Empty Slot — Add Tenant ➕</div>
              <div className="mb-1">Empty Slot — Add Tenant ➕</div>
              <div>Empty Slot — Add Tenant ➕</div>
            </div>
          ) : (
            <div className="space-y-1">
              {hoveredRoom.room.occupants.map((occupant, idx) => (
                <div key={idx} className="text-xs flex items-center justify-between">
                  <span className="font-medium">{idx + 1}. {occupant.name}</span>
                  <span className={`ml-2 ${occupant.rentPaid ? 'text-green-600' : 'text-red-600'}`}>
                    {occupant.rentPaid ? '✅' : '❌'}
                  </span>
                </div>
              ))}
              {Array.from({ length: 3 - hoveredRoom.room.occupants.length }, (_, idx) => (
                <div key={`empty-${idx}`} className="text-xs text-gray-400">
                  {hoveredRoom.room.occupants.length + idx + 1}. Empty Slot — Add Tenant ➕
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
            Click for details and actions
          </div>
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
              <div className="text-center py-6">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <UserPlus className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-2">Room is vacant</p>
                  <p className="text-sm text-gray-400">Triple sharing capacity available</p>
                </div>
                <Button
                  onClick={() => {
                    setSelectedRoomForTenant(selectedRoom.roomNo);
                    setShowAddTenantModal(true);
                  }}
                  className="w-full"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add First Tenant
                </Button>
              </div>
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

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {occupant.phone && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => makePhoneCall(occupant.phone!)}
                        className="flex-1"
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={async () => {
                        const result = await sendRentReminder(occupant.name, occupant.email, selectedRoom!.roomNo);
                        alert(result.message);
                      }}
                      className="flex-1"
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                    {occupant.phone && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const message = generateRentReminderMessage(occupant.name, selectedRoom!.roomNo, 15000);
                          sendWhatsAppMessage(occupant.phone!, message);
                        }}
                        className="col-span-2"
                      >
                        WhatsApp Reminder
                      </Button>
                    )}
                  </div>

                  {!occupant.rentPaid && (
                    <Button
                      size="sm"
                      onClick={() => {
                        markPaymentReceived(selectedRoom.roomNo, occupant.email);
                        alert(`Payment marked as received for ${occupant.name}`);
                      }}
                      className="w-full mt-2 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Mark Payment Received
                    </Button>
                  )}
                </div>
              ))
            )}
            
            {/* Add more tenants if room has capacity */}
            {selectedRoom && selectedRoom.occupants.length > 0 && selectedRoom.occupants.length < 3 && (
              <div className="mt-4 pt-4 border-t">
                <Button
                  onClick={() => {
                    setSelectedRoomForTenant(selectedRoom.roomNo);
                    setShowAddTenantModal(true);
                  }}
                  className="w-full"
                  variant="outline"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Another Tenant ({3 - selectedRoom.occupants.length} slots available)
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Tenant Modal */}
      {selectedRoomForTenant && (
        <AddTenantModal
          isOpen={showAddTenantModal}
          onClose={() => {
            setShowAddTenantModal(false);
            setSelectedRoomForTenant(null);
          }}
          pgId={pgId || ''}
          roomNo={selectedRoomForTenant}
          onTenantAdded={() => {
            onDataChange?.();
          }}
        />
      )}
    </div>
  );
};

export default InteractiveBuildingVisualizer;