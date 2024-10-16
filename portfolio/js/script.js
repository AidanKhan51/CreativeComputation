/**
 * Portfolio
 * Aidan Khan
 */

"use strict";

const opened = new Set();

function makePopup(contentId) {
	if (opened.has(contentId)) return;
	opened.add(contentId);

	const popup = document.createElement('div');
	popup.className = 'popup';

	const topBar = document.createElement('div');
	topBar.className = 'top-bar';
	popup.prepend(topBar);

	const contentCnt = document.createElement('div');
	contentCnt.className = 'content-cnt';
	contentCnt.innerHTML = document.getElementById(contentId).innerHTML;

	popup.append(topBar, contentCnt);
	document.body.append(popup);

	popup.style.top = (window.innerHeight - popup.clientHeight) / 2 + 'px';
	popup.style.left = (window.innerWidth - popup.clientWidth) / 2 + 'px';

	let isMousedown = false;

	let mouseUpListener;

	function mouseMoveListener(e) {
		if (isMousedown) {
			popup.style.top = parseInt(popup.style.top) + e.movementY + 'px';
			popup.style.left = parseInt(popup.style.left) + e.movementX + 'px';
		}
	}

	topBar.addEventListener('mousedown', () => {
		isMousedown = true;
		mouseUpListener = () => isMousedown = false;
		window.addEventListener('mouseup', mouseUpListener);
	});

	const closeBtn = document.createElement('button');
	closeBtn.innerHTML = '&times';
	topBar.append(closeBtn);

	// Change to add listener to button
	closeBtn.addEventListener('click', () => {
		opened.delete(contentId);
		popup.remove();
		window.removeEventListener('mousemove', mouseMoveListener);
		if (mouseUpListener) {
			window.removeEventListener('mouseup', mouseUpListener);
		}
	});

	window.addEventListener('mousemove', mouseMoveListener)
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('3d-btn').addEventListener('click', () => {
		makePopup('3d-popup');
	});
});

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('user-btn').addEventListener('click', () => {
		makePopup('user-popup');
	});
});

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('2d-btn').addEventListener('click', () => {
		makePopup('2d-popup');
	});
});

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('music-btn').addEventListener('click', () => {
		makePopup('music-popup');
	});
});

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('games-btn').addEventListener('click', () => {
		makePopup('games-popup');
	});
});

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('settings-btn').addEventListener('click', () => {
		makePopup('settings-popup');
	});
});