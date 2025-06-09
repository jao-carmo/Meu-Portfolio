document.addEventListener('DOMContentLoaded', function () {
    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Efeito de digitação no título
    const heroTitle = document.querySelector('.typing-effect');
    const titleText = "João Pedro Epaminondas do Carmo";

    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';

        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }

        typing();
    }

    typeWriter(heroTitle, titleText);

    // Dados das disciplinas atualizados
    const disciplinesData = [
        // 4° Ano
        {
            id: "bd-avancado",
            name: "Banco de Dados Avançado",
            professor: "Alexandre Aparecido Bernardes",
            icon: "fa-database",
            shortDescription: "Estudo de bancos de dados relacionais e não relacionais",
            ano: 4
        },
        {
            id: "estrutura-dados",
            name: "Estrutura de Dados",
            professor: "Willian Guimarães Borges",
            icon: "fa-project-diagram",
            shortDescription: "Fundamentos de estruturas de dados e algoritmos",
            ano: 4
        },
        {
            id: "engenharia-software",
            name: "Engenharia de Software",
            professor: "Jefferson Antonio Ribeiro Passerini",
            icon: "fa-cogs",
            shortDescription: "Processos e metodologias de desenvolvimento de software",
            ano: 4
        },
        {
            id: "ihc",
            name: "Interação Humano Computador",
            professor: "Lígia Rodrigues Prete",
            icon: "fa-users",
            shortDescription: "Design de interfaces centrado no usuário",
            ano: 4
        },
        {
            id: "tecnicas-programacao",
            name: "Técnicas Avançadas de Programação",
            professor: "Welington Luis Codinhoto Garcia",
            icon: "fa-code",
            shortDescription: "Padrões de projeto e boas práticas de programação",
            ano: 4
        },
        {
            id: "programacao-web",
            name: "Programação Web e Mobile",
            professor: "Marcelo Tadeu Boer",
            icon: "fa-laptop-code",
            shortDescription: "Desenvolvimento de aplicações web e mobile",
            ano: 4
        },
        {
            id: "inteligencia-corporativa",
            name: "Inteligência Corporativa",
            professor: "Marinalva da Silva Talpo Boldrin",
            icon: "fa-chart-line",
            shortDescription: "Modelos de negócios na era digital",
            ano: 4
        },
        {
            id: "gestao-projetos",
            name: "Gestão Ágil de Projetos",
            professor: "André Zagato Gomes",
            icon: "fa-tasks",
            shortDescription: "Metodologias ágeis para gestão de projetos",
            ano: 4
        },
        {
            id: "sistemas-operacionais",
            name: "Sistemas Operacionais",
            professor: "Welington Luis Codinhoto Garcia",
            icon: "fa-server",
            shortDescription: "Organização de computadores e sistemas operacionais",
            ano: 4
        },
        {
            id: "ingles",
            name: "Língua Inglesa I",
            professor: "Carlos Alberto Gonçalves da Silva",
            icon: "fa-language",
            shortDescription: "Inglês técnico para tecnologia",
            ano: 4
        },
        {
            id: "matematica-discreta",
            name: "Matemática Discreta",
            professor: "Willian Guimarães Borges",
            icon: "fa-square-root-alt",
            shortDescription: "Fundamentos matemáticos para computação",
            ano: 4
        }
        // As disciplinas do 5° ano podem ser adicionadas posteriormente
    ];

    // Elementos do DOM
    const disciplinesContainer = document.getElementById('disciplines-container');
    const searchInput = document.getElementById('discipline-search');

    // Função para carregar disciplinas
    function loadDisciplines(disciplines = disciplinesData, yearFilter = 'all') {
        disciplinesContainer.innerHTML = '';

        // Filtra por ano se necessário
        let filteredDisciplines = disciplines;
        if (yearFilter !== 'all') {
            filteredDisciplines = disciplines.filter(d => d.ano === parseInt(yearFilter));
        }

        filteredDisciplines.forEach((discipline, index) => {
            const cardLink = document.createElement('a'); // Create an anchor element
            cardLink.href = `disciplinas/${discipline.id}.html`; // Set the href
            cardLink.className = 'discipline-card'; // Apply existing styling
            cardLink.style.animationDelay = `${index * 0.1}s`;
            cardLink.innerHTML = `
                <div class="discipline-icon">
                    <i class="fas ${discipline.icon}"></i>
                </div>
                <h3>${discipline.name}</h3>
                <p>Professor: ${discipline.professor}</p>
                <p class="discipline-description">${discipline.shortDescription}</p>
            `;
            disciplinesContainer.appendChild(cardLink); // Append the clickable card
        });
    }

    // Eventos para filtros por ano
    document.querySelectorAll('.year-filter').forEach(button => {
        button.addEventListener('click', function () {
            // Remove a classe active de todos os botões
            document.querySelectorAll('.year-filter').forEach(btn => {
                btn.classList.remove('active');
            });

            // Adiciona a classe active ao botão clicado
            this.classList.add('active');

            // Obtém o filtro selecionado
            const yearFilter = this.dataset.year;

            // Filtra as disciplinas
            const searchTerm = searchInput.value.toLowerCase();
            let filteredDisciplines = disciplinesData;

            if (searchTerm) {
                filteredDisciplines = disciplinesData.filter(discipline => {
                    return discipline.name.toLowerCase().includes(searchTerm) ||
                        discipline.professor.toLowerCase().includes(searchTerm) ||
                        discipline.shortDescription.toLowerCase().includes(searchTerm);
                });
            }

            loadDisciplines(filteredDisciplines, yearFilter);
        });
    });

    // Função de pesquisa
    function searchDisciplines() {
        const searchTerm = searchInput.value.toLowerCase();
        const yearFilter = document.querySelector('.year-filter.active').dataset.year;

        let filteredDisciplines = disciplinesData;

        if (searchTerm) {
            filteredDisciplines = disciplinesData.filter(discipline => {
                return discipline.name.toLowerCase().includes(searchTerm) ||
                    discipline.professor.toLowerCase().includes(searchTerm) ||
                    discipline.shortDescription.toLowerCase().includes(searchTerm);
            });
        }

        loadDisciplines(filteredDisciplines, yearFilter);
    }

    // Evento de input para pesquisa
    searchInput.addEventListener('input', searchDisciplines);

    // Carrega as disciplinas inicialmente
    loadDisciplines();

    // Suaviza a rolagem para os links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito de aparecimento suave ao rolar
    const fadeElements = document.querySelectorAll('.section-header, .about-section, .disciplines-section, .contact-section');

    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Verifica ao carregar e ao rolar
    window.addEventListener('load', checkFade);
    window.addEventListener('scroll', checkFade);

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Ativa o scroll effect na carga inicial
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
    }
});