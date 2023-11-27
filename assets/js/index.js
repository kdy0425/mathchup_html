
//탭메뉴 접근성 https://nuli.navercorp.com/community/article/1132879?email=true
(function () {
	var tablist = document.querySelectorAll('[role="tablist"]')[0];
	var tabs;
	var panels;
	var delay = determineDelay();
	generateArrays();
	function generateArrays() {
		tabs = document.querySelectorAll('[role="tab"]');
		panels = document.querySelectorAll('[role="tabpanel"]');
	};
	// For easy reference
	var keys = {
		end: 35,
		home: 36,
		left: 37,
		up: 38,
		right: 39,
		down: 40,
		delete: 46
	};
	// Add or substract depenign on key pressed
	var direction = {
		37: -1,
		38: -1,
		39: 1,
		40: 1
	};
	// Bind listeners
	for (i = 0; i < tabs.length; ++i) {
		addListeners(i);
	};
	function addListeners(index) {
		tabs[index].addEventListener('click', clickEventListener);
		tabs[index].addEventListener('keydown', keydownEventListener);
		tabs[index].addEventListener('keyup', keyupEventListener);
		// Build an array with all tabs (<button>s) in it
		tabs[index].index = index;
	};
	// When a tab is clicked, activateTab is fired to activate it
	function clickEventListener(event) {
		var tab = event.target;
		activateTab(tab, false);
		var className = $(this).attr('class');

		$('.accordion_trigger').attr('tabindex' , '-1').attr('aria-selected' , 'false');
		$('.' + className).attr('aria-selected' , 'true');
		$('.' + className).removeAttr('tabindex');
	};
	// Handle keydown on tabs
	function keydownEventListener(event) {
		var key = event.keyCode;
		switch (key) {
			case keys.end:
				event.preventDefault();
				// Activate last tab
				activateTab(tabs[tabs.length - 1]);
				break;
			case keys.home:
				event.preventDefault();
				// Activate first tab
				activateTab(tabs[0]);
				break;
				// Up and down are in keydown
				// because we need to prevent page scroll >:)
			case keys.up:
			case keys.down:
				determineOrientation(event);
				break;
		};
		var className = $(this).attr('class');

		$('.accordion_trigger').attr('tabindex' , '-1').attr('aria-selected' , 'false');
		$('.' + className).attr('aria-selected' , 'true');
		$('.' + className).removeAttr('tabindex');
	};
	// Handle keyup on tabs
	function keyupEventListener(event) {
		var key = event.keyCode;
		switch (key) {
			case keys.left:
			case keys.right:
				determineOrientation(event);
				break;
			case keys.delete:
				determineDeletable(event);
				break;
		};
		var className = $(this).attr('class');

		$('.accordion_trigger').attr('tabindex' , '-1').attr('aria-selected' , 'false');
		$('.' + className).attr('aria-selected' , 'true');
		$('.' + className).removeAttr('tabindex');
	};
	// When a tablist’s aria-orientation is set to vertical,
	// only up and down arrow should function.
	// In all other cases only left and right arrow function.
	function determineOrientation(event) {
		var key = event.keyCode;
		var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
		var proceed = false;
		if (vertical) {
			if (key === keys.up || key === keys.down) {
				event.preventDefault();
				proceed = true;
			};
		}
		else {
			if (key === keys.left || key === keys.right) {
				proceed = true;
			};
		};
		if (proceed) {
			switchTabOnArrowPress(event);
		};
	};
	// Either focus the next, previous, first, or last tab
	// depening on key pressed
	function switchTabOnArrowPress(event) {
		var pressed = event.keyCode;
		for (x = 0; x < tabs.length; x++) {
			tabs[x].addEventListener('focus', focusEventHandler);
		};
		if (direction[pressed]) {
			var target = event.target;
			if (target.index !== undefined) {
				if (tabs[target.index + direction[pressed]]) {
					tabs[target.index + direction[pressed]].focus();
				}
				else if (pressed === keys.left || pressed === keys.up) {
					focusLastTab();
				}
				else if (pressed === keys.right || pressed == keys.down) {
					focusFirstTab();
				};
			};
		};
	};
	// Activates any given tab panel
	function activateTab(tab, setFocus) {
		setFocus = setFocus || true;
		// Deactivate all other tabs
		deactivateTabs();
		// Remove tabindex attribute
		tab.removeAttribute('tabindex');
		// Set the tab as selected
		tab.setAttribute('aria-selected', 'true');
		// Get the value of aria-controls (which is an ID)
		var controls = tab.getAttribute('aria-controls');
		// Remove hidden attribute from tab panel to make it visible
		$('.' + controls).removeAttr('hidden');
		// Set focus when required
		if (setFocus) {
			tab.focus();
		};
	};
	// Deactivate all tabs and tab panels
	function deactivateTabs() {
		for (t = 0; t < tabs.length; t++) {
			tabs[t].setAttribute('tabindex', '-1');
			tabs[t].setAttribute('aria-selected', 'false');
			tabs[t].removeEventListener('focus', focusEventHandler);
		};
		for (p = 0; p < panels.length; p++) {
			panels[p].setAttribute('hidden', 'hidden');
		};
	};
	// Make a guess
	function focusFirstTab() {
		tabs[0].focus();
	};
	// Make a guess
	function focusLastTab() {
		tabs[tabs.length - 1].focus();
	};
	// Detect if a tab is deletable
	function determineDeletable(event) {
		target = event.target;
		if (target.getAttribute('data-deletable') !== null) {
			// Delete target tab
			deleteTab(event, target);
			// Update arrays related to tabs widget
			generateArrays();
			// Activate the closest tab to the one that was just deleted
			if (target.index - 1 < 0) {
				activateTab(tabs[0]);
			}
			else {
				activateTab(tabs[target.index - 1]);
			};
		};
	};
	// Deletes a tab and its panel
	function deleteTab(event) {
		var target = event.target;
		var panel = $('.' + target.getAttribute('aria-controls'));
		target.parentElement.removeChild(target);
		panel.parentElement.removeChild(panel);
	};
	// Determine whether there should be a delay
	// when user navigates with the arrow keys
	function determineDelay() {
		var hasDelay = tablist.hasAttribute('data-delay');
		var delay = 0;
		if (hasDelay) {
			var delayValue = tablist.getAttribute('data-delay');
			if (delayValue) {
				delay = delayValue;
			}
			else {
				// If no value is specified, default to 300ms
				delay = 300;
			};
		};
		return delay;
	};
	function focusEventHandler(event) {
		var target = event.target;
		setTimeout(checkTabFocus, delay, target);
	};
	// Only activate tab on focus if it still has focus after the delay
	function checkTabFocus(target) {
		focused = document.activeElement;
		if (target === focused) {
			activateTab(target, false);
		};
	};
})();


//아코디언 접근성 https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html
Array.prototype.slice.call(document.querySelectorAll('.accordion')).forEach(function (accordion) {

  // Allow for multiple accordion sections to be expanded at the same time
  var allowMultiple = accordion.hasAttribute('data-allow-multiple');
  // Allow for each toggle to both open and close individually
  var allowToggle = (allowMultiple) ? allowMultiple : accordion.hasAttribute('data-allow-toggle');

  // Create the array of toggle elements for the accordion group
  var triggers = Array.prototype.slice.call(accordion.querySelectorAll('.accordion_trigger'));
  var panels = Array.prototype.slice.call(accordion.querySelectorAll('.accordion_pannel'));


  accordion.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('accordion_trigger')) {
      // Check if the current toggle is expanded.
      var isExpanded = target.getAttribute('aria-selected') == 'true';
      var active = accordion.querySelector('[aria-selected="true"]');

      // without allowMultiple, close the open accordion
      if (!allowMultiple && active && active !== target) {
        // Set the expanded state on the triggering element
        active.setAttribute('aria-selected', 'false');
        // Hide the accordion sections, using aria-controls to specify the desired section
        $('.' + active.getAttribute('aria-controls')).attr('hidden', '');

        // When toggling is not allowed, clean up disabled state
        if (!allowToggle) {
          active.removeAttribute('aria-disabled');
        }
      }

      if (!isExpanded) {
        // Set the expanded state on the triggering element
        target.setAttribute('aria-selected', 'true');
        // Hide the accordion sections, using aria-controls to specify the desired section
        $('.' + target.getAttribute('aria-controls')).removeAttr('hidden');

        // If toggling is not allowed, set disabled state on trigger
        if (!allowToggle) {
          target.setAttribute('aria-disabled', 'true');
        }
      }
      else if (allowToggle && isExpanded) {
        // Set the expanded state on the triggering element
        target.setAttribute('aria-selected', 'false');
        // Hide the accordion sections, using aria-controls to specify the desired section
        $('.' + target.getAttribute('aria-controls')).attr('hidden', '');
      }

		//var className = $(this).attr('class');
		var className = $(".accordion_trigger[aria-selected=true]").attr('class').split(' ')[1];
		//alert(className);
		//var classes = $('#divID').attr('class').split(' ');
		$('.tabs_btn button').attr('tabindex' , '-1').attr('aria-selected' , 'false');
		$('.' + className).attr('aria-selected' , 'true');
		$('.' + className).removeAttr('tabindex');

    }
  });

  // Bind keyboard behaviors on the main accordion container
  accordion.addEventListener('keydown', function (event) {
    var target = event.target;
    var key = event.which.toString();

    var isExpanded = target.getAttribute('aria-selected') == 'true';
    var allowToggle = (allowMultiple) ? allowMultiple : accordion.hasAttribute('data-allow-toggle');

    // 33 = Page Up, 34 = Page Down
    var ctrlModifier = (event.ctrlKey && key.match(/33|34/));

    // Is this coming from an accordion header?
    if (target.classList.contains('accordion_trigger')) {
      // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
      // 38 = Up, 40 = Down
      if (key.match(/38|40/) || ctrlModifier) {
        var index = triggers.indexOf(target);
        var direction = (key.match(/34|40/)) ? 1 : -1;
        var length = triggers.length;
        var newIndex = (index + length + direction) % length;

        triggers[newIndex].focus();

        event.preventDefault();
      }
      else if (key.match(/35|36/)) {
        // 35 = End, 36 = Home keyboard operations
        switch (key) {
          // Go to first accordion
          case '36':
            triggers[0].focus();
            break;
            // Go to last accordion
          case '35':
            triggers[triggers.length - 1].focus();
            break;
        }
        event.preventDefault();

      }

    }
  });

  // These are used to style the accordion when one of the buttons has focus
  accordion.querySelectorAll('.accordion_trigger').forEach(function (trigger) {

    trigger.addEventListener('focus', function (event) {
      accordion.classList.add('focus');
    });

    trigger.addEventListener('blur', function (event) {
      accordion.classList.remove('focus');
    });

  });

  // Minor setup: will set disabled state, via aria-disabled, to an
  // expanded/ active accordion which is not allowed to be toggled close
  if (!allowToggle) {
    // Get the first expanded/ active accordion
    var expanded = accordion.querySelector('[aria-selected="true"]');

    // If an expanded/ active accordion is found, disable
    if (expanded) {
      expanded.setAttribute('aria-disabled', 'true');
    }
  }

});

$('.accordion_close').click(function(){
	$(this).closest('.accordion_pannel').prev('.accordion_trigger').removeAttr('aria-selected');
	$(this).closest('.accordion_pannel').prev('.accordion_trigger').attr('aria-selected', 'false');
	$(this).closest('.accordion_pannel').prev('.accordion_trigger').removeAttr('aria-disabled');
	$(this).closest('.accordion_pannel').attr('hidden', '');
});