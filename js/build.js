Fliplet.Widget.instance('list', function(data) {
  var $container = $(this);
  var _this = this;

  $container.find('.linked[data-list-item-id]').click(function (event) {
    event.preventDefault();

    if ($(this).parents('.list-swipe.swiping').length) {
      return;
    }

    var itemData = _.find(data.items,{ id: $(this).attr('data-list-item-id') });

    if(!_.isUndefined(itemData) && (!_.isUndefined(itemData.linkAction) && !_.isEmpty(itemData.linkAction))) {
      Fliplet.Navigate.to(itemData.linkAction);
    }
  });

  Fliplet().then(function() {
    if (data.swipeToSave) {
      window.ui = window.ui || {};
      window.ui['swipeSavedList' + $container.attr('data-list-uuid')] = new SwipeSaveList(_this, {
        savedListLabel: data.swipeToSaveLabel || 'My list'
      });
    }
  });
});
