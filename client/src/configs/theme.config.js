import {createTheme, colors} from "@mui/material"

export const themeModes = {
    dark: "dark",
    light: "light"
}

const themeConfigs = {
    custom: ({mode})=> {
        const customPallete = mode == themeModes.dark ? {
            primary: {
                main: "#ff0000",
                constrastText: "#ffffff"
            },
            secondary: {
                main: "#44336",
                constrastText: "#ffffff"
            },
            background: {
                default: "#000000",
                paper: "#131313"
            }
        } : {
            primary: {
                main: "#ff0000",
                constrastText: "#ffffff"
            },
            secondary: {
                main: "#44336",
                constrastText: "#ffffff"
            },
            background: {
                default: colors.grey["100"]
            }
        }

        return createTheme({
            palette: {
                mode,
                ...customPallete
            },
            components: {
                MuiButton: {
                    defaultProps: {disableElevation: true}
                }
            }
        })
    }
}

export default themeConfigs;