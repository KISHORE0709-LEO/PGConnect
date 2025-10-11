import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Phone, Mail, UserPlus, CheckCircle, AlertCircle } from "lucide-react";

interface SimpleBuildingViewProps {
  numFloors: number;
  roomsPerFloor: number;
}

const SimpleBuildingView = ({ numFloors, roomsPerFloor }: SimpleBuildingViewProps) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Sample data for demonstration
  const sampleTenants = [
    { name: 'Rahul Sharma', phone: '+91-9876543210', rentPaid: true },
    { name: 'Vivek Kumar', phone: '+91-9876543211', rentPaid: false },
    { name: 'Priya Singh', phone: '+91-9876543212', rentPaid: true },
  ];

  const getRoomData = (roomNo: string) => {
    const numOccupants = Math.floor(Math.random() * 4);
    return {
      roomNo,
      occupants: sampleTenants.slice(0, numOccupants),
      capacity: 3
    };
  };

  const getRoomColor = (occupants: any[]) => {
    if (occupants.length === 0) return 'bg-gray-200 border-gray-300';
    const paidCount = occupants.filter(o => o.rentPaid).length;
    if (paidCount === occupants.length) return 'bg-green-400 border-green-600';
    if (paidCount === 0) return 'bg-red-400 border-red-600';
    return 'bg-yellow-400 border-yellow-600';
  };

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex gap-4 justify-center flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 border border-green-600 rounded"></div>
          <span className="text-sm">All Paid</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 border border-yellow-600 rounded"></div>
          <span className="text-sm">Partial</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-400 border border-red-600 rounded"></div>
          <span className="text-sm">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded"></div>
          <span className="text-sm">Vacant</span>
        </div>
      </div>

      {/* Building Layout */}
      <Card className="p-6 bg-gradient-to-b from-blue-50 to-teal-50">
        {Array.from({ length: numFloors }, (_, floorIndex) => {
          const floorNo = numFloors - floorIndex;
          return (
            <div key={floorNo} className="mb-6">
              <div className="bg-blue-600 text-white px-3 py-1 rounded font-semibold mb-4 inline-block">
                Floor {floorNo}
              </div>
              <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${roomsPerFloor}, 1fr)` }}>
                {Array.from({ length: roomsPerFloor }, (_, roomIndex) => {
                  const roomNo = `R${floorNo}${String(roomIndex + 1).padStart(2, '0')}`;
                  const roomData = getRoomData(roomNo);
                  const colorClass = getRoomColor(roomData.occupants);
                  
                  return (
                    <div
                      key={roomNo}
                      className={`w-20 h-20 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg flex flex-col items-center justify-center relative ${colorClass}`}
                      onMouseEnter={(e) => {
                        setHoveredRoom(roomNo);
                        setMousePos({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                      onMouseLeave={() => setHoveredRoom(null)}
                      onClick={() => setSelectedRoom(roomNo)}
                    >
                      <span className="text-xs font-bold text-gray-800 mb-1">{roomNo}</span>
                      <div className="text-xs text-gray-600 font-medium">
                        {roomData.occupants.length}/{roomData.capacity}
                      </div>
                      {roomData.occupants.length > 0 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">{roomData.occupants.length}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Card>

      {/* Hover Tooltip */}
      {hoveredRoom && (
        <div className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 pointer-events-none max-w-xs"
             style={{ left: mousePos.x + 10, top: mousePos.y - 10, transform: 'translateY(-100%)' }}>
          <div className="text-sm font-semibold mb-2">Room {hoveredRoom} — Triple Sharing</div>
          {getRoomData(hoveredRoom).occupants.length === 0 ? (
            <div className="text-xs text-gray-500">
              <div>1. Empty Slot — Add Tenant ➕</div>
              <div>2. Empty Slot — Add Tenant ➕</div>
              <div>3. Empty Slot — Add Tenant ➕</div>
            </div>
          ) : (
            <div className="space-y-1">
              {getRoomData(hoveredRoom).occupants.map((tenant, idx) => (
                <div key={idx} className="text-xs flex items-center justify-between">
                  <span>{idx + 1}. {tenant.name}</span>
                  <span className={tenant.rentPaid ? 'text-green-600' : 'text-red-600'}>
                    {tenant.rentPaid ? '✅' : '❌'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Room Details Modal */}
      <Dialog open={!!selectedRoom} onOpenChange={() => setSelectedRoom(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Room {selectedRoom}</DialogTitle>
          </DialogHeader>
          
          {selectedRoom && (
            <div className="space-y-4">
              {getRoomData(selectedRoom).occupants.length === 0 ? (
                <div className="text-center py-6">
                  <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Room is vacant</p>
                  <Button className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add First Tenant
                  </Button>
                </div>
              ) : (
                getRoomData(selectedRoom).occupants.map((tenant, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{tenant.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {tenant.phone}
                        </div>
                      </div>
                      <Badge className={tenant.rentPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {tenant.rentPaid ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Paid
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Pending
                          </>
                        )}
                      </Badge>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" onClick={() => window.location.href = `tel:${tenant.phone}`}>
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => alert(`Reminder sent to ${tenant.name}!`)}>
                        <Mail className="h-3 w-3 mr-1" />
                        Remind
                      </Button>
                    </div>

                    {!tenant.rentPaid && (
                      <Button size="sm" className="w-full mt-2 bg-green-600 hover:bg-green-700">
                        Mark Payment Received
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SimpleBuildingView;