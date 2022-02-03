const administradores = [
    { name: "Home", link: "/admin/home" },
    { name: "Ciudades", link: "/admin/ciudades" },
    { name: "Usuarios", link: "/admin/usuarios" },
]

const coordinadores = [
    { name: "Home", link: "/user/home" },
    {
        name: "Usuarios", link: "/user/usuarios", subLink: [
            { name: "Proveedores", link: "/user/usuarios/proveedores" },
            { name: "Domiciliarios", link: "/user/usuarios/domiciliarios" },
        ], ariaOwns: "simple-menu-user", ariaPopup: true
    },
    {
        name: "Recargas", link: "/user/recargas", subLink: [
            { name: "Proveedores", link: "/user/recargas/proveedores" },
            { name: "Domiciliarios", link: "/user/recargas/domiciliarios" },
        ], ariaOwns: "simple-menu-coordinator", ariaPopup: true
    },

]

module.exports = {
    administradores,
    coordinadores
}