import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");

  if (btn && menu) {
    btn.addEventListener("click", () => {
      // Alterna a classe 'hidden' para mostrar ou esconder o menu
      menu.classList.toggle("hidden");
    });
  }

  const track = document.getElementById("carousel-track");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  if (track && btnPrev && btnNext) {
    // Avança 1 card + o gap (24px)
    btnNext.addEventListener("click", () => {
      const cardWidth = track.firstElementChild.clientWidth + 24;
      track.scrollBy({ left: cardWidth, behavior: "smooth" });
    });

    // Volta 1 card + o gap (24px)
    btnPrev.addEventListener("click", () => {
      const cardWidth = track.firstElementChild.clientWidth + 24;
      track.scrollBy({ left: -cardWidth, behavior: "smooth" });
    });
  }

  // Lógica das Abas do Tutorial

  const tabs = document.querySelectorAll(".tutorial-tab");
  const contents = document.querySelectorAll(".tutorial-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // 1. Remove classe 'active' e estilos de todas as abas
      tabs.forEach((t) => {
        t.classList.remove("active", "bg-brand", "text-white", "shadow-md");
        t.classList.add("bg-slate-50", "text-slate-600");
        // Reseta o círculo com número
        const circle = t.querySelector("div");
        circle.classList.remove("bg-white/20");
        circle.classList.add("bg-slate-200", "text-slate-500");
      });

      // 2. Adiciona os estilos de ativo na aba clicada
      tab.classList.add("active", "bg-brand", "text-white", "shadow-md");
      tab.classList.remove("bg-slate-50", "text-slate-600");
      const activeCircle = tab.querySelector("div");
      activeCircle.classList.remove("bg-slate-200", "text-slate-500");
      activeCircle.classList.add("bg-white/20");

      // 3. Esconde todos os conteúdos
      contents.forEach((content) => {
        content.classList.add("hidden");
        content.classList.remove("block");
      });

      // 4. Mostra o conteúdo correspondente
      const targetId = tab.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.remove("hidden");
        targetContent.classList.add("block");
      }
    });
  });

  const slider = document.getElementById("ba-slider");
  const handle = document.getElementById("ba-handle");
  const afterContainer = document.getElementById("ba-after-container");

  if (slider && handle && afterContainer) {
    // Escuta o evento 'input' que detecta o arrastar da barra em tempo real
    slider.addEventListener("input", (e) => {
      const sliderValue = e.target.value;

      // Move a linha divisória branca
      handle.style.left = `${sliderValue}%`;

      // Altera o recorte (clip-path) da imagem de "Depois"
      // Criando um polígono dinâmico que vai da esquerda até a porcentagem da barra
      afterContainer.style.clipPath = `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)`;
    });
  }

  // Lógica dos Modais (Termos e Privacidade)
  const btnTermos = document.getElementById("btn-termos");
  const btnPrivacidade = document.getElementById("btn-privacidade");
  const modalTermos = document.getElementById("modal-termos");
  const modalPrivacidade = document.getElementById("modal-privacidade");

  // Função para abrir um modal
  const openModal = (modal) => {
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      // Trava o scroll do site quando o pop-up abre
      document.body.style.overflow = "hidden";
    }
  };

  // Função para fechar todos os modais
  const closeModals = () => {
    if (modalTermos) {
      modalTermos.classList.add("hidden");
      modalTermos.classList.remove("flex");
    }
    if (modalPrivacidade) {
      modalPrivacidade.classList.add("hidden");
      modalPrivacidade.classList.remove("flex");
    }
    // Libera o scroll do site
    document.body.style.overflow = "auto";
  };

  // Eventos de clique para abrir
  if (btnTermos)
    btnTermos.addEventListener("click", () => openModal(modalTermos));
  if (btnPrivacidade)
    btnPrivacidade.addEventListener("click", () => openModal(modalPrivacidade));

  // Seleciona todos os botões de fechar (O "X", o fundo escuro e os botões "Estou de acordo/Entendi")
  const closeButtons = document.querySelectorAll(
    ".btn-close-modal, .modal-bg-close",
  );
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", closeModals);
  });
});
