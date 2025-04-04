document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const asignatureCode = urlParams.get('codigo_materia'); 

    async function loadAsignatureDetails() {
        try {
            const asignature = await api.getAsignatureByCode(asignatureCode); 
            if (asignature) {
                document.getElementById('nombre').value = asignature.nombre; 
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
        event.preventDefault();

        const name = document.getElementById('nombre').value;
        const description = document.getElementById('descripcion').value;

        const asignature = {
            nombre: name,
            descripcion: description
        };

        try {
            await api.updateAsignature(asignatureCode, asignature);
            alert('Materia actualizada exitosamente');
            window.location.href = 'sistema_matriculas.html';
        } catch (error) {
            console.error('Error al actualizar la materia:', error);
            alert('Falló la actualización de datos');
        }
    });
});