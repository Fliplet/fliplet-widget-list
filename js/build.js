Fliplet.Widget.instance('list-1-0-1', function(data) {
  var $container = $(this);
  var _this = this;

  $container.find('.linked[data-list-item-id]').click(function(event) {
    event.preventDefault();

    var $listItem = $(this);

    if ($listItem.parents('.list-swipe.swiping').length) {
      return;
    }

    var itemData = _.find(data.items, {
      id: $listItem.attr('data-list-item-id')
    });

    if (!_.isUndefined(itemData) && (!_.isUndefined(itemData.linkAction) && !_.isEmpty(itemData.linkAction))) {
      Fliplet.Navigate.to(itemData.linkAction);
    }
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
