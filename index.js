'use strict';

const modalBtns = document.querySelectorAll('[data-trigger="btn"]');
const modalItems = document.querySelectorAll('[data-trigger="item"]');
const modalCloseBtns = document.querySelectorAll('[data-modal="close"]');
const regex = /[^0-9]/g;

/* modal close */
modalCloseBtns.forEach(modalCloseBtn => {
  modalCloseBtn.addEventListener('click', function(e) {
    e.currentTarget.closest('[data-modal="box"]').querySelector('[data-modal="bg"]').classList.remove('is-active');
    e.currentTarget.closest('[data-modal="box"]').querySelector('[data-modal="inner"]').classList.remove('is-active');
    const cardModals = e.currentTarget.closest('[data-modal="inner"]').querySelectorAll('[data-trigger="item"]');
    cardModals.forEach(cardModal => {
      cardModal.classList.remove('is-active');
    });
  });
});

/* modal open */
modalBtns.forEach(modalBtn => {
  modalBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const modalBtnNum = e.currentTarget.dataset.modal;

    modalItems.forEach(modalItem => {
    const modalItemNum = modalItem.dataset.modal.replace(regex, "");
      if (modalItemNum == modalBtnNum) {
        document.querySelector('[data-modal="bg"]').classList.add('is-active');
        document.querySelector('[data-modal="inner"]').classList.add('is-active');
        modalItem.classList.add('is-active');
      }
    });
  });
});


