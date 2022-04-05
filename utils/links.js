const administradores = [
    { name: "Home", link: "/admin/home" },
    { name: "Ciudades", link: "/admin/ciudades" },
    { name: "Usuarios", link: "/admin/usuarios" },
]

const proveedores = [
    { name: "Monitor", link: "/provider" },
    { name: "Historial", link: "/provider/historial" }
]

const coordinadores = [
    { name: "Home", link: "/user/home" },
    { name: "Recargas", link: "/user/recargas" },
    {
        name: "Usuarios", link: "/user/usuarios", subLink: [
            { name: "Proveedores", link: "/user/usuarios/proveedores" },
            { name: "Domiciliarios", link: "/user/usuarios/domiciliarios" },
        ], ariaOwns: "simple-menu-user", ariaPopup: true
    },
    
]

const defaultRoute = [
    { name: "Home", link: "/user/home" },
]

module.exports = {
    administradores,
    coordinadores,
    proveedores,
    defaultRoute
}