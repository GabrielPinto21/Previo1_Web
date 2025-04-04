document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const asignatureCode = urlParams.get('codigo_materia'); // Cambiar a codigo_materia

    async function loadAsignatureDetails() {
        try {
            const asignature = await api.getAsignatureByCode(asignatureCode); // Usar codigo_materia
            if (asignature) {
                document.getElementById('nombre-materia').textContent = asignature.nombre;
                document.getElementById('codigo-materia').innerHTML = `<strong>Código:</strong> ${asignature.codigo}`;
                document.getElementById('descripcion-materia').innerHTML = `<strong>Descripción:</strong> ${asignature.descripcion}`;
            } else {
                alert('No se encontró la materia seleccionada.');
            }
        } catch (error) {
            console.error('Error al cargar los detalles de la materia:', error);
            alert('Ocurrió un error al cargar los detalles de la materia.');
        }
    }

    async function loadStudents() {
        try {
            const students = await api.getStudentsByAsignature(asignatureCode);
            const studentsList = document.getElementById('students-list');
            studentsList.innerHTML = ''; // Limpiar la lista

            if (students.length > 0) {
                students.forEach(student => {
                    const studentItem = document.createElement('div');
                    studentItem.classList.add('student-item');
                    studentItem.textContent = `${student.nombre} (${student.codigo})`;
                    studentsList.appendChild(studentItem);
                });
            } else {
                studentsList.textContent = 'No hay estudiantes asignados a esta materia.';
            }
        } catch (error) {
            console.error('Error al cargar los estudiantes:', error);
            alert('Ocurrió un error al cargar los estudiantes.');
        }
    }

    document.getElementById('add-student-button').addEventListener('click', () => {
        alert('Funcionalidad para añadir estudiante aún no implementada.');
    });

    await loadAsignatureDetails();
    await loadStudents();
});
