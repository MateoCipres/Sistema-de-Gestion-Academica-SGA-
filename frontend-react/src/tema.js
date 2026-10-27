import { createTheme } from "@mui/material/styles"

const tema = createTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#526D82",
                    contrastText: "#FFFFFF"
                },
                secondary: {
                    main: "#D18B65",
                    contrastText: "#FFFFFF"
                },
                background: {
                    default: "#F4F1EB",
                    paper: "#FFFCF7"
                },
                text: {
                    primary: "#303841",
                    secondary: "#68737D"
                },
                divider: "#DDD8CF"
            }
        },
        dark: {
            palette: {
                primary: {
                    main: "#9DBAD0",
                    contrastText: "#17232D"
                },
                secondary: {
                    main: "#E6AD8A",
                    contrastText: "#30231D"
                },
                background: {
                    default: "#171C22",
                    paper: "#222A33"
                },
                text: {
                    primary: "#F0F2F4",
                    secondary: "#B5BEC7"
                },
                divider: "#414B56"
            }
        }
    },
    shape: {
        borderRadius: 8
    },
    typography: {
        fontFamily: "system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        h4: { fontWeight: 700, letterSpacing: "-0.02em" },
        h5: { fontWeight: 700, letterSpacing: "-0.01em" },
        h6: { fontWeight: 700 },
        button: { textTransform: "none", fontWeight: 600 }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    scrollBehavior: "smooth",
                    "@media (prefers-reduced-motion: reduce)": { scrollBehavior: "auto" }
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true
            }
        }
    }
})

export default tema
