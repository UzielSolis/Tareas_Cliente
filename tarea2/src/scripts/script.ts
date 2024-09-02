interface HeaderData {
    image: string;
    name: string;
    title: string;
    email: string;
}

interface SummaryData {
    title: string;
    content: string;
}

interface SectionData {
    title: string;
    items: string[];
}

interface Skill {
    category: string;
    items: string[];
}

interface Project {
    name: string;
    title: string;
    description: string;
    details: string[];
}

interface Data {
    header: HeaderData;
    summary: SummaryData;
    contests: SectionData[];
    education: SectionData[];
    skills: Skill[];
    projects: Project[];
    contactEmail: string;
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('cv.json')
        .then((response: Response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data: Data) => {
            // Cargar el encabezado
            const headerImage = document.querySelector('header img') as HTMLImageElement;
            const headerName = document.querySelector('header h1') as HTMLElement;
            const headerTitle = document.querySelector('header h6') as HTMLElement;
            const headerEmail = document.querySelectorAll('header h6')[1] as HTMLElement;

            if (headerImage && headerName && headerTitle && headerEmail) {
                headerImage.src = data.header.image;
                headerName.textContent = data.header.name;
                headerTitle.textContent = data.header.title;
                headerEmail.textContent = data.header.email;
            }

            // Cargar el resumen
            const summaryTitle = document.querySelector('.summary h2') as HTMLElement;
            const summaryContent = document.querySelector('.summary p') as HTMLElement;

            if (summaryTitle && summaryContent) {
                summaryTitle.textContent = data.summary.title;
                summaryContent.textContent = data.summary.content;
            }

            // Cargar los concursos
            const contestsList = document.querySelector('.contests ul') as HTMLUListElement;
            if (contestsList) {
                contestsList.innerHTML = '';
                data.contests[0].items.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<p>${item}</p>`;
                    contestsList.appendChild(li);
                });
            }

            // Cargar la educación
            const educationList = document.querySelector('.education ul') as HTMLUListElement;
            if (educationList) {
                educationList.innerHTML = '';
                data.education[0].items.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<p>${item}</p>`;
                    educationList.appendChild(li);
                });
            }

            // Cargar habilidades
            const skillsList = document.querySelector('.skills ul') as HTMLUListElement;
            if (skillsList) {
                skillsList.innerHTML = '';
                data.skills.forEach(skill => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <div>
                            <h3>${skill.category}</h3>
                            <p>${skill.items.join(', ')}</p>
                        </div>
                    `;
                    skillsList.appendChild(li);
                });
            }

            // Cargar proyectos
            const projectsList = document.querySelector('.projects ul') as HTMLUListElement;
            if (projectsList) {
                projectsList.innerHTML = '';
                data.projects.forEach(project => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <div>
                            <h3>${project.name}</h3>
                            <h4>${project.title}</h4>
                            <p>${project.description}</p>
                            <ul>
                                ${project.details.map(detail => `<li>${detail}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                    projectsList.appendChild(li);
                });
            }

            const contactForm = document.getElementById('contactForm') as HTMLFormElement;
            if (contactForm) {
                contactForm.action = `https://formsubmit.co/${data.contactEmail}`;
                contactForm.target = '_blank';
            }
        })
        .catch((error: Error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
});


document.addEventListener('DOMContentLoaded', () => {
    // Define los tipos de los elementos DOM
    const modal = document.getElementById("contactModal") as HTMLElement;
    const openModalButton = document.getElementById("openModalButton") as HTMLButtonElement;
    const closeButton = document.querySelector(".close-button") as HTMLElement;
    const contactForm = document.getElementById("contactForm") as HTMLFormElement;

    // Verifica si los elementos existen antes de agregar los event listeners
    if (modal && openModalButton && closeButton) {
        // Abrir el modal
        openModalButton.addEventListener('click', () => {
            modal.style.display = "block";
        });

        // Cerrar el modal
        closeButton.addEventListener('click', () => {
            modal.style.display = "none";
        });

        // Cerrar el modal al hacer clic fuera de él
        window.addEventListener('click', (event: MouseEvent) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });

        // Validación del formulario
        contactForm.addEventListener('submit', (event: Event) => {
            event.preventDefault(); // Evitar el envío del formulario para validar

            const name = (document.getElementById('name') as HTMLInputElement).value.trim();
            const email = (document.getElementById('email') as HTMLInputElement).value.trim();
            const message = (document.getElementById('message') as HTMLTextAreaElement).value.trim();

            let valid = true;

            // Validar el nombre
            if (name === '') {
                alert('Por favor, introduce tu nombre.');
                valid = false;
            }

            // Validar el correo electrónico
            if (email === '' || !validateEmail(email)) {
                alert('Por favor, introduce un correo electrónico válido.');
                valid = false;
            }

            // Validar el mensaje
            if (message === '') {
                alert('Por favor, introduce un mensaje.');
                valid = false;
            }

            // Si todos los campos son válidos, enviar el formulario
            if (valid) {
                contactForm.submit(); // Enviar el formulario
            }
        });

        // Función para validar el formato del correo electrónico
        function validateEmail(email: string): boolean {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }
    }
});

