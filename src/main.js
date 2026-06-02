import './style.scss'
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeEn from 'air-datepicker/locale/en';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

const isMobileDevice = () => window.matchMedia('(max-width: 576px)').matches;

const datepickers = document.querySelectorAll('[data-js-datepicker]');
datepickers.forEach((datepicker) => {    
    const instance = new AirDatepicker(datepicker, {
        autoClose: true,
        locale: localeEn,
        dateFormat: 'd-MM-yyyy',
        isMobile: isMobileDevice(),
    });

    const container = datepicker.closest('.datepicker__item');
    if (container) {
        const openBtn = container.querySelector('[data-js-datepicker-open]');
        if (openBtn) {
            openBtn.addEventListener('click', () => {
                datepicker.focus();
            });
        }

        const clearBtn = container.querySelector('[data-js-datepicker-clear]');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => instance.clear());
        }
    }
});

const mainList = document.querySelector('[data-js-main]');
const viewButtons = document.querySelectorAll('[data-js-view]');
const viewClassGrid = 'main__list--grid';
const viewClassRow = 'main__list--row';

const toggleView = (button) => {
    if (!mainList || !button) return;

    const isGridView = button.classList.contains('icon-grid');
    const activeButton = document.querySelector('[data-js-view].active');

    if (button === activeButton) return;

    const state = Flip.getState(mainList.children);

    viewButtons.forEach((btn) => {
        btn.classList.toggle('active', btn === button);
    });

    mainList.classList.toggle(viewClassGrid, isGridView);
    mainList.classList.toggle(viewClassRow, !isGridView);

    Flip.from(state, {
        duration: 0.2,
        ease: 'power2.Out',
        absolute: true,
        stagger: 0.01,
    });
};

viewButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        toggleView(button);
    });
});