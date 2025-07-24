import { Badge, Button } from "@mantine/core";
import dayjs from "dayjs";

interface CheckInCardProps {
    onClick: () => void;
    checkInDate: string;
    activityCount: number;
}

export function CheckInCard({ checkInDate, onClick, activityCount }: CheckInCardProps) {
    return (
        <Button
            style={{
                boxShadow: `4px 4px 0px black`,
            }}
            onClick={onClick}
            w={160}
            key={checkInDate}
            variant="outline"
            color="black"
            radius="md"
            leftSection={
                <Badge size="xs" color="blue">{activityCount}</Badge>
            }
        >
            {dayjs(checkInDate, 'MM-DD-YYYY').format('MMMM DD')}
        </Button>
    )
}