$('.linked[data-list-item-id]').click(function (event) {
  event.preventDefault();

  if ($(this).parents('.list-swipe.swiping').length) {
    return;
  }

  var data = Fliplet.Widget.getData($(this).parents('[data-list-id]').attr('data-list-id'));
  var itemData = _.find(data.items,{id: $(this).attr('data-list-item-id')});

  if(!_.isUndefined(itemData) && (!_.isUndefined(itemData.linkAction) && !_.isEmpty(itemData.linkAction))) {
    // Analytics - Track Event
    Fliplet.Analytics.trackEvent({
      category: 'link',
      action: 'screen',
      title: itemData.title
    });

    Fliplet.Navigate.to(itemData.linkAction);
  }
});

$('[data-list-id]').each(function(){
  var data = Fliplet.Widget.getData( $(this).attr('data-list-id') );
  if (data.swipeToSave) {
    window.ui = window.ui || {};
    window.ui['swipeSavedList' + $(this).attr('data-list-uuid')] = new SwipeSaveList(this, {
      savedListLabel: data.swipeToSaveLabel || 'My list'
    });
  }
});
