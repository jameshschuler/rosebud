import { AppBar } from "@/components/AppBar"
import { useIsMobile } from "@/hooks/useIsMobile"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Flex, NavLink, Stack } from "@mantine/core"
import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute('/_auth')({
    beforeLoad: ({ context }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/',
            })
        }
    },
    component: AuthLayout,
})

function AuthLayout() {
    const isMobile = useIsMobile()

    return (
        <Box>
            <AppBar />
            <Flex>
                <Stack component={'nav'} w="25%" gap={16} px={24} display={isMobile ? 'none' : 'flex'}>
                    <NavLink
                        label="Dashboard"
                        component={Link}
                        to="/dashboard"
                        leftSection={<FontAwesomeIcon icon={faHome} />}
                    />
                    <NavLink
                        label="Check Ins"
                        component={Link}
                        to="/checkIns"
                        leftSection={<FontAwesomeIcon icon={faHome} />}
                    />
                    <NavLink
                        label="Milestones"
                        component={Link}
                        to="/milestones"
                        leftSection={<FontAwesomeIcon icon={faHome} />}
                    />
                    <NavLink
                        label="Goals"
                        component={Link}
                        to="/goals"
                        leftSection={<FontAwesomeIcon icon={faHome} />}
                    />
                    <NavLink
                        label="Achievements"
                        component={Link}
                        to="/achievements"
                        leftSection={<FontAwesomeIcon icon={faHome} />}
                    />
                </Stack>
                <Box w={isMobile ? '100%' : '75%'} px={24}>
                    <Outlet />
                </Box>
            </Flex>
        </Box>
    )
}