(function () {

var $DOM = document,
	avatar = null,
	CSS_AVATAR = 'dnd-avatar-inner';

var onMouseDown = function (e) {
	$DND.startDragCheck();
};

var onMoveDuringCheck = function (e) {
	$DND.stopDragCheck();
	$DND.startDrag(e);
};

var onUpDuringCheck = function (e) {
	$DND.stopDragCheck();
};

var onUpDuringDrag = function (e) {
	$DND.stopDrag(e);
};

var onMoveDuringDrag = function (e) {
	$DND.onDragMove(e);
};

function showAvatar(node) {
	if (!avatar) {
		avatar = document.createElement('div');
		avatar.className = CSS_AVATAR;
		document.body.appendChild(avatar);
	}
	var wrap = document.createElement('div');
	wrap.appendChild(node.cloneNode(true));

	avatar.innerHTML = wrap.innerHTML;

    // Show avatar.
    avatar.style.display = 'block';
}

function updateAvatar(pos, html) {
	console.log(pos);
	if (avatar) {
		avatar.style.left = pos.left + 'px';
		avatar.style.top = pos.top + 'px';
	}
}
function hideAvatar() {
	if (avatar) {
		avatar.style.display = 'none';
	}
}

$DND = {
	startDragCheck: function () {
		$DOM.addEventListener('mousemove', onMoveDuringCheck);
		$DOM.addEventListener('mouseup', onUpDuringCheck);
	},
	stopDragCheck: function () {
		$DOM.removeEventListener('mousemove', onMoveDuringCheck);
		$DOM.removeEventListener('mouseup', onUpDuringCheck);
	},
	startDrag: function (e) {
		$DOM.addEventListener('mousemove', onMoveDuringDrag);
		$DOM.addEventListener('mouseup', onUpDuringDrag);
		showAvatar(e.target);
	},
	onDragMove: function (e) {
		// 1. ondragenter for drop widget
		// 2. ondragover for drop widget
		// 3. ondragmove for src widget

		updateAvatar({
			left: e.clientX,
			top: e.clientY
		}, e.target.innerHTML);
	},
	stopDrag: function (e) {
		$DOM.removeEventListener('mousemove', onMoveDuringDrag);
		$DOM.removeEventListener('mouseup', onUpDuringDrag);

		// 1. ondrop for target
		//
		// 2. ondragend for source
		//
		// post process for hide avatar
		hideAvatar();
	},
	enabled: false,
	enable: function () {
		$DOM.addEventListener('mousedown', onMouseDown);
		enabled = true;
	},
	disable: function () {
		document.removeEventListener('mousedown', onMouseDown);
		enabled = false;
	}
};

$DND.enable();

})();
