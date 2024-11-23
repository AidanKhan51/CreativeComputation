/**
 * Portfolio
 * Aidan Khan
 */

"use strict";

const opened = new Map();

const initializers = {
	'games-popup': () => {
		document.getElementById('hg3r-btn').addEventListener('click', () => {
			makePopup('hg3r-popup');

		});
		document.getElementById('TOOSLOW-btn').addEventListener('click', () => {
			makePopup('TOOSLOW-popup');

		});
		document.getElementById('GAMBLE-btn').addEventListener('click', () => {
			makePopup('GAMBLE-popup');

		});
	}
}

function makePopup(contentId) {
	if (opened.has(contentId)) {
		opened.get(contentId).remove();
		opened.delete(contentId);
		return;
	}

	const popup = document.createElement('div');
	popup.className = 'popup';
	popup.innerHTML = document.getElementById('popup-base').innerHTML;

	popup.querySelector('.content-cnt').innerHTML = document.getElementById(contentId).innerHTML;

	document.body.append(popup);
	opened.set(contentId, popup);
	initializers[contentId]?.()

	popup.style.top = (window.innerHeight - popup.clientHeight) / 2 + 'px';
	popup.style.left = (window.innerWidth - popup.clientWidth) / 2 + 'px';

	registerResizer(popup, '.top-bar', e => {
		const offsets = popup.getBoundingClientRect();
		const barOffsets = popup.querySelector('.top-bar').getBoundingClientRect();
		if (e.movementX > 0 || offsets.left > 0) {
			popup.style.left = popup.style.left = (offsets.left + e.movementX) + 'px';
		}
		if ((e.movementY > 0 || offsets.top > 0) && barOffsets.y + barOffsets.height + e.movementY <= window.innerHeight) {
			popup.style.top = (offsets.top + e.movementY) + 'px';
		}
	});

	// Change to add listener to button
	popup.querySelector('.closeButton').addEventListener('click', () => {
		opened.delete(contentId);
		popup.remove();
	});

	registerResizer(popup, '.nw-corner', e => {
		const movementY = e.movementY;
		const movementX = e.movementX;
		if (popup.clientHeight - e.movementY < 350) {
			movementY = popup.clientHeight - 350;
		}
		if (popup.clientWidth - e.movementX < 350) {
			movementX = popup.clientWidth - 350;
		}
		const offsets = popup.getBoundingClientRect();

		popup.style.left = (offsets.left + movementX) + 'px';
		popup.style.width = (popup.clientWidth - movementX) + 'px';

		popup.style.top = (offsets.top + movementY) + 'px';
		popup.style.height = (popup.clientHeight - movementY) + 'px';
	});

	registerResizer(popup, '.north-border', e => {
		const movementY = e.movementY;
		if (popup.clientHeight - e.movementY < 350) {
			movementY = popup.clientHeight - 350;
		}
		const offsets = popup.getBoundingClientRect();

		popup.style.top = (offsets.top + movementY) + 'px';
		popup.style.height = (popup.clientHeight - movementY) + 'px';
	});

	registerResizer(popup, '.ne-corner', e => {
		const movementY = e.movementY;
		const movementX = e.movementX;
		if (popup.clientHeight - e.movementY < 350) {
			movementY = popup.clientHeight - 350;
		}
		if (popup.clientWidth + e.movementX < 350) {
			movementX = popup.clientWidth + 350;
		}
		const offsets = popup.getBoundingClientRect();

		popup.style.width = (popup.clientWidth + movementX) + 'px';

		popup.style.top = (offsets.top + movementY) + 'px';
		popup.style.height = (popup.clientHeight - movementY) + 'px';
	});

	registerResizer(popup, '.west-border', e => {
		const movementX = e.movementX;
		if (popup.clientWidth - e.movementX < 350) {
			movementX = popup.clientWidth - 350;
		}
		const offsets = popup.getBoundingClientRect();

		popup.style.left = (offsets.left + movementX) + 'px';
		popup.style.width = (popup.clientWidth - movementX) + 'px';
	});

	registerResizer(popup, '.east-border', e => {
		const movementX = e.movementX;
		if (popup.clientWidth + e.movementX < 350) {
			movementX = popup.clientWidth + 350;
		}
		popup.style.width = (popup.clientWidth + e.movementX) + 'px';
	});

	registerResizer(popup, '.sw-corner', e => {
		const movementY = e.movementY;
		const movementX = e.movementX;
		if (popup.clientHeight + e.movementY < 350) {
			movementY = popup.clientHeight + 350;
		}
		if (popup.clientWidth - e.movementX < 350) {
			movementX = popup.clientWidth - 350;
		}
		const offsets = popup.getBoundingClientRect();

		popup.style.left = (offsets.left + movementX) + 'px';
		popup.style.width = (popup.clientWidth - movementX) + 'px';

		popup.style.height = (popup.clientHeight + movementY) + 'px';
	});

	registerResizer(popup, '.south-border', e => {
		const movementY = e.movementY;
		if (popup.clientHeight + e.movementY < 350) {
			movementY = popup.clientHeight + 350;
		}
		popup.style.height = (popup.clientHeight + movementY) + 'px';
	});

	registerResizer(popup, '.se-corner', e => {
		const movementY = e.movementY;
		const movementX = e.movementX;
		if (popup.clientHeight + e.movementY < 350) {
			movementY = popup.clientHeight + 350;
		}
		if (popup.clientWidth + e.movementX < 350) {
			movementX = popup.clientWidth + 350;
		}
		popup.style.width = (popup.clientWidth + movementX) + 'px';

		popup.style.height = (popup.clientHeight + movementY) + 'px';
	});
}

// Popup commands from homepage
document.addEventListener('DOMContentLoaded', () => {

	document.getElementById('user-btn').addEventListener('click', () => {
		makePopup('user-popup');
	});

	document.getElementById('TWODEE-btn').addEventListener('click', () => {
		makePopup('2d-popup');
	});

	document.getElementById('THREEDEE-btn').addEventListener('click', () => {
		makePopup('3d-popup');
	});

	document.getElementById('music-btn').addEventListener('click', () => {
		makePopup('music-popup');
	});

	document.getElementById('games-btn').addEventListener('click', () => {
		makePopup('games-popup');
	});

	document.getElementById('bestOf-btn').addEventListener('click', () => {
		makePopup('bestOf-popup');
	});

});

function registerResizer(parent, selector, func) {
	const el = parent.querySelector(selector);

	el.addEventListener('mousedown', e => {
		const mouseUp = () => {
			window.removeEventListener('mousemove', func);
			window.removeEventListener('mouseup', mouseUp);
			document.body.style.userSelect = '';
		};

		window.addEventListener('mousemove', func);
		window.addEventListener('mouseup', mouseUp);
		document.body.style.userSelect = 'none';
	});
}