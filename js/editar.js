document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const asignatureCode = urlParams.get('codigo_materia'); // Obtener el código de la materia

    async function loadAsignatureDetails() {
        try {
            const asignature = await api.getAsignatureByCode(asignatureCode); // Llamar al método API
            if (asignature) {
                document.getElementById('nombre').value = asignature.nombre; // Usar las propiedades correctas
                document.getElementById('codigo').value = asignature.codigo;
                document.getElementById('descripcion').value = asignature.descripcion;
            } else {
                alert('No se encontró la materia seleccionada.');
            }
        } catch (error) {
            console.error('Error al cargar los detalles de la materia:', error);
            alert('Ocurrió un error al cargar los detalles de la materia.');
        }
    }

    loadAsignatureDetails();

    document.getElementById("save").addEventListener('click', async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        const name = document.getElementById('nombre').value;
        const description = document.getElementById('descripcion').value;

        const asignature = {
            nombre: name,
            descripcion: description
        };

        try {
            await api.updateAsignature(asignatureCode, asignature); // Llamar a la API para actualizar
            alert('Materia actualizada exitosamente');
            window.location.href = 'sistema_matriculas.html'; // Redirigir al sistema de matrículas
        } catch (error) {
            console.error('Error al actualizar la materia:', error);
            alert('Falló la actualización de datos');
        }
    });
});