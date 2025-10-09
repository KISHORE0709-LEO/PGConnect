import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface ActualBuildingVisualizerProps {
  floors: Floor[];
  onRoomClick?: (floorId: string, roomId: string) => void;
}

const ActualBuildingVisualizer = ({ floors, onRoomClick }: ActualBuildingVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || floors.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const buildingWidth = width * 0.8;
    const buildingHeight = height * 0.8;
    const startX = (width - buildingWidth) / 2;
    const startY = 60;

    const floorHeight = buildingHeight / floors.length;
    const maxRoomsPerFloor = Math.max(...floors.map(f => f.rooms.length));

    // Building outline
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 3;
    ctx.strokeRect(startX, startY, buildingWidth, buildingHeight);

    floors.forEach((floor, floorIndex) => {
      const floorY = startY + (floors.length - floor.number) * floorHeight;
      const roomWidth = buildingWidth / maxRoomsPerFloor;

      // Floor line
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startX, floorY);
      ctx.lineTo(startX + buildingWidth, floorY);
      ctx.stroke();

      // Floor label
      ctx.fillStyle = "#475569";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`Floor ${floor.number}`, startX - 80, floorY + floorHeight / 2);

      // Draw actual rooms
      floor.rooms.forEach((room, roomIndex) => {
        const roomX = startX + roomIndex * roomWidth;
        const padding = 8;
        const isOccupied = room.isOccupied || Math.random() > 0.6;

        // Room background
        ctx.fillStyle = isOccupied ? "#fef2f2" : "#f0fdf4";
        ctx.fillRect(roomX + padding, floorY + padding, roomWidth - padding * 2, floorHeight - padding * 2);

        // Room border
        ctx.strokeStyle = isOccupied ? "#ef4444" : "#22c55e";
        ctx.lineWidth = 2;
        ctx.strokeRect(roomX + padding, floorY + padding, roomWidth - padding * 2, floorHeight - padding * 2);

        // Room details
        ctx.textAlign = "center";
        ctx.fillStyle = isOccupied ? "#ef4444" : "#22c55e";
        ctx.font = "bold 12px sans-serif";
        ctx.fillText(room.number, roomX + roomWidth / 2, floorY + floorHeight / 2 - 20);

        ctx.font = "10px sans-serif";
        ctx.fillStyle = "#6b7280";
        ctx.fillText(`${room.sharing}-sharing`, roomX + roomWidth / 2, floorY + floorHeight / 2 - 5);
        ctx.fillText(`₹${room.rent.toLocaleString()}`, roomX + roomWidth / 2, floorY + floorHeight / 2 + 8);

        ctx.font = "9px sans-serif";
        ctx.fillStyle = isOccupied ? "#ef4444" : "#22c55e";
        ctx.fillText(isOccupied ? "Occupied" : "Vacant", roomX + roomWidth / 2, floorY + floorHeight / 2 + 22);
      });
    });

    // Ground
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(startX - 20, startY + buildingHeight, buildingWidth + 40, 10);

    // Title
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Your Building Layout", width / 2, 30);

  }, [floors]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onRoomClick || floors.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);

    const buildingWidth = canvas.width * 0.8;
    const buildingHeight = canvas.height * 0.8;
    const startX = (canvas.width - buildingWidth) / 2;
    const startY = 60;
    const floorHeight = buildingHeight / floors.length;
    const maxRoomsPerFloor = Math.max(...floors.map(f => f.rooms.length));

    floors.forEach((floor) => {
      const floorY = startY + (floors.length - floor.number) * floorHeight;
      const roomWidth = buildingWidth / maxRoomsPerFloor;

      floor.rooms.forEach((room, roomIndex) => {
        const roomX = startX + roomIndex * roomWidth;
        const padding = 8;

        if (x >= roomX + padding && x <= roomX + roomWidth - padding &&
            y >= floorY + padding && y <= floorY + floorHeight - padding) {
          onRoomClick(floor.id, room.id);
        }
      });
    });
  };

  if (floors.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Configure your building to see the visualization</p>
      </Card>
    );
  }

  const totalRooms = floors.reduce((sum, floor) => sum + floor.rooms.length, 0);
  const totalCapacity = floors.reduce((sum, floor) => 
    sum + floor.rooms.reduce((roomSum, room) => roomSum + room.sharing, 0), 0
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-center mb-4">
        <Badge className="bg-success">Vacant Rooms</Badge>
        <Badge variant="destructive">Occupied Rooms</Badge>
      </div>

      <Card className="p-4 bg-muted/50">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="w-full h-auto cursor-pointer"
          onClick={handleCanvasClick}
        />
      </Card>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-2xl font-bold">{totalRooms}</p>
          <p className="text-sm text-muted-foreground">Total Rooms</p>
        </div>
        <div className="p-3 rounded-lg bg-primary/10">
          <p className="text-2xl font-bold text-primary">{totalCapacity}</p>
          <p className="text-sm text-muted-foreground">Max Capacity</p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-2xl font-bold">{floors.length}</p>
          <p className="text-sm text-muted-foreground">Floors</p>
        </div>
      </div>
    </div>
  );
};

export default ActualBuildingVisualizer;