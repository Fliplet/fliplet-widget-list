Fliplet.Widget.instance('list', function(data) {
  var $container = $(this);
  var _this = this;

  $container.find('.linked[data-list-item-id]').click(function(event) {
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

  var swipeToSaveLabel = data.swipeToSaveLabel || T('widgets.list.noImages.defaultListName');

  Fliplet().then(function() {
    $container.translate({ swipeToSaveLabel: swipeToSaveLabel });

    if (data.swipeToSave) {
      window.ui = window.ui || {};
      window.ui['swipeSavedList' + $container.attr('data-list-uuid')] = new SwipeSaveList(_this, {
        savedListLabel: swipeToSaveLabel
      });
    }
  });
});
