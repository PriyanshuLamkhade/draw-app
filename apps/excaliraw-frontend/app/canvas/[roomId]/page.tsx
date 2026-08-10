import RoomCanvas from "@/components/RoomCanvas";


export default async function CanvasPage({ params }: {
    params: Promise<{
        roomId: string
    }>
}) {
    const roomId = Number((await params).roomId);

    return <RoomCanvas roomId={roomId} />
   
}