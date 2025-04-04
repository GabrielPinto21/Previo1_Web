document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('container');
    const template = document.querySelector('.template_asignatura');

    try {
        const asignaturas = await api.getAsignaturas();

        asignaturas.forEach(asignatura => {
            const clone = template.content.cloneNode(true);
            const card = clone.querySelector('.card');
            card.querySelector('.nombre_materia').textContent = asignatura.nombre;
            card.querySelector('.codigo_materia').textContent = `Código: ${asignatura.codigo}`;
            card.querySelector('.descripcion_materia').textContent = asignatura.descripcion;

            container.appendChild(clone);
        });
    } catch (error) {
        console.error('Error fetching asignaturas:', error);
    }
});
