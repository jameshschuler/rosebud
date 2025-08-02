import { useIsMobile } from "@/hooks/useIsMobile";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Drawer, Text } from "@mantine/core";
import { CreateEditForm } from "./CreateEditForm";

interface CreateEditDrawerProps {
    opened: boolean;
    close: () => void;
}

export function CreateEditDrawer({ opened, close }: CreateEditDrawerProps) {
    const isMobile = useIsMobile()

    return (
        <Drawer.Root opened={opened} onClose={close} position={isMobile ? "bottom" : "right"} size={isMobile ? "100%" : 'lg'}>
            <Drawer.Overlay />
            <Drawer.Content>
                <Drawer.Header>
                    <Drawer.Title>
                        <Text size="xl" fw={600}>
                            New Check In
                        </Text>
                    </Drawer.Title>
                    <Drawer.CloseButton icon={<FontAwesomeIcon icon={faCircleXmark} size="xl" />} />
                </Drawer.Header>
                <Divider mb="md" mx='md' />
                <Drawer.Body px={24}>
                    <CreateEditForm close={close} />
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    );
}