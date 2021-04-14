const menuButton = document.querySelector('.header__nav-button');
const navigationMenu = document.querySelector('.header__nav');
const navigationMenuOpened = document.querySelector('.header__nav-button-opened');
const tabList = document.querySelectorAll('.tabs__item');
const tabsInfo = document.querySelectorAll('.tabs-info__item');
const countriesCards = document.querySelectorAll('.countries__list li');
const navLinks = document.querySelectorAll('.header__nav-link');
const lookToursButton = document.querySelector('.promo__button');
const tabsInfoButtons = document.querySelectorAll('.tabs-info__item-button');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modalForm = document.querySelector('.modal__form');
const modalClose = document.querySelector('.modal__form-close');
const modalFormTitle = document.querySelector('.modal__form-title');
const modalFormInput = document.querySelectorAll('.modal__form-input');
const modalFormSubmit = document.querySelector('.modal__form-button');
const modalSuccess = document.querySelector('.modal-success');
const modalSuccessClose = document.querySelector('.modal-success__close');
const complexButton = document.querySelector('.price__complex-button');
const economButton = document.querySelector('.price__econom-button');
const questionsButton = document.querySelector('.questions__form-button');
const questionsForm = document.querySelector('.questions__form');
const questionsFormInput = document.querySelector('.questions__form-input');
const questionsFormTitle = document.querySelector('.questions__form-title');

function checkNojsCompatibility () {
	if (navigationMenu.classList.contains('header__nav--nojs')) {
		navigationMenu.classList.remove('header__nav--nojs');
	}
}

checkNojsCompatibility();

menuButton.addEventListener('click', function() {
	if (!navigationMenu.classList.contains('header__nav--opened')) {
		navigationMenu.classList.add('header__nav--opened');
	}
})

navigationMenuOpened.addEventListener('click', function() {
	if (navigationMenu.classList.contains('header__nav--opened')) {
		navigationMenu.classList.remove('header__nav--opened');
	}
})

lookToursButton.addEventListener('click', function() {
	location.href = '#tabs';
})

tabsInfoButtons.forEach((button) => {
	button.addEventListener('click', function() {
		openModal();
	})
})

complexButton.addEventListener('click', function() {
	openModal();
})

economButton.addEventListener('click', function() {
	openModal();
})

navLinks.forEach((link) => {
	link.addEventListener('click', function() {
		if (navigationMenu.classList.contains('header__nav--opened')) {
			navigationMenu.classList.remove('header__nav--opened');
		}

	})
})

countriesCards.forEach((country, countryIndex) => {
	country.addEventListener('click', function() {
		switchTab(countryIndex);
	})
})

tabList.forEach((tab, tabIndex) => {
	tab.addEventListener('click', function() {
		switchTab(tabIndex);
	})
})

questionsButton.addEventListener('click', function(evt) {
	evt.preventDefault();
	if (questionsForm.checkValidity() === false) {
		questionsFormInput.style.borderColor = '#FE7865';
		questionsFormTitle.classList.add('questions__form-title--invalid');
	} else {
		questionsFormInput.style.borderColor = 'rgba(44, 46, 63, 0.3)';
		questionsFormTitle.classList.remove('questions__form-title--invalid');

		modalSuccess.classList.remove('hidden');
		overlay.classList.remove('hidden');
		document.body.classList.add('page-body--noscroll');

		modalSuccessClose.addEventListener('click', closeSuccessModalHandler);
		window.addEventListener('click', closeSuccessModal);
		window.addEventListener('keydown', closeSuccessModal);
	}
})

modalFormSubmit.addEventListener('click', function(evt) {
	evt.preventDefault();
	if (modalForm.checkValidity() === false) {
		modalFormInput[0].style.borderColor = '#FE7865';
		modalFormTitle.classList.add('modal__form-title--invalid');
	} else {
		modalFormTitle.classList.remove('modal__form-title--invalid');
		modalFormInput[0].style.borderColor = 'rgba(44, 46, 63, 0.3)';

		if (!localStorage.phone) {
			localStorage.setItem('phone', modalFormInput[0].value);
		} else {
			localStorage.phone = modalFormInput[0].value;
		}

		if (!localStorage.email) {
			localStorage.setItem('email', modalFormInput[1].value);
		} else {
			localStorage.email = modalFormInput[1].value;
		}

		modalClose.removeEventListener('click', closeModal);
		window.removeEventListener('click', closeModalHandler);
		window.removeEventListener('keydown', closeModalHandler);

		modal.classList.add('hidden');
		modalSuccess.classList.remove('hidden');

		modalSuccessClose.addEventListener('click', closeSuccessModalHandler);
		window.addEventListener('click', closeSuccessModal);
		window.addEventListener('keydown', closeSuccessModal);
	}
})

function switchTab (tab) {
	for (let i = 0; i < tabList.length; i++) {
		if (!tabsInfo[i].classList.contains('hidden')) {
			if (tabList[i].classList.contains('tabs__item--active')) {
				tabList[i].classList.remove('tabs__item--active');
			}
			tabsInfo[i].classList.add('hidden');
		}
	}

	tabList[tab].classList.add('tabs__item--active');
	tabsInfo[tab].classList.remove('hidden');
}

function closeModal (evt) {
	clearInputs();
	modalFormInput[0].style.borderColor = 'rgba(44, 46, 63, 0.3)';
	if (modalFormTitle.classList.contains('modal__form-title--invalid')) {
		modalFormTitle.classList.remove('modal__form-title--invalid');
	}
	document.body.classList.remove('page-body--noscroll');
	modal.classList.add('hidden');
	overlay.classList.add('hidden');

	modalClose.removeEventListener('click', closeModal);
	window.removeEventListener('click', closeModalHandler);
	window.removeEventListener('keydown', closeModalHandler);
}

function openModal (evt) {
	document.body.classList.add('page-body--noscroll');
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
	modalFormInput[0].focus();

	modalClose.addEventListener('click', closeModal);
	window.addEventListener('click', closeModalHandler);
	window.addEventListener('keydown', closeModalHandler);
}

function closeModalHandler (evt) {
	if (evt.target.classList.contains('overlay')) {
		clearInputs();
		modalFormInput[0].style.borderColor = 'rgba(44, 46, 63, 0.3)';
		if (modalFormTitle.classList.contains('modal__form-title--invalid')) {
			modalFormTitle.classList.remove('modal__form-title--invalid');
		}
		document.body.classList.remove('page-body--noscroll');
		modal.classList.add('hidden');
		overlay.classList.add('hidden');
	}

	if (evt.type === 'keydown' && evt.key == 'Escape') {
		clearInputs();
		modalFormInput[0].style.borderColor = 'rgba(44, 46, 63, 0.3)';
		if (modalFormTitle.classList.contains('modal__form-title--invalid')) {
			modalFormTitle.classList.remove('modal__form-title--invalid');
		}
    document.body.classList.remove('page-body--noscroll');
		modal.classList.add('hidden');
		overlay.classList.add('hidden');
  }
}

function closeSuccessModal (evt) {
	if (evt.type === 'keydown' && evt.key == 'Escape') {
		document.body.classList.remove('page-body--noscroll');
		clearInputs();
		modalSuccess.classList.add('hidden');
		overlay.classList.add('hidden');
	}

	if (evt.target.classList.contains('overlay')) {
		document.body.classList.remove('page-body--noscroll');
		clearInputs();
		modalSuccess.classList.add('hidden');
		overlay.classList.add('hidden');
	}
}

function closeSuccessModalHandler () {
	document.body.classList.remove('page-body--noscroll');
	clearInputs();
	modalSuccess.classList.add('hidden');
	overlay.classList.add('hidden');
}

function clearInputs () {
	modalFormInput[0].value = '';
	modalFormInput[1].value = '';
}

function openSuccessedModal () {
	document.body.classList.add('page-body--noscroll');
	modalSuccess.classList.remove('hidden');
	overlay.classList.remove('hidden');

}