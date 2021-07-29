document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".calc3")) {
    const modal = document.querySelector(".modal"),
      modalsContent = [
        {
          video1: "https://www.youtube.com/embed/V1en18UMl3s",
          title: `Копирайтинг, который
                  выполняет задачи маркетинга`,
          text: `Сильный с точки зрения маркетинга закадровый текст
                - это залог успеха любого ролика. Мы разработаем 
                для вас копирайтинг, который будет выполнять
                ту или иную задачу. В данном случае - это пример
                копирайтинга, который вызывает гордость за компанию,
                в которой работаешь. Ролик был приурочен к юбилею
                компании. `,
        },
        {
          video1: "https://www.youtube.com/embed/PmGUW76hq3Q",
          title: `У вас есть фото, которые вы хотите внедрить
                  в проект, и сделать это органично?`,
          text: `Мы предложим решение для внедрения ваших
                материалов в формате современного слайд-шоу
                с анимацией. Подгоним цветокоррекцию фотографий
                под снятый видеоматериал, чтобы он органично 
                вписался в общий визуальный ряд. В данном случае
                посмотрите на примере прямой трансляции отбороч-
                ного тура по косплею - здесь внедрили фото победи-
                телей прошлых годов.  `,
        },
        {
          video1: "https://www.youtube.com/embed/NMvBBt_bwdI",
          title: `Словами не объяснить, на видео не показать? 
                  Мы смоделируем любой объект/предмет в 3D
                  и анимируем его, покажем как он работает. `,
          text: `Сцены 3D существуют для выполнения всего двух
                задач - они либо демонстрируют то, что нельзя
                показать на видео - или это слишком мелко, или 
                этого еще нет в природе, или слишком большое
                итд... или они выполняют чисто эстетическую функ-
                цию, когда вам хочется оформить, например, заставку
                к вашему ролику в 3D. Посмотрите наше демо, чтобы
                иметь представление, какая может быть графика. `,
        },
        {
          video1: "https://www.youtube.com/embed/sTP_oYYE5eY",
          video2: "https://www.youtube.com/embed/276VvkJSJuI",
        },
        {
          video1: "https://www.youtube.com/embed/bWczx2XYsaM",
          video2: "https://www.youtube.com/embed/e7JADySvAME",
        },
        {
          video1: "https://www.youtube.com/embed/Huea4BhmGRU",
          video2: "https://www.youtube.com/embed/mEobEA6-Egg",
        },
      ];

    document.addEventListener("click", (event) => {
      const target = event.target;

      // Открытие pop-up окна "посмотреть примеры"
      if (target.classList.contains("form-calc__link")) {
        if (target.dataset.modal === "1") {
          event.preventDefault();
          modal.classList.add("video");

          const videos = modal.querySelectorAll("iframe");
          videos[0].src = modalsContent[target.dataset.content]["video1"];
          videos[1].src = modalsContent[target.dataset.content]["video2"];
        } else if (target.dataset.modal === "0") {
          event.preventDefault();
          modal.querySelector("iframe").src = modalsContent[target.dataset.content]["video1"];
          modal.querySelector(".modal-content__description-title").textContent =
            modalsContent[target.dataset.content]["title"];
          modal.querySelector(".modal-content__description-text").textContent =
            modalsContent[target.dataset.content]["text"];
        }

        modal.classList.add("active");
      }

      if (target.closest(".modal-content__close") || target.classList.contains("modal-overlay")) {
        // Закрытие pop-up окна "посмотреть примеры"
        modal.classList.remove("active");
        modal.classList.remove("video");
      }
    });
  }
});
