import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded"
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded"
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded"
import SelectorTema from "./SelectorTema"
import logoSGA from "../assets/logo-sga.svg"

// Enlaces a las secciones de la página
const secciones = [
    { texto: "Nuevo alumno", href: "#formulario", icono: <PersonAddAlt1RoundedIcon /> },
    { texto: "Alumnos", href: "#alumnos", icono: <GroupsRoundedIcon /> },
    { texto: "Ayuda", href: "#ayuda", icono: <HelpOutlineRoundedIcon /> }
]

function Header() {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: "background.paper",
                color: "text.primary",
                borderBottom: 1,
                borderColor: "divider"
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    disableGutters
                    sx={{
                        flexWrap: "wrap",
                        columnGap: 2,
                        rowGap: 1,
                        py: 1
                    }}
                >
                    <Box
                        component="a"
                        href="#"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            color: "inherit",
                            textDecoration: "none"
                        }}
                    >
                        <Box
                            component="img"
                            src={logoSGA}
                            alt="Logo SGA"
                            sx={{ width: { xs: 40, sm: 44 }, height: { xs: 40, sm: 44 }, display: "block" }}
                        />
                        <Box>
                            <Typography variant="h6" component="span" sx={{ display: "block", fontWeight: 800, lineHeight: 1.1 }}>
                                SGA
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: { xs: "none", sm: "block" }, lineHeight: 1.2 }}
                            >
                                Sistema de Gestión Académica
                            </Typography>
                        </Box>
                    </Box>

                    <Stack
                        component="nav"
                        aria-label="Secciones"
                        direction="row"
                        spacing={0.5}
                        sx={{
                            order: { xs: 3, md: 0 },
                            width: { xs: "100%", md: "auto" },
                            mx: { md: "auto" },
                            justifyContent: { xs: "space-between", sm: "flex-start", md: "center" }
                        }}
                    >
                        {secciones.map(seccion => (
                            <Button
                                key={seccion.href}
                                href={seccion.href}
                                color="inherit"
                                size="small"
                                startIcon={seccion.icono}
                                sx={{
                                    color: "text.secondary",
                                    px: 1.5,
                                    "&:hover": { color: "primary.main", bgcolor: "action.hover" }
                                }}
                            >
                                {seccion.texto}
                            </Button>
                        ))}
                    </Stack>

                    <Box sx={{ ml: { xs: "auto", md: 0 } }}>
                        <SelectorTema />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
