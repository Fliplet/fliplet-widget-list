Fliplet.Widget.instance('list-1-0-1', function(data) {
  var $container = $(this);
  var _this = this;

  const handleItemClick = (event) => {
    event.preventDefault();

    const listItem = event.currentTarget;

    if (listItem.closest('.list-swipe.swiping')) {
      return;
    }

    const itemId = listItem.getAttribute('data-list-item-id');
    const itemData = data.items.find(item => item.id === itemId);

    if (itemData?.linkAction) {
      Fliplet.Navigate.to(itemData.linkAction);
    }
  };

  const linkedItems = $container[0].querySelectorAll('.linked[data-list-item-id]');
  linkedItems.forEach(item => {
    item.addEventListener('click', handleItemClick);
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { 
        handleItemClick(event);
      }
    });
  });

  Fliplet().then(function() {
    var swipeToSaveLabel = data.swipeToSaveLabel || T('widgets.list.noImages.defaultListName');

    $container.translate({ swipeToSaveLabel: swipeToSaveLabel });

    if (data.swipeToSave) {
      window.ui = window.ui || {};
      window.ui['swipeSavedList' + data.uuid] = new SwipeSaveList(_this, {
        savedListLabel: swipeToSaveLabel
      });
    }
  });
});
