const administradores = [
    { name: "Home", link: "/admin/home" },
    { name: "Ciudades", link: "/admin/cuidades" },
    { name: "Usuarios", link: "/admin/usuarios" },
]

const coordinadores = [
    { name: "Home", link: "/user/home" },
    {
        name: "Usuarios", link: "/user/usuarios", subLink: [
            { name: "Proveedores", link: "/user/usuarios/proveedores" },
            { name: "Domiciliarios", link: "/user/usuarios/domiciliarios" },
        ]
    },
    {
        name: "Recargas", link: "/user/recargas", subLink: [
            { name: "Proveedores", link: "/user/recargas/proveedores" },
            { name: "Domiciliarios", link: "/user/recargas/domiciliarios" },
        ]
    },

]

module.exports = {
    administradores,
    coordinadores
}