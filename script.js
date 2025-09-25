// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Fechar menu ao clicar em um link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('show');
            }
        });
    });

    // Form submission - Simulação (envia para WhatsApp)
    const simulacaoForm = document.getElementById('simulacaoForm');
    if (simulacaoForm) {
        simulacaoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const nome = document.getElementById('nome').value;
            const nascimento = document.getElementById('nascimento').value;
            const telefone = document.getElementById('telefone').value;
            const renda = document.getElementById('renda').value;
            const fgts = document.getElementById('fgts').checked;
            const dependente = document.getElementById('dependente').checked;
            const primeiroImovel = document.getElementById('primeiro-imovel').checked;
            
            if (!nome || !nascimento || !telefone || !renda) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Texto para WhatsApp
            const message = `Olá! Gostaria de fazer uma simulação para o Belle Ville Parnamirim.%0A%0A*Nome:* ${nome}%0A*Data de Nascimento:* ${nascimento}%0A*Telefone:* ${telefone}%0A*Renda Bruta:* ${renda}%0A*Possui FGTS:* ${fgts ? 'Sim' : 'Não'}%0A*Possui dependente(s):* ${dependente ? 'Sim' : 'Não'}%0A*Primeiro imóvel:* ${primeiroImovel ? 'Sim' : 'Não'}%0A%0APor favor, entre em contato com mais informações sobre financiamento.`;
            
            // Redirecionar para WhatsApp
            window.open(`https://api.whatsapp.com/send/?phone=5584991720773&text=${message}&type=phone_number&app_absent=0`, '_blank');
            
            // Limpar formulário
            this.reset();
        });
    }

    // Form submission - Agendar Visita (envia para WhatsApp)
    const visitaForm = document.getElementById('visitaForm');
    if (visitaForm) {
        visitaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const nome = document.getElementById('visita-nome').value;
            const telefone = document.getElementById('visita-telefone').value;
            const data = document.getElementById('visita-data').value;
            const horario = document.getElementById('visita-horario').value;
            
            if (!nome || !telefone || !data || !horario) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Verificar se a data é futura
            const hoje = new Date().toISOString().split('T')[0];
            if (data < hoje) {
                alert('Por favor, selecione uma data futura para a visita.');
                return;
            }
            
            // Texto para WhatsApp
            const message = `Olá! Gostaria de agendar uma visita ao Belle Ville Parnamirim.%0A%0A*Nome:* ${nome}%0A*Telefone:* ${telefone}%0A*Data:* ${data}%0A*Horário:* ${horario}h%0A%0APor favor, confirme a disponibilidade.`;
            
            // Redirecionar para WhatsApp
            window.open(`https://api.whatsapp.com/send/?phone=5584991720773&text=${message}&type=phone_number&app_absent=0`, '_blank');
            
            // Limpar formulário
            this.reset();
        });
    }

    // Smooth scrolling para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Configurar data mínima para o campo de data (hoje)
    const visitaData = document.getElementById('visita-data');
    const nascimento = document.getElementById('nascimento');
    
    if (visitaData) {
        visitaData.min = new Date().toISOString().split('T')[0];
    }
    
    if (nascimento) {
        nascimento.max = new Date().toISOString().split('T')[0];
    }

    // Adicionar classe de scroll ao header para efeito visual
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.padding = '0.5rem 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.padding = '1rem 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            }
        }
    });

    // Validação de telefone
    const telefoneInputs = document.querySelectorAll('input[type="tel"]');
    telefoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            
            // Formatar como (XX) XXXXX-XXXX
            if (value.length > 10) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/(\d{0,2})/, '($1');
            }
            
            e.target.value = value;
        });
    });

    // Formatação de moeda para o campo de renda
    const rendaInput = document.getElementById('renda');
    if (rendaInput) {
        rendaInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = (value/100).toFixed(2) + '';
            value = value.replace(".", ",");
            value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            e.target.value = 'R$ ' + value;
        });
    }

    // Animações suaves ao rolar a página
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação aos elementos
    const elementsToAnimate = document.querySelectorAll('.feature-card, .about-content, .simulation-form, .visit-form, .location-content');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Prevenir envio de formulário com Enter
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement.tagName === 'INPUT' && activeElement.type !== 'submit') {
                e.preventDefault();
            }
        }
    });

    // Carregamento otimizado de imagens
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
});

// Função para formatar data no padrão brasileiro
function formatarData(data) {
    if (!data) return '';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
}

// Verificar se a página carregou em menos de 2 segundos
window.addEventListener('load', function() {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    console.log(`Página carregada em ${loadTime}ms`);
    
    if (loadTime > 2000) {
        console.warn('Tempo de carregamento acima de 2 segundos. Considere otimizar as imagens.');
    }
});