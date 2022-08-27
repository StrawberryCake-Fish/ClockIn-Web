import { Alert, Box, Snackbar } from "@mui/material";

interface params {
    success: boolean
    error: boolean
    message: string
    onClose: any
}

export default function AutomationAlert(params: params) {
    return (
        <Box>
            <Snackbar sx={{ width: "450px" }} open={params.success} autoHideDuration={3000} onClose={params.onClose}>
                <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                    {params.message}
                </Alert>
            </Snackbar>
            <Snackbar sx={{ width: "450px" }} open={params.error} autoHideDuration={3000} onClose={params.onClose}>
                <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
                    {params.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
