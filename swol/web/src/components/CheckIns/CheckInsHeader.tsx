import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Title } from "@mantine/core";
import { ResponsiveButton } from "../ui/ResponsiveButton";

interface CheckInsHeaderProps {
    hasCheckIns: boolean;
    onAddCheckIn: () => void;
}

export function CheckInsHeader({ onAddCheckIn, hasCheckIns }: CheckInsHeaderProps) {

    return (
        <Flex justify="space-between" align="center" mt="xl">
            <Title>Your Check Ins</Title>
            <Flex gap={8} align="center">
                {/* {selectedCheckIn && (
                   <ResponsiveButton
                     color="red"
                     icon={<FontAwesomeIcon icon={faTrashCan} size="lg" />}
                     onClick={removeModal.open}
                     label="Remove Check In"
                   />
                 )} */}
                {hasCheckIns && (
                    <ResponsiveButton
                        icon={<FontAwesomeIcon icon={faPlus} size="lg" />}
                        onClick={onAddCheckIn}
                        label="New Check In"
                    />
                )}
            </Flex>
        </Flex>
    );
}