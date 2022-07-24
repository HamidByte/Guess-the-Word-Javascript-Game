define(["jquery"], function($) {

  return {
    test: function() {
      console.log("this works")
    },
    gameStatusModal: function() {
      var modal = new PlainModal(document.getElementById('modal-content'));
      modal.closeByEscKey = false
      modal.closeByOverlay = false
      modal.overlayBlur = 3;
      modal.closeButton = document.getElementById('close-button');
      modal.open();
    },

    customModal: function() {
      try {
        micromodal.init({
          awaitCloseAnimation: true,// set to false, to remove close animation
          onShow: function(modal) {
            // console.log("micromodal open");
          },
          onClose: function(modal) {
            // console.log("micromodal close");
          }
        });
      } catch (e) {
        console.log("micromodal error: ", e);
      }
    }
  }

})