import { Box, Button, Chip, FormControlLabel, LinearProgress, Stack, styled, Switch, TextField, Typography } from "@mui/material";
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import styles from "../style/home.module.scss";
import { GetConfig, UpdateAccount, UpdateUdid } from "../common/api/api";
import { FormEvent, useEffect, useState } from "react";
import AutomationAlert from "../component/AutomationAlert";

export default function HomeView() {
    const navigate = useNavigate()
    const [arr, setArr] = useState({
        "applicationActivity": "",
        "applicationPackage": "",
        "devicePlatform": "",
        "deviceVersion": "",
        "udid": "",
        "cron": "",
        "account": [
            {
                "name": "",
                "password": "",
                "username": ""
            }
        ]
    })

    const handelClick = () => {
        navigate("/")
    };

    const getConfig = () => {
        GetConfig().then((res) => {
            setArr(res.data.result)
            return arr
        })
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            getConfig()
        }, 300)
        return () => clearTimeout(timeout);
    }, [])

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false)
        }, 500)
        return () => clearTimeout(timeout);
    }, [])

    const [switchState, setSwitchState] = useState({
        state: true,
        ps: "开启"
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(event.currentTarget.elements)
        let udid = {
            udid: (event.currentTarget.elements[4] as HTMLInputElement).value
        }
        let account = {
            name: (event.currentTarget.elements[5] as HTMLInputElement).value,
            username: (event.currentTarget.elements[6] as HTMLInputElement).value,
            password: (event.currentTarget.elements[7] as HTMLInputElement).value
        }
        let timeout = setTimeout(() => {
            UpdateUdid(udid).then((res) => {
                if (res.data.code == 200) {
                    setMessage("配置成功")
                    setSuccess(true)
                } else {
                    setMessage("配置失败")
                    setError(true)
                }
            })
            UpdateAccount(account).then((res) => {
                if (res.data.code == 200) {
                    setMessage("配置成功")
                    setSuccess(true)
                } else {
                    setMessage("配置失败")
                    setError(true)
                }
            })
        }, 300)
        return () => clearTimeout(timeout);
    }

    const handleClick = () => {
        console.log(arr)
    }

    const [message, setMessage] = useState("Success!");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const handleAlterClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        setError(false)
    }

    const switchClick = () => {
        setMessage("功能维护中 定时任务默认状态为开启")
        setError(true)
    }

    const Android12Switch = styled(Switch)(({ theme }) => ({
        padding: 8,
        '& .MuiSwitch-track': {
            borderRadius: 22 / 2,
            '&:before, &:after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
            },
            '&:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
                left: 12,
            },
            '&:after': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M19,13H5V11H19V13Z" /></svg>')`,
                right: 12,
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            width: 16,
            height: 16,
            margin: 2,
        },
    }));

    const view = () => {
        if (loading === true) {
            return (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress color="secondary" />
                </Box>
            )
        } else {
            return (
                <Container maxWidth="sm" className={styles.box}>
                    <Box
                        className={styles.form}
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        <Stack spacing={3}>
                            <TextField
                                className={styles.field_long}
                                required
                                disabled
                                id="applicationActivity"
                                label="ApplicationActivity"
                                variant="standard"
                                type="text"
                                defaultValue={arr.applicationActivity}
                            />
                            <TextField
                                className={styles.field_long}
                                required
                                disabled
                                id="applicationPackage"
                                label="ApplicationPackage"
                                variant="standard"
                                type="text"
                                defaultValue={arr.applicationPackage}
                            />
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    required
                                    disabled
                                    id="devicePlatform"
                                    label="DevicePlatform"
                                    variant="standard"
                                    type="text"
                                    defaultValue={arr.devicePlatform}
                                />
                                <TextField
                                    required
                                    disabled
                                    id="deviceVersion"
                                    label="DeviceVersion"
                                    variant="standard"
                                    type="text"
                                    defaultValue={arr.deviceVersion}
                                />
                                <TextField
                                    required
                                    id="udid"
                                    label="Udid"
                                    variant="standard"
                                    type="text"
                                    defaultValue={arr.udid}
                                />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    required
                                    id="name"
                                    label="Name"
                                    variant="standard"
                                    type="text"
                                    defaultValue={arr.account[0].name}
                                />
                                <TextField
                                    required
                                    id="username"
                                    label="Username"
                                    variant="standard"
                                    type="text"
                                    defaultValue={arr.account[0].username}
                                />
                                <TextField
                                    required
                                    id="password"
                                    label="Possword"
                                    variant="standard"
                                    type="password"
                                    defaultValue={arr.account[0].password}
                                />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    required
                                    id="cron"
                                    label="Cron"
                                    variant="standard"
                                    type="text"
                                    defaultValue={arr.cron}
                                />
                                <Box className={styles.switch}>
                                    <FormControlLabel
                                        control={<Android12Switch />}
                                        label={`定时任务状态：${switchState.ps}`}
                                        checked={switchState.state}
                                        onClick={switchClick}
                                    />
                                </Box>
                            </Stack>
                            <Chip
                                component="button"
                                color="primary"
                                label="Submit"
                                type="submit"
                                onClick={handleClick}
                            />
                        </Stack>
                    </Box>
                </Container>
            )
        }
    }

    return (
        <Box className={styles.home}>
            <div className={styles.top}>
                <Box className={styles.logo}>
                    <Button sx={{ width: 250, height: 50 }} onClick={handelClick}>
                        <Typography variant="h1">
                            Clock Config
                        </Typography>
                    </Button>
                </Box>
            </div>
            <div className={styles.layout}>
                <AutomationAlert success={success} error={error} message={message} onClose={handleAlterClose} />
                {
                    view()
                }
            </div>
        </Box>
    )
}