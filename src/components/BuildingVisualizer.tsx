import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BuildingVisualizerProps {
  floors: number;
  roomsPerFloor: number;
}

// Mock room occupancy data (true = occupied, false = vacant)
const generateMockRoomData = (floors: number, roomsPerFloor: number) => {
  const data: boolean[][] = [];
  for (let i = 0; i < floors; i++) {
    const floorData: boolean[] = [];
    for (let j = 0; j < roomsPerFloor; j++) {
      floorData.push(Math.random() > 0.4); // 60% occupied
    }
    data.push(floorData);
  }
  return data;
};

const BuildingVisualizer = ({ floors, roomsPerFloor }: BuildingVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const roomData = generateMockRoomData(floors, roomsPerFloor);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Building dimensions
    const buildingWidth = width * 0.6;
    const buildingHeight = height * 0.8;
    const startX = (width - buildingWidth) / 2;
    const startY = (height - buildingHeight) / 2 + 40;

    // Floor height
    const floorHeight = buildingHeight / floors;
    const roomWidth = buildingWidth / roomsPerFloor;

    // Draw building outline
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 3;
    ctx.strokeRect(startX, startY, buildingWidth, buildingHeight);

    // Draw floors and rooms
    for (let floor = 0; floor < floors; floor++) {
      const floorY = startY + floor * floorHeight;

      // Draw floor line
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startX, floorY);
      ctx.lineTo(startX + buildingWidth, floorY);
      ctx.stroke();

      // Floor label
      ctx.fillStyle = "#475569";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText(`Floor ${floors - floor}`, startX - 60, floorY + floorHeight / 2);

      // Draw rooms
      for (let room = 0; room < roomsPerFloor; room++) {
        const roomX = startX + room * roomWidth;
        const isOccupied = roomData[floor][room];

        // Room background
        ctx.fillStyle = isOccupied ? "#fef2f2" : "#f0fdf4";
        ctx.fillRect(roomX + 5, floorY + 5, roomWidth - 10, floorHeight - 10);

        // Room border
        ctx.strokeStyle = isOccupied ? "#ef4444" : "#22c55e";
        ctx.lineWidth = 2;
        ctx.strokeRect(roomX + 5, floorY + 5, roomWidth - 10, floorHeight - 10);

        // Room number
        const roomNumber = (floors - floor) * 100 + room + 1;
        ctx.fillStyle = isOccupied ? "#ef4444" : "#22c55e";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
          `${roomNumber}`,
          roomX + roomWidth / 2,
          floorY + floorHeight / 2 - 10
        );

        // Status text
        ctx.font = "10px sans-serif";
        ctx.fillText(
          isOccupied ? "Occupied" : "Vacant",
          roomX + roomWidth / 2,
          floorY + floorHeight / 2 + 10
        );
      }
    }

    // Draw ground
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(startX - 20, startY + buildingHeight, buildingWidth + 40, 10);

    // Building label
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Building Layout", width / 2, startY - 20);
  }, [floors, roomsPerFloor]);

  const occupiedCount = roomData.flat().filter((room) => room).length;
  const totalRooms = floors * roomsPerFloor;

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-center mb-4">
        <Badge className="bg-success">
          <div className="w-3 h-3 rounded-full bg-success-foreground mr-2" />
          Vacant Rooms
        </Badge>
        <Badge variant="destructive">
          <div className="w-3 h-3 rounded-full bg-destructive-foreground mr-2" />
          Occupied Rooms
        </Badge>
      </div>

      <Card className="p-4 bg-muted/50">
        <canvas
          ref={canvasRef}
          width={600}
          height={500}
          className="w-full h-auto"
        />
      </Card>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-2xl font-bold">{totalRooms}</p>
          <p className="text-sm text-muted-foreground">Total Rooms</p>
        </div>
        <div className="p-3 rounded-lg bg-success/10">
          <p className="text-2xl font-bold text-success">{totalRooms - occupiedCount}</p>
          <p className="text-sm text-muted-foreground">Vacant</p>
        </div>
        <div className="p-3 rounded-lg bg-destructive/10">
          <p className="text-2xl font-bold text-destructive">{occupiedCount}</p>
          <p className="text-sm text-muted-foreground">Occupied</p>
        </div>
      </div>
    </div>
  );
};

export default BuildingVisualizer;
