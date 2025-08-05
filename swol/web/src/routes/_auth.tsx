import { AppBar } from "@/components/AppBar"
import { AppLink } from "@/components/AppLink"
import { Toolbar } from "@/components/Toolbar"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useIsTablet } from "@/hooks/useIsTablet"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { Box, Flex, Stack } from "@mantine/core"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

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
    const isTablet = useIsTablet()

    return (
        <Box mih={'100vh'}>
            <AppBar />
            <Flex mb={100} flex={1}>
                <Stack component={'nav'} w="25%" gap={16} px={24} display={isMobile || isTablet ? 'none' : 'flex'}>
                    <AppLink icon={faHome} to='/dashboard' label='Dashboard' />
                    <AppLink icon={faHome} to='/checkIns' label='Check Ins' />
                    <AppLink icon={faHome} to='/milestones' label='Milestones' />
                    <AppLink icon={faHome} to='/goals' label='Goals' />
                    <AppLink icon={faHome} to='/achievements' label='Achievements' />
                </Stack>
                <Box w={isMobile ? '100%' : '75%'} px={24}>
                    <Outlet />
                </Box>
            </Flex>
            {(isMobile || isTablet) && <Toolbar />}
        </Box>
    )
}