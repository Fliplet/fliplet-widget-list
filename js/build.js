(function() {
  $('.linked[data-list-item-id]').click(function(event) {
    event.preventDefault();

    var $container = $(this);

    if ($container.parents('.list-swipe.swiping').length) {
      return;
    }

    var data = Fliplet.Widget.getData($container.parents('[data-list-id]').attr('data-list-id'));
    var itemData = _.find(data.items, {
      id: $container.attr('data-list-item-id')
    });

    if (!_.isUndefined(itemData) && (!_.isUndefined(itemData.linkAction) && !_.isEmpty(itemData.linkAction))) {
      Fliplet.Navigate.to(itemData.linkAction);
    }
  });
})();

Fliplet.Widget.instance('list', function(data) {
  var $container = $(this);

  $container.translate({ swipeToSaveLabel: data.swipeToSaveLabel || T('widgets.list.noImages.listName') });

  if (data.swipeToSave) {
    window.ui = window.ui || {};
    window.ui['swipeSavedList' + $container.attr('data-list-uuid')] = new SwipeSaveList(this, {
      savedListLabel: data.swipeToSaveLabel || T('widgets.list.noImages.listName')
    });
  }
});
