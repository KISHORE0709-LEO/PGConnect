import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Building2 } from "lucide-react";

interface Room {
  id: string;
  number: string;
  sharing: number;
  rent: number;
}

interface Floor {
  id: string;
  number: number;
  rooms: Room[];
}

interface FlexibleBuildingConfigProps {
  onSave: (floors: Floor[]) => void;
}

const FlexibleBuildingConfig = ({ onSave }: FlexibleBuildingConfigProps) => {
  const [floors, setFloors] = useState<Floor[]>([
    {
      id: "1",
      number: 1,
      rooms: [{ id: "101", number: "101", sharing: 1, rent: 10000 }]
    }
  ]);

  const addFloor = () => {
    const newFloorNum = floors.length + 1;
    setFloors([...floors, {
      id: newFloorNum.toString(),
      number: newFloorNum,
      rooms: [{ id: `${newFloorNum}01`, number: `${newFloorNum}01`, sharing: 1, rent: 10000 }]
    }]);
  };

  const removeFloor = (floorId: string) => {
    setFloors(floors.filter(f => f.id !== floorId));
  };

  const addRoom = (floorId: string) => {
    setFloors(floors.map(floor => {
      if (floor.id === floorId) {
        const roomNum = floor.rooms.length + 1;
        const roomNumber = `${floor.number}${roomNum.toString().padStart(2, '0')}`;
        return {
          ...floor,
          rooms: [...floor.rooms, { id: roomNumber, number: roomNumber, sharing: 1, rent: 10000 }]
        };
      }
      return floor;
    }));
  };

  const removeRoom = (floorId: string, roomId: string) => {
    setFloors(floors.map(floor => {
      if (floor.id === floorId) {
        return { ...floor, rooms: floor.rooms.filter(r => r.id !== roomId) };
      }
      return floor;
    }));
  };

  const updateRoom = (floorId: string, roomId: string, field: keyof Room, value: any) => {
    setFloors(floors.map(floor => {
      if (floor.id === floorId) {
        return {
          ...floor,
          rooms: floor.rooms.map(room => 
            room.id === roomId ? { ...room, [field]: value } : room
          )
        };
      }
      return floor;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Configure Your Building</h2>
        <p className="text-muted-foreground">Set up floors and rooms exactly as they are in your building</p>
      </div>

      {floors.map((floor) => (
        <Card key={floor.id} className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              <h3 className="font-semibold">Floor {floor.number}</h3>
              <Badge>{floor.rooms.length} rooms</Badge>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => addRoom(floor.id)}>
                <Plus className="h-4 w-4" />
              </Button>
              {floors.length > 1 && (
                <Button size="sm" variant="destructive" onClick={() => removeFloor(floor.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {floor.rooms.map((room) => (
              <div key={room.id} className="grid grid-cols-4 gap-3 items-center p-3 border rounded">
                <div>
                  <Label className="text-xs">Room No.</Label>
                  <Input
                    value={room.number}
                    onChange={(e) => updateRoom(floor.id, room.id, 'number', e.target.value)}
                    className="h-8"
                  />
                </div>
                
                <div>
                  <Label className="text-xs">Sharing</Label>
                  <Select
                    value={room.sharing.toString()}
                    onValueChange={(v) => updateRoom(floor.id, room.id, 'sharing', parseInt(v))}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (Single)</SelectItem>
                      <SelectItem value="2">2 (Double)</SelectItem>
                      <SelectItem value="3">3 (Triple)</SelectItem>
                      <SelectItem value="4">4 (Quad)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs">Rent/Month</Label>
                  <Input
                    type="number"
                    value={room.rent}
                    onChange={(e) => updateRoom(floor.id, room.id, 'rent', parseInt(e.target.value))}
                    className="h-8"
                  />
                </div>

                <div className="flex justify-end">
                  {floor.rooms.length > 1 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeRoom(floor.id, room.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      <div className="flex gap-4">
        <Button onClick={addFloor} variant="outline" className="flex-1">
          <Plus className="h-4 w-4 mr-2" />
          Add Floor
        </Button>
        <Button onClick={() => onSave(floors)} className="flex-1">
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default FlexibleBuildingConfig;